import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Award,
  DollarSign,
  User,
  Users,
  Briefcase,
  Shield,
  Activity,
  CheckCircle,
  MapPin,
  Clock,
  Filter,
  Eye,
  Settings,
  Bell,
  Download,
  Flame,
  ChevronRight,
  ShieldCheck,
  Zap,
  Info,
  AlertTriangle,
  Play,
  Sparkles
} from 'lucide-react';
import { Provider, Page, Booking, AppNotification, AuthUser } from '../types';
import { mockProviders, mockBookingHistory, mockNotifications } from '../data';
import { populateDatabase } from '../lib/seedDatabase';
import StarRating from '../components/StarRating';

interface DashboardProps {
  setActivePage: (page: Page) => void;
  toast: (msg: string) => void;
  activeBooking: Booking | null;
  pastBookings: Booking[];
  currentUser?: AuthUser | null;
}

// ==========================================
// 9. USER DASHBOARD
// ==========================================
export function UserDashboard({ setActivePage, toast, activeBooking, pastBookings, currentUser }: DashboardProps) {
  const loyaltyPoints = 1420;
  const savingsPKR = 1800;

  // Favorites providers mockup
  const favorites = [mockProviders[0], mockProviders[3]];

  const userGreetingName = currentUser?.displayName ? currentUser.displayName.split(' ')[0] : 'Fahad';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800 gap-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">Assalam-o-Alaikum, {userGreetingName}!</h2>
          <p className="text-xs text-gray-400 mt-1">Manage schedules, track live transit, check saved addresses, and view loyalty discount pools.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActivePage('ai-assistant')}
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition w-full sm:w-auto"
          >
            🚀 Book New Service with AI
          </button>
        </div>
      </div>

      {/* Bento Grid Analytics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-950/40">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Loyalty Points Wallet</span>
          <div className="flex items-baseline space-x-1.5 mt-2">
            <span className="font-display font-extrabold text-xl text-gray-900 dark:text-white">{loyaltyPoints}</span>
            <span className="text-[10px] font-semibold text-teal-600">Points Pool</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-1">Earned via verified local bookings.</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-950/40">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Gross Marketplace Savings</span>
          <div className="flex items-baseline space-x-1.5 mt-2">
            <span className="font-display font-extrabold text-xl text-gray-900 dark:text-white">Rs. {savingsPKR}</span>
            <span className="text-[10px] font-semibold text-green-600">Saved</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-1">Saved from competitive pricing matching.</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-950/40">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Completed Bookings</span>
          <div className="flex items-baseline space-x-1.5 mt-2">
            <span className="font-display font-extrabold text-xl text-gray-900 dark:text-white">{pastBookings.length}</span>
            <span className="text-[10px] font-semibold text-blue-600">Jobs Logged</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-1">Punctual domestic assistances.</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-950/40">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Verification Level</span>
          <div className="flex items-center space-x-1.5 mt-3 text-green-600 font-bold text-xs">
            <ShieldCheck className="h-5 w-5" />
            <span>NADRA Biometric Clear</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-1">Synced with Pakistan ID rosters.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
        {/* Left main: Bookings status & logs */}
        <div className="lg:col-span-8 space-y-6">
          {/* Upcoming / Active tracking slot */}
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/20 to-white p-6 shadow-sm dark:border-gray-850 dark:bg-gray-950">
            <div className="flex items-center justify-between border-b border-gray-50 pb-3 dark:border-gray-800">
              <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <Clock className="h-4.5 w-4.5 text-blue-500 animate-spin-slow" />
                <span>Active Booking Dispatch</span>
              </h3>
              {activeBooking ? (
                <button
                  onClick={() => setActivePage('booking-tracking')}
                  className="rounded-xl bg-blue-600 px-3 py-1 text-[10px] font-bold text-white uppercase hover:bg-blue-700 transition"
                >
                  Track GPS Live
                </button>
              ) : (
                <span className="text-[10px] font-bold text-gray-400 font-mono">STATUS: SILENT</span>
              )}
            </div>

            {activeBooking ? (
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={activeBooking.provider.photo} alt={activeBooking.provider.name} referrerPolicy="no-referrer" className="h-10 w-10 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-display font-bold text-xs text-gray-900 dark:text-white">{activeBooking.provider.name}</h4>
                    <p className="text-[10px] text-gray-400">{activeBooking.category} • ETA: {activeBooking.provider.etaMinutes} mins</p>
                  </div>
                </div>
                <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-[9px] font-bold text-teal-700 capitalize animate-pulse">
                  {activeBooking.status}
                </span>
              </div>
            ) : (
              <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                No active bookings currently dispatched. Need some domestic chore or device diagnostic repairs? Speak directly to our AI helper to trigger a verified dispatch!
              </p>
            )}
          </div>

          {/* Favorites providers list widget */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-4">Saved / Favorite Technicians</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {favorites.map((fav) => (
                <div
                  key={fav.id}
                  className="rounded-xl border border-gray-50 p-3 flex items-center justify-between dark:border-gray-850 dark:bg-gray-900"
                >
                  <div className="flex items-center space-x-3">
                    <img src={fav.photo} alt={fav.name} referrerPolicy="no-referrer" className="h-9 w-9 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-xs text-gray-800 dark:text-white">{fav.name}</h4>
                      <p className="text-[9px] text-gray-400">{fav.category} • {fav.rating} ⭐</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setActivePage('ai-assistant');
                      toast(`Initiating re-booking for ${fav.name}`);
                    }}
                    className="rounded-lg bg-blue-50 p-1.5 text-blue-600 hover:bg-blue-100 transition dark:bg-blue-950/40"
                  >
                    <Zap className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right main sidebar: notifications & addresses */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-3">Saved Demographics</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4.5 w-4.5 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-700 dark:text-gray-300">Home Address</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">House 412, Block Y, DHA Phase 3, Lahore</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4.5 w-4.5 text-blue-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-700 dark:text-gray-300">Office Headquarter</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Commercial Block Z, DHA Phase 5, Lahore</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-3">AI Suggestions</h3>
            <div className="rounded-xl border border-teal-100 bg-teal-50/10 p-3.5 text-xs text-teal-800 dark:border-teal-950/40 dark:text-teal-300">
              <span className="font-extrabold flex items-center mb-1">
                <Zap className="h-4 w-4 mr-1 text-teal-500 animate-pulse" />
                <span>Monsoon Warning AC Service</span>
              </span>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Humidity levels are rising above 85% in Lahore grid sector DHA Phase 3. Diagnostics suggest chemical cleaning on outdoor unit compressors prevents breakdown.
              </p>
              <button
                onClick={() => {
                  setActivePage('ai-assistant');
                  toast('AI pre-loaded with AC Monsoon diagnostics');
                }}
                className="mt-2.5 font-bold text-[10px] text-teal-600 dark:text-teal-400 hover:underline"
              >
                Perform Instant Checkup →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 10. PROVIDER DASHBOARD (Technician Desk)
