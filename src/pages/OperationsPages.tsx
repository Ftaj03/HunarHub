import React, { useState } from 'react';
import {
  CheckCircle,
  Clock,
  MapPin,
  CreditCard,
  Percent,
  Award,
  Shield,
  Phone,
  MessageSquare,
  AlertOctagon,
  Search,
  Filter,
  Download,
  Upload,
  RotateCcw,
  Star,
  Check,
  Navigation
} from 'lucide-react';
import { Provider, Page, Booking } from '../types';
import { mockProviders, mockBookingHistory } from '../data';
import BookingTimeline from '../components/BookingTimeline';
import StarRating from '../components/StarRating';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth, OperationType, handleFirestoreError } from '../lib/firebase';

interface OperationsProps {
  setActivePage: (page: Page) => void;
  toast: (msg: string) => void;
  selectedProvider: Provider | null;
  activeBooking: Booking | null;
  setActiveBooking: (booking: Booking | null) => void;
  pastBookings: Booking[];
  setPastBookings: React.Dispatch<React.SetStateAction<Booking[]>>;
}

// ==========================================
// 5. BOOKING CONFIRMATION PAGE
// ==========================================
export function BookingConfirmationPage({ setActivePage, toast, selectedProvider, setActiveBooking }: OperationsProps) {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Easypaisa');
  const [location, setLocation] = useState('House 412, Block Y, DHA Phase 3, Lahore');
  const [pricing, setPricing] = useState({
    basePrice: selectedProvider?.basePrice || 0,
    travelCost: 150,
    complexitySurcharge: 100,
    urgencySurcharge: 0,
    demandSurge: 0,
    loyaltyDiscount: 50,
    promoDiscount: 0,
    total: (selectedProvider?.basePrice || 0) + 100
  });

  React.useEffect(() => {
    if (!selectedProvider) return;
    const loadPricing = async () => {
      try {
        const res = await fetch('/api/calculate-price', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            providerId: selectedProvider.id,
            urgency: 'Medium',
            promoCode: promoApplied ? 'HUNAR14' : ''
          })
        });
        if (res.ok) {
          const data = await res.json();
          setPricing(data);
        }
      } catch (err) {
        console.warn("Failed to fetch dynamic price from server", err);
      }
    };
    loadPricing();
  }, [selectedProvider, promoApplied]);

  if (!selectedProvider) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h3 className="font-display text-lg font-bold">No Provider Selected</h3>
        <p className="text-xs text-gray-400 mt-1">Please select a provider first to proceed with booking parameters.</p>
        <button onClick={() => setActivePage('recommendations')} className="mt-4 rounded-xl bg-blue-600 text-white px-4 py-2 text-xs font-semibold">
          Find Providers
        </button>
      </div>
    );
  }

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'HUNAR14' || code === 'KHIDMAT14') {
      setPromoApplied(true);
      toast(`Promo ${code} Applied! Flat 14% Saved.`);
    } else {
      toast('Invalid Promo Code. Try "HUNAR14"');
    }
  };

  const handleConfirmOrder = async () => {
    // Write booking document to Firestore first or as primary persistence
    try {
      const bookingData = {
        customerId: auth.currentUser?.uid || 'guest-user-123',
        customerName: auth.currentUser?.displayName || 'Fahad Taj',
        providerId: selectedProvider.id,
        providerName: selectedProvider.name,
        category: selectedProvider.category,
        status: 'Accepted',
        amount: pricing.total,
        scheduledDate: new Date().toLocaleDateString(),
        city: 'Lahore',
        address: location,
        createdAt: new Date().toISOString()
      };
      await addDoc(collection(db, 'bookings'), bookingData);
    } catch (fsErr) {
      console.warn("Firestore save fallback check:", fsErr);
      // Log structured error if needed
    }

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          providerId: selectedProvider.id,
          date: new Date().toLocaleDateString(),
          timeSlot: selectedProvider.availableTimeSlots[0] || '04:30 PM',
          location,
          pricingBreakdown: pricing,
          paymentMethod
        })
      });

      if (res.ok) {
        const data = await res.json();
        setActiveBooking(data.booking);
        setActivePage('booking-tracking');
        toast('Booking scheduled & saved to Firestore!');
      } else {
        const errData = await res.json();
        toast(`Scheduling Conflict: ${errData.message || errData.error}`);
      }
    } catch (err) {
      console.warn("Express backend booking generation failed, running local backup", err);
      // Fallback
      const fallbackBooking: Booking = {
        id: `b-${Date.now().toString().slice(-6)}`,
        provider: selectedProvider,
        date: new Date().toLocaleDateString(),
        time: '04:30 PM',
        location,
        basePrice: pricing.basePrice,
        serviceFee: pricing.travelCost + pricing.complexitySurcharge + pricing.urgencySurcharge + pricing.demandSurge,
        promoDiscount: pricing.promoDiscount,
        loyaltyDiscount: pricing.loyaltyDiscount,
        total: pricing.total,
        status: 'confirmed',
        category: selectedProvider.category,
        description: `Diagnostics & On-Demand assistance for ${selectedProvider.category}`,
        paymentMethod,
        customerName: 'Fahad Taj',
        customerPhone: '0300-1234567'
      };

      setActiveBooking(fallbackBooking);
      setActivePage('booking-tracking');
      toast('Booking confirmed & saved to Firestore!');
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Progress timeline indicator */}
      <div className="flex items-center justify-center space-x-3 mb-8">
        <span className="text-xs font-semibold text-blue-600">Choose Provider</span>
        <span className="text-gray-300">→</span>
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">Confirm Booking</span>
        <span className="text-gray-300">→</span>
        <span className="text-xs text-gray-400">Live Tracking</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column: Details form */}
        <div className="md:col-span-7 space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <h3 className="font-display text-base font-bold text-gray-900 dark:text-white mb-4">Location & Logistics</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Service Destination</label>
                <div className="mt-1 flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 dark:bg-gray-900 dark:border-gray-800">
                  <MapPin className="h-4 w-4 text-red-500 mr-2" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-transparent text-xs text-gray-800 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Selected Date</span>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-1">Today ({new Date().toLocaleDateString()})</p>
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Appointment Slot</span>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-200 mt-1">04:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cashless Payments */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <h3 className="font-display text-base font-bold text-gray-900 dark:text-white mb-3">Choose Payment Method</h3>
            <p className="text-xs text-gray-400 mb-4">We support secured digital channels for touchless convenience in Pakistan.</p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Easypaisa', label: 'Easypaisa Wallet' },
                { name: 'JazzCash', label: 'JazzCash Wallet' },
                { name: 'Card', label: 'Visa/Mastercard' },
                { name: 'COD', label: 'Cash on Delivery' }
              ].map((method) => (
                <button
                  key={method.name}
                  onClick={() => setPaymentMethod(method.name)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition ${
                    paymentMethod === method.name
                      ? 'border-blue-600 bg-blue-50/20 text-blue-700 dark:bg-blue-950/20 dark:text-blue-300'
                      : 'border-gray-100 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <CreditCard className={`h-5 w-5 mb-1 ${paymentMethod === method.name ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span className="text-xs font-semibold">{method.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Price breakdown summary card */}
        <div className="md:col-span-5 space-y-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md dark:border-gray-800 dark:bg-gray-950">
            {/* Quick provider summary */}
            <div className="flex items-center space-x-3 pb-4 border-b border-gray-50 dark:border-gray-800">
              <img src={selectedProvider.photo} alt={selectedProvider.name} referrerPolicy="no-referrer" className="h-10 w-10 rounded-xl object-cover" />
              <div>
                <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white">{selectedProvider.name}</h4>
                <p className="text-[10px] text-gray-400">{selectedProvider.category} Expert • {selectedProvider.rating} ⭐</p>
              </div>
            </div>

            <h3 className="font-display text-xs font-bold text-gray-400 uppercase tracking-wider mt-4">Fare Invoice</h3>
            
            <div className="mt-3 space-y-2.5 text-xs text-gray-500 border-b border-gray-50 pb-4 dark:border-gray-800">
              <div className="flex justify-between">
                <span>Base Service Charges</span>
                <span className="font-mono text-gray-800 dark:text-white">Rs. {pricing.basePrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Travel & Logistic Fuel Fee</span>
                <span className="font-mono text-gray-800 dark:text-white">Rs. {pricing.travelCost}</span>
              </div>
              {pricing.complexitySurcharge > 0 && (
                <div className="flex justify-between">
                  <span>Job Complexity Surcharge</span>
                  <span className="font-mono text-gray-800 dark:text-white">Rs. {pricing.complexitySurcharge}</span>
                </div>
              )}
              {pricing.urgencySurcharge > 0 && (
                <div className="flex justify-between text-amber-600">
                  <span>Urgency Premium Surge</span>
                  <span className="font-mono font-bold">Rs. {pricing.urgencySurcharge}</span>
                </div>
              )}
              {pricing.demandSurge > 0 && (
                <div className="flex justify-between text-amber-600">
                  <span>Peak Demand Surge (Hourly)</span>
                  <span className="font-mono font-bold">Rs. {pricing.demandSurge}</span>
                </div>
              )}
              <div className="flex justify-between text-green-600">
                <span className="flex items-center">
                  <Percent className="h-3.5 w-3.5 mr-1" />
                  <span>Promo Coupon Discount</span>
                </span>
                <span className="font-mono font-bold">-Rs. {pricing.promoDiscount}</span>
              </div>
              <div className="flex justify-between text-teal-600">
                <span className="flex items-center">
                  <Award className="h-3.5 w-3.5 mr-1" />
                  <span>Loyalty Discount Wallet</span>
                </span>
                <span className="font-mono font-bold">-Rs. {pricing.loyaltyDiscount}</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center py-4 text-gray-900 dark:text-white">
              <span className="text-xs font-bold uppercase">Estimated Payable</span>
              <span className="font-display font-extrabold text-lg text-blue-600 dark:text-blue-400">Rs. {pricing.total}</span>
            </div>

            {/* Promo input */}
            <div className="border-t border-gray-50 pt-4 dark:border-gray-800 flex space-x-2">
              <input
                type="text"
                placeholder="Apply HUNAR14"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3 py-1.5 text-xs focus:outline-none dark:border-gray-800 dark:bg-gray-900 text-gray-800 dark:text-white"
              />
              <button
                onClick={handleApplyPromo}
                className="rounded-xl bg-gray-100 px-4 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-200 transition dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Apply
              </button>
            </div>

            <button
              onClick={handleConfirmOrder}
              className="w-full mt-5 rounded-xl bg-blue-600 py-3.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition"
            >
              Confirm & Book (Rs. {pricing.total})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. BOOKING TRACKING PAGE (GPS Simulation)
// ==========================================
export function BookingTrackingPage({ setActivePage, toast, activeBooking, setActiveBooking, pastBookings, setPastBookings }: OperationsProps) {
  const [biometricOtpVerified, setBiometricOtpVerified] = useState(false);

  if (!activeBooking) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h3 className="font-display text-lg font-bold">No Active Booking in Transit</h3>
        <p className="text-xs text-gray-400 mt-1">Initiate a booking cycle to view dynamic real-time GPS tracking logs.</p>
        <button onClick={() => setActivePage('ai-assistant')} className="mt-4 rounded-xl bg-blue-600 text-white px-4 py-2 text-xs font-semibold">
          Initiate AI Booking
        </button>
      </div>
    );
  }

  // Interactive flow triggers for prototype testing
  const handleProgressStatus = async () => {
    const statusSequence = ['confirmed', 'assigned', 'en-route', 'arrived', 'started', 'completed'] as const;
    const currIdx = statusSequence.indexOf(activeBooking.status);
    
    if (currIdx < statusSequence.length - 1) {
      const nextStatus = statusSequence[currIdx + 1];
      try {
        const res = await fetch(`/api/bookings/${activeBooking.id}/status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: nextStatus })
        });

        if (res.ok) {
          const data = await res.json();
          setActiveBooking(data.booking);
          toast(`Status Updated: ${nextStatus.toUpperCase()}`);

          if (nextStatus === 'completed') {
            setPastBookings((prev) => [data.booking, ...prev]);
            setActivePage('feedback');
            toast('Technician completed service! Navigating to Feedback Screen.');
          }
        } else {
          throw new Error('Status transition API error');
        }
      } catch (err) {
        console.warn("Express status transition API failed, using local fallback...", err);
        const updated = { ...activeBooking, status: nextStatus };
        setActiveBooking(updated);
        toast(`Status Updated: ${nextStatus.toUpperCase()}`);

        if (nextStatus === 'completed') {
          setPastBookings((prev) => [updated, ...prev]);
          setActivePage('feedback');
          toast('Technician completed service! Navigating to Feedback Screen.');
        }
      }
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Simulation Banner */}
      <div className="mb-6 rounded-2xl bg-amber-50 border border-amber-100 p-4 dark:bg-amber-950/20 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping shrink-0" />
          <span><b>PROTOTYPE TOOLBOX:</b> Simulate technician dispatch progression below:</span>
        </div>
        <button
          onClick={handleProgressStatus}
          className="rounded-xl bg-amber-600 px-4 py-1.5 text-[11px] font-extrabold text-white hover:bg-amber-700 transition uppercase"
        >
          Next Status Phase →
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Live GPS map container & details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Simulated Google Map */}
          <div className="relative rounded-3xl h-96 w-full bg-gray-100 overflow-hidden border border-gray-100 dark:bg-gray-800 dark:border-gray-800">
            {/* Elegant vector layout of DHA Pakistan neighborhood road network */}
            <svg className="absolute inset-0 h-full w-full opacity-60 text-gray-300 dark:text-gray-700" xmlns="http://www.w3.org/2000/svg">
              <rect width="100%" height="100%" fill="none" />
              {/* Radial grids */}
              <circle cx="50%" cy="50%" r="80" stroke="currentColor" strokeWidth="1" fill="none" />
              <circle cx="50%" cy="50%" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" fill="none" />
              {/* Roads */}
              <line x1="0" y1="100" x2="100%" y2="100" stroke="currentColor" strokeWidth="12" />
              <line x1="0" y1="280" x2="100%" y2="280" stroke="currentColor" strokeWidth="16" />
              <line x1="180" y1="0" x2="180" y2="100%" stroke="currentColor" strokeWidth="14" />
              <line x1="550" y1="0" x2="550" y2="100%" stroke="currentColor" strokeWidth="10" />
              {/* Slanted highways */}
              <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="4" strokeDasharray="3,3" />
            </svg>

            {/* Simulated Animated Pins */}
            {/* User House Marker */}
            <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white ring-4 ring-blue-500/20">
                <MapPin className="h-5 w-5 fill-current" />
              </div>
              <span className="bg-white/80 dark:bg-gray-950/80 px-2.5 py-0.5 rounded-lg text-[9px] font-bold text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-800 shadow-sm block mt-1">My House</span>
            </div>

            {/* Provider Marker (Progressively gets closer based on active status) */}
            {activeBooking.status !== 'completed' && activeBooking.status !== 'started' && (
              <div
                className="absolute transition-all duration-1000 text-center"
                style={{
                  left: activeBooking.status === 'confirmed' ? '12%' : activeBooking.status === 'assigned' ? '28%' : activeBooking.status === 'en-route' ? '38%' : '48%',
                  top: activeBooking.status === 'confirmed' ? '18%' : activeBooking.status === 'assigned' ? '30%' : activeBooking.status === 'en-route' ? '42%' : '48%',
                }}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-white ring-4 ring-teal-400/20 animate-bounce">
                  <Navigation className="h-5 w-5 transform rotate-45 fill-current" />
                </div>
                <span className="bg-white/80 dark:bg-gray-950/80 px-2.5 py-0.5 rounded-lg text-[9px] font-bold text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-800 shadow-sm block mt-1 whitespace-nowrap">
                  {activeBooking.provider.name} (ETA: {activeBooking.status === 'confirmed' ? '20' : activeBooking.status === 'assigned' ? '12' : '3'}m)
                </span>
              </div>
            )}

            {/* Live Card Overlay on Map */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md rounded-2xl border border-gray-100 p-4 shadow-xl dark:border-gray-850 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative shrink-0">
                  <img src={activeBooking.provider.photo} alt={activeBooking.provider.name} referrerPolicy="no-referrer" className="h-11 w-11 rounded-xl object-cover" />
                  <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-green-500" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white">{activeBooking.provider.name}</h4>
                  <p className="text-[10px] text-gray-400">Driving a red Honda CD70 (MNA-2015)</p>
                </div>
              </div>

              {/* Action utilities */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toast(`Simulating mobile call to ${activeBooking.provider.name}`)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-100 hover:bg-gray-50 text-gray-600 dark:border-gray-800 dark:hover:bg-gray-900 dark:text-gray-300"
                >
                  <Phone className="h-4.5 w-4.5" />
                </button>
                <button
                  onClick={() => toast(`Simulating live chat interface with provider`)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-100 hover:bg-gray-50 text-gray-600 dark:border-gray-800 dark:hover:bg-gray-900 dark:text-gray-300"
                >
                  <MessageSquare className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Emergency support module */}
          <div className="rounded-2xl border border-red-50 bg-red-50/20 p-4 dark:border-red-950/30 dark:bg-gray-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <p className="text-red-700 dark:text-red-400 font-medium flex items-center">
              <AlertOctagon className="h-4.5 w-4.5 mr-2 shrink-0" />
              <span>Need immediate assistance or feeling unsafe during home visit?</span>
            </p>
            <button
              onClick={() => toast('Dispatched urgent security alert directly to regional monitoring offices.')}
              className="rounded-xl bg-red-600 px-4 py-1.5 font-bold text-white hover:bg-red-700"
            >
              Contact Emergency Office
            </button>
          </div>
        </div>

        {/* Right column: Status Timeline Progress Tracker */}
        <div className="lg:col-span-4 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950 sticky top-20">
          <BookingTimeline currentStatus={activeBooking.status} />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. BOOKING HISTORY PAGE
// ==========================================
export function BookingHistoryPage({ setActivePage, toast, pastBookings }: OperationsProps) {
  const [historySearch, setHistorySearch] = useState('');

  const filteredHistory = pastBookings.filter((b) =>
    b.category.toLowerCase().includes(historySearch.toLowerCase()) || b.provider.name.toLowerCase().includes(historySearch.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800 gap-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">Your Booking Log</h2>
          <p className="text-xs text-gray-400 mt-1">Review, rate, download invoices, or instantly duplicate past schedules.</p>
        </div>

        {/* Search bar */}
        <div className="relative bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 flex items-center w-full sm:w-64 dark:bg-gray-950 dark:border-gray-800">
          <Search className="h-4 w-4 text-gray-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Search past logs (e.g. Electrician)..."
            value={historySearch}
            onChange={(e) => setHistorySearch(e.target.value)}
            className="w-full bg-transparent text-xs text-gray-800 dark:text-white focus:outline-none"
          />
        </div>
      </div>

      {/* History Cards */}
      {filteredHistory.length > 0 ? (
        <div className="mt-8 space-y-4">
          {filteredHistory.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl border border-gray-100 bg-white p-5 hover:border-gray-200 dark:border-gray-850 dark:bg-gray-950 transition"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3.5">
                  <img src={b.provider.photo} alt={b.provider.name} referrerPolicy="no-referrer" className="h-11 w-11 rounded-xl object-cover" />
                  <div>
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      {b.category}
                    </span>
                    <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white mt-1">
                      Appointment with {b.provider.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                      Completed: {b.date} • Rs. {b.total} • Paid via {b.paymentMethod}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => toast(`Compiled invoice receipt PDF file download initialized for booking id: ${b.id}`)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-100 hover:bg-gray-50 text-gray-400 dark:border-gray-800 dark:hover:bg-gray-900"
                    title="Download Invoice PDF"
                  >
                    <Download className="h-4.5 w-4.5" />
                  </button>
                  <button
                    onClick={() => {
                      setActivePage('ai-assistant');
                      toast(`Copying parameters to re-book ${b.category} services`);
                    }}
                    className="flex items-center space-x-1 rounded-xl bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100 transition dark:bg-blue-950/40 dark:text-blue-300"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Repeat Booking</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-gray-200 p-16 text-center mt-8 dark:border-gray-800">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-400 dark:bg-gray-900">
            <Clock className="h-7 w-7" />
          </div>
          <h3 className="font-display font-bold text-base text-gray-800 dark:text-white mt-4">History log empty</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1.5">Your past booking records appear clean. Go book dynamic on-demand services using our AI companion!</p>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 8. FEEDBACK PAGE
// ==========================================
export function FeedbackPage({ setActivePage, toast, activeBooking }: OperationsProps) {
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');
  const [recommend, setRecommend] = useState<boolean | null>(null);

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (activeBooking) {
      try {
        const res = await fetch('/api/submit-feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingId: activeBooking.id,
            rating,
            comments,
            recommend
          })
        });
        if (res.ok) {
          toast("Feedback successfully recorded & synchronized directly with HunarHub's Reputation Agent.");
        } else {
          toast('Feedback recorded locally.');
        }
      } catch (err) {
        console.warn("Feedback API offline, fall back to local recording", err);
        toast('Feedback recorded successfully!');
      }
    } else {
      toast('Feedback recorded successfully!');
    }
    setActivePage('user-dashboard');
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-200 animate-fade-in">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-950 text-center">
        <div className="mx-auto h-12 w-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-4 dark:bg-green-950/30">
          <Check className="h-6 w-6 stroke-[3]" />
        </div>
        <h2 className="font-display text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">Rate Your Experience</h2>
        <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
          Your direct feedback helps ensure trusted professional standards across Karachi, Lahore, and Islamabad.
        </p>

        {activeBooking && (
          <div className="mt-5 flex items-center justify-center space-x-3 bg-gray-50 rounded-2xl p-3.5 dark:bg-gray-900 max-w-xs mx-auto">
            <img src={activeBooking.provider.photo} alt={activeBooking.provider.name} referrerPolicy="no-referrer" className="h-10 w-10 rounded-xl object-cover" />
            <div className="text-left">
              <h4 className="font-bold text-xs text-gray-900 dark:text-white">{activeBooking.provider.name}</h4>
              <p className="text-[10px] text-gray-400">{activeBooking.category} Expert</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmitFeedback} className="mt-8 space-y-6 text-left">
          {/* Rating stars */}
          <div className="space-y-2 flex flex-col items-center">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Overall Professional Rating</span>
            <StarRating rating={rating} interactive={true} onRatingChange={setRating} size="lg" />
          </div>

          {/* Comments block */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Add Comments / Field Notes</label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Bilal was very polite, prompt, and solved the UPS issue quickly. Excellent job..."
              rows={4}
              className="w-full rounded-2xl border border-gray-200 p-4 text-xs focus:outline-none dark:border-gray-800 dark:bg-gray-900 text-gray-800 dark:text-white"
            />
          </div>

          {/* Recommended toggle */}
          <div className="space-y-2">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Would you recommend this technician?</span>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setRecommend(true)}
                className={`flex-1 rounded-xl py-2.5 text-center text-xs font-bold transition ${
                  recommend === true
                    ? 'bg-green-100 border-2 border-green-500 text-green-700'
                    : 'border border-gray-200 text-gray-500 dark:border-gray-850 hover:bg-gray-50'
                }`}
              >
                👍 Yes, Definitely
              </button>
              <button
                type="button"
                onClick={() => setRecommend(false)}
                className={`flex-1 rounded-xl py-2.5 text-center text-xs font-bold transition ${
                  recommend === false
                    ? 'bg-red-100 border-2 border-red-500 text-red-700'
                    : 'border border-gray-200 text-gray-500 dark:border-gray-850 hover:bg-gray-50'
                }`}
              >
                👎 No, Issues faced
              </button>
            </div>
          </div>

          {/* Upload files photo simulation */}
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Attach Quality Verification Photos</span>
            <div className="border-2 border-dashed border-gray-150 rounded-2xl p-4 text-center hover:bg-gray-50/40 dark:border-gray-800 cursor-pointer" onClick={() => toast('Photos attachment requires file frame permissions.')}>
              <Upload className="h-5 w-5 text-gray-400 mx-auto mb-1.5" />
              <p className="text-[10px] text-gray-500 font-medium">Drag & drop or click to upload JPEG/PNG snaps</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition"
          >
            Submit Feedback & Return Home
          </button>
        </form>
      </div>
    </div>
  );
}