// ==========================================
export function ProviderDashboard({ setActivePage, toast }: DashboardProps) {
  const [online, setOnline] = useState(true);

  // Today's jobs queue mockup
  const queue = [
    { customer: 'Fahad Taj', loc: 'DHA Phase 3', issue: 'Tripping main breaker checkup', time: '04:30 PM', price: 'Rs. 800' }
  ];

  const handleToggleOnlineStatus = () => {
    setOnline(!online);
    toast(online ? 'Provider Desk switched to OFFLINE' : 'Provider Desk switched to ONLINE & listening');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800 gap-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">Assalam-o-Alaikum, Bilal!</h2>
          <p className="text-xs text-gray-400 mt-1">Check today\'s route pipelines, earnings summaries, customer ratings, and NADRA credentials.</p>
        </div>

        {/* Availability toggle */}
        <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 dark:bg-gray-950 dark:border-gray-800">
          <span className="text-xs font-bold text-gray-500">Status:</span>
          <span className={`text-xs font-bold uppercase ${online ? 'text-green-600' : 'text-gray-400'}`}>
            {online ? 'Listening Online' : 'Snoozed'}
          </span>
          <button
            onClick={handleToggleOnlineStatus}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              online ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-800'
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                online ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Bento telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-950/40">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Today\'s Completed Invoices</span>
          <p className="font-display font-extrabold text-xl text-gray-900 dark:text-white mt-2">Rs. 4,200</p>
          <span className="text-[9px] text-green-600 font-bold block mt-0.5">↑ 12% compared to last Monday</span>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-950/40">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Customer Satisfaction Index</span>
          <p className="font-display font-extrabold text-xl text-gray-900 dark:text-white mt-2">4.92 / 5.00</p>
          <span className="text-[9px] text-teal-600 font-bold block mt-0.5">Top 3% national rank tier</span>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-950/40">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Reliability Grade Status</span>
          <p className="font-display font-extrabold text-xl text-green-600 mt-2">A+ Grade</p>
          <span className="text-[9px] text-gray-400 block mt-0.5">99.2% prompt arrival rates</span>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-950/40">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Completed Jobs Pool</span>
          <p className="font-display font-extrabold text-xl text-gray-900 dark:text-white mt-2">924 Jobs</p>
          <span className="text-[9px] text-gray-400 block mt-0.5">Since verification validation</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
        {/* Left main: Dispatch queue */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-4">Incoming Dispatch Pipelines</h3>
            {online ? (
              <div className="space-y-3">
                {queue.map((q, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-gray-100 bg-gray-50/40 p-4 dark:border-gray-850 dark:bg-gray-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div>
                      <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-[9px] font-bold text-blue-700">Pending Arrival</span>
                      <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white mt-2">{q.customer}</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">Location: {q.loc} • Target: {q.issue}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-gray-800 dark:text-gray-200">{q.price}</span>
                      <button
                        onClick={() => {
                          setActivePage('booking-tracking');
                          toast('Opening diagnostic GPS route maps for Bilal');
                        }}
                        className="rounded-lg bg-blue-600 text-white px-3 py-1.5 text-xs font-bold hover:bg-blue-700"
                      >
                        Start Transit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-400 leading-relaxed">
                You are currently set to OFFLINE. Switch your status toggle to ONLINE to listen to real-time dispatch matching coordinates.
              </p>
            )}
          </div>

          {/* Performance chart mock */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-2">Earnings & Dispatch Inflow History</h3>
            <p className="text-[10px] text-gray-400 mb-4">Historical visual of gross commissions over the last 6 months.</p>
            <div className="h-44 flex items-end justify-between px-4 border-b border-gray-100 pb-2 dark:border-gray-800">
              {[
                { label: 'Jan', h: '35%' },
                { label: 'Feb', h: '50%' },
                { label: 'Mar', h: '45%' },
                { label: 'Apr', h: '70%' },
                { label: 'May', h: '85%' },
                { label: 'Jun', h: '95%' }
              ].map((bar, idx) => (
                <div key={idx} className="flex flex-col items-center w-8 group">
                  <div className="w-full bg-blue-600 rounded-t-md hover:bg-blue-500 transition-all cursor-pointer" style={{ height: bar.h }} />
                  <span className="text-[9px] text-gray-400 mt-2 font-mono">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right sidebar details */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950 text-center">
            <ShieldCheck className="h-10 w-10 text-green-600 mx-auto" />
            <h4 className="font-display font-bold text-sm text-gray-900 dark:text-white mt-3">NADRA Safety Clear</h4>
            <p className="text-[11px] text-gray-400 mt-1 max-w-xs mx-auto">
              Your biometric verification profile successfully synchronized with Nadra datasets on 2026-07-15. Background checks are 100% green.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 11. ADMIN DASHBOARD (Command Center)
// ==========================================
export function AdminDashboard({ setActivePage, toast }: DashboardProps) {
  const [analytics, setAnalytics] = useState<any>(null);
  const [disputes, setDisputes] = useState<any[]>([
    { id: 'disp-102', customerName: 'Hassan S.', providerName: 'Waqas B.', category: 'Overcharging', status: 'resolved', claimText: 'Estimated price was Rs. 800, but Bilal charged Rs. 1500 for wiring.', decisionExplanation: 'Observation: App invoice estimate was Rs. 800, while provider charged Rs. 1500. Decision: Approved. Partial refund of Rs. 700 recommended. Penalizing provider reliability score.', date: '2026-07-20' }
  ]);
  const [auditedDisputeId, setAuditedDisputeId] = useState<string | null>(null);

  const fetchAdminData = async () => {
    try {
      const resAnal = await fetch('/api/admin/analytics');
      if (resAnal.ok) {
        const analData = await resAnal.json();
        setAnalytics(analData);
      }
      const resData = await fetch('/api/data');
      if (resData.ok) {
        const fullData = await resData.json();
        if (fullData.disputes && fullData.disputes.length > 0) {
          setDisputes(fullData.disputes);
        }
      }
    } catch (err) {
      console.warn("Failed to retrieve admin data from server", err);
    }
  };

  React.useEffect(() => {
    fetchAdminData();
  }, []);

  const handleCreateSampleDispute = async () => {
    try {
      // Find a valid booking ID from past bookings if possible, or use a default
      const res = await fetch('/api/create-dispute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: 'b-77382',
          category: 'Overcharging',
          claimText: 'I was quoted Rs. 850 by the pricing algorithm, but Bilal asked for Rs. 1300 upon completion citing traffic.',
          chargedPrice: 1300
        })
      });
      if (res.ok) {
        toast('New simulated overcharge claim filed & resolved by AI Dispute Agent!');
        fetchAdminData();
      } else {
        const errData = await res.json();
        toast(`Filing issue: ${errData.error || 'Server error'}`);
      }
    } catch (err) {
      toast('Failed to register dispute on backend.');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800 gap-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">Admin Command Center</h2>
          <p className="text-xs text-gray-400 mt-1">Neural AI pipeline telemetry, dispatch grids status, active disputes logs, and provider biometric clearing.</p>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            onClick={async () => {
              toast('Populating database with providers, bookings, reviews, and user records...');
              try {
                const result = await populateDatabase();
                toast(`Database successfully populated! (${result.seededProviders} providers, ${result.seededBookings} bookings)`);
              } catch (err: any) {
                toast(`Populate database error: ${err?.message || 'Error occurred'}`);
              }
            }}
            className="rounded-xl bg-emerald-600 px-3.5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition"
          >
            🗄️ Populate Database
          </button>
          <button
            onClick={handleCreateSampleDispute}
            className="rounded-xl bg-amber-600 px-3.5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-amber-700 transition"
          >
            ⚖️ Simulate Dispute Case
          </button>
          <button
            onClick={() => toast('Exporting platform CSV telemetry dataset to local workspace.')}
            className="rounded-xl border border-gray-200 hover:bg-gray-50 px-3.5 py-2.5 text-xs font-bold text-gray-700 dark:border-gray-800 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* Admin telemetries */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-950/40">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Total Registered Bookings</span>
          <p className="font-display font-extrabold text-xl text-gray-900 dark:text-white mt-1">
            {analytics ? analytics.totalBookings : '24,502'}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-950/40">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Completed Job Count</span>
          <p className="font-display font-extrabold text-xl text-gray-900 dark:text-white mt-1">
            {analytics ? analytics.completedCount : '2,854'}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-950/40">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Gross Marketplace Volume</span>
          <p className="font-display font-extrabold text-xl text-gray-900 dark:text-white mt-1">
            {analytics ? `Rs. ${analytics.revenue.toLocaleString()}` : 'Rs. 8.4M'}
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-950/40">
          <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Dispute Incident Ratio</span>
          <p className="font-display font-extrabold text-xl text-red-500 mt-1">
            0.14%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
        {/* Left main Admin sections */}
        <div className="lg:col-span-8 space-y-6">
          {/* Dispute investigation list */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-4">Active Disputes Investigation</h3>
            <div className="space-y-3">
              {disputes.map((d, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-gray-100 p-4 bg-gray-50/30 dark:border-gray-850 dark:bg-gray-900/30 flex flex-col gap-3 text-xs"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-[9px] font-bold text-red-700 dark:bg-red-950/30 dark:text-red-400">
                        Dispute Id: {d.id}
                      </span>
                      <h4 className="font-display font-bold text-gray-900 dark:text-white mt-1.5">
                        {d.customerName || d.customer} vs {d.providerName || d.provider} ({d.category})
                      </h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">Claim: "{d.claimText || 'Property damage assessment.'}"</p>
                    </div>

                    <div className="flex items-center space-x-2 self-end sm:self-auto">
                      <span className="text-[10px] font-mono font-bold text-amber-600 capitalize">{d.status}</span>
                      <button
                        onClick={() => {
                          setAuditedDisputeId(auditedDisputeId === d.id ? null : d.id);
                          toast(`Auditing claim dossier for id: ${d.id}`);
                        }}
                        className="rounded-xl bg-blue-600 text-white px-3 py-1.5 font-bold text-[11px]"
                      >
                        {auditedDisputeId === d.id ? 'Hide Analysis' : 'Audit Dispute'}
                      </button>
                    </div>
                  </div>

                  {auditedDisputeId === d.id && (
                    <div className="mt-2 p-3 bg-teal-50/30 border border-teal-100 dark:bg-teal-950/10 dark:border-teal-900/40 rounded-xl animate-fade-in">
                      <div className="flex items-center space-x-1.5 text-teal-600 dark:text-teal-400 font-bold mb-1">
                        <Sparkles className="h-4 w-4" />
                        <span>AI Claims Evaluator Decision Summary</span>
                      </div>
                      <p className="text-[11px] text-gray-700 dark:text-gray-300 leading-relaxed">
                        {d.decisionExplanation || d.explanation || 'Observation: Complaint logs parsed successfully. Decision: Standard validation. Refund evaluated as Rs. 0. Direct operations manager assigned.'}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* AI Neural monitoring logs */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <div className="flex items-center space-x-2 pb-3 border-b border-gray-50 dark:border-gray-800">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
              <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white">AI Neural pipeline monitoring console</h3>
            </div>
            <div className="mt-4 rounded-xl bg-gray-950 p-4 font-mono text-[10px] text-green-400 space-y-1.5 h-44 overflow-y-auto scrollbar">
              <p className="text-gray-500">[2026-07-20 05:23:40] INIT neural language tokenizer model v4.2.0...</p>
              <p className="text-gray-500">[2026-07-20 05:23:42] SYNCing DHA spatial coordinate grid tables...</p>
              <p className="text-green-400">[2026-07-20 05:23:48] OK: NADRA Biometric API gateway response: 200 OK</p>
              <p className="text-green-400">[2026-07-20 05:23:56] PARSING INTENT: AC cooling diagnostic request (Lahore sector)...</p>
              <p className="text-blue-400">[2026-07-20 05:24:00] MATCHED: Muhammad Bilal (Electrician ID: p1) with 99% confidence.</p>
              <p className="text-green-400">[2026-07-20 05:24:04] ROUTING_ENGINE: Dispatched CD70 transit coordinate vectors.</p>
            </div>
          </div>
        </div>

        {/* Right sidebar: provider biometric clearance check list */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950">
            <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white mb-3">Pending NADRA Approvals</h3>
            <div className="space-y-3">
              {mockProviders.slice(3, 5).map((p) => (
                <div key={p.id} className="flex items-center justify-between text-xs pb-3 border-b border-gray-50 last:border-b-0 last:pb-0 dark:border-gray-800">
                  <div className="flex items-center space-x-2.5">
                    <img src={p.photo} alt={p.name} referrerPolicy="no-referrer" className="h-8 w-8 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-200">{p.name}</h4>
                      <p className="text-[10px] text-gray-400">{p.category}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => toast(`Nadra fingerprint data validated and synchronized for candidate: ${p.name}`)}
                    className="rounded-lg bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-700 hover:bg-green-100 transition dark:bg-green-950/40"
                  >
                    Clear Biometrics
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
