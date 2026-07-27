import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Star,
  Users,
  Search,
  Filter,
  Check,
  Volume2,
  Mic,
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  Bookmark,
  Award,
  ChevronDown,
  Info,
  ThumbsUp,
  Sliders,
  DollarSign,
  Heart
} from 'lucide-react';
import { Provider, Page, ChatMessage, Review } from '../types';
import { mockProviders, mockReviews } from '../data';
import ProviderCard from '../components/ProviderCard';
import AIReasoningCard from '../components/AIReasoningCard';
import StarRating from '../components/StarRating';

// Shared Props
interface PageProps {
  setActivePage: (page: Page) => void;
  toast: (msg: string) => void;
  selectedProvider: Provider | null;
  setSelectedProvider: (provider: Provider | null) => void;
  searchFilter: string;
  setSearchFilter: (filter: string) => void;
  setAiExtractedIntent: (intent: any) => void;
}

// ==========================================
// 1. LANDING PAGE (Bento Grid Theme)
// ==========================================
export function LandingPage({
  setActivePage,
  toast,
  selectedProvider,
  setSelectedProvider,
  searchFilter,
  setSearchFilter,
  setAiExtractedIntent,
}: PageProps) {
  const [quickInput, setQuickInput] = useState('');
  const [selectedCity, setSelectedCity] = useState('Lahore');

  const cities = ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad'];

  const handleQuickBook = (category: string) => {
    setSearchFilter(category);
    setActivePage('ai-assistant');
    toast(`AI Agent initiated for category: ${category} in ${selectedCity}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    const fullQuery = `${quickInput} in ${selectedCity}`;
    setSearchFilter(fullQuery);
    setActivePage('ai-assistant');
    toast(`AI agent pre-loaded with query: "${quickInput}" (${selectedCity})`);
  };

  const handleSuggestClick = (query: string) => {
    setQuickInput(query);
    setSearchFilter(`${query} in ${selectedCity}`);
    setActivePage('ai-assistant');
    toast(`AI agent pre-loaded with suggestion: "${query}"`);
  };

  const categories = [
    { name: 'Electrician', icon: '⚡', count: '18 active nearby', bg: 'bg-blue-50/70 border-blue-100 text-blue-600 dark:bg-blue-950/40 dark:border-blue-900/40 dark:text-blue-400' },
    { name: 'AC Technician', icon: '❄️', count: '12 active nearby', bg: 'bg-teal-50/70 border-teal-100 text-teal-600 dark:bg-teal-950/40 dark:border-teal-900/40 dark:text-teal-400' },
    { name: 'Plumber', icon: '🚰', count: '15 active nearby', bg: 'bg-indigo-50/70 border-indigo-100 text-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-900/40 dark:text-indigo-400' },
    { name: 'Beautician', icon: '💄', count: '22 active nearby', bg: 'bg-pink-50/70 border-pink-100 text-pink-600 dark:bg-pink-950/40 dark:border-pink-900/40 dark:text-pink-400' },
    { name: 'Tutor', icon: '📚', count: '9 active nearby', bg: 'bg-purple-50/70 border-purple-100 text-purple-600 dark:bg-purple-950/40 dark:border-purple-900/40 dark:text-purple-400' },
    { name: 'Driver', icon: '🚗', count: '14 active nearby', bg: 'bg-amber-50/70 border-amber-100 text-amber-600 dark:bg-amber-950/40 dark:border-amber-900/40 dark:text-amber-400' }
  ];

  const recommendedPros = mockProviders.slice(0, 3);

  return (
    <div className="bg-[#F8FAFC] dark:bg-gray-900/40 transition-colors duration-200 py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* TOP ROW BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Bento Card 1: Main Search & Hero Pitch (col-span-8) */}
          <section className="lg:col-span-8 bg-white dark:bg-gray-950 rounded-3xl border border-slate-200/80 dark:border-gray-800/80 p-6 sm:p-8 shadow-sm flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-4 text-left">
              <span className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
                <span>Verified Home & On-Demand Services in Pakistan</span>
              </span>

              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-4.5xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white">
                Book Trusted Local Experts. <br />
                <span className="text-emerald-700 dark:text-emerald-400">At Your Doorstep in Minutes.</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-gray-300 max-w-xl leading-relaxed">
                Connect directly with background-checked plumbers, electricians, tutors, drivers, beauticians, and technicians in your neighborhood.
              </p>

              {/* City Selection Bar */}
              <div className="flex items-center space-x-2 pt-1 overflow-x-auto no-scrollbar">
                <span className="text-[11px] font-semibold text-slate-500 flex items-center shrink-0">
                  <MapPin className="h-3.5 w-3.5 text-rose-500 mr-1" />
                  City:
                </span>
                <div className="flex space-x-1.5 shrink-0">
                  {cities.map((city) => {
                    const isActive = selectedCity === city;
                    return (
                      <button
                        key={city}
                        type="button"
                        onClick={() => {
                          setSelectedCity(city);
                          toast(`Switched city to: ${city}`);
                        }}
                        className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-slate-900 text-white shadow-sm dark:bg-emerald-600'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800'
                        }`}
                      >
                        {city}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Search Box */}
              <form onSubmit={handleSearchSubmit} className="relative w-full max-w-2xl mt-2">
                <input
                  type="text"
                  placeholder={`What service do you need in ${selectedCity}? (e.g. AC cooling check, pipe leakage)...`}
                  value={quickInput}
                  onChange={(e) => setQuickInput(e.target.value)}
                  className="w-full h-12 pl-11 pr-32 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 transition-all outline-none text-xs sm:text-sm font-medium"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Search className="h-4 w-4" />
                </div>
                <button 
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-slate-900 text-white rounded-lg font-semibold text-xs shadow-sm hover:bg-slate-800 transition active:scale-95 flex items-center space-x-1.5 dark:bg-emerald-600 dark:hover:bg-emerald-500"
                >
                  <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Find Experts</span>
                </button>
              </form>

              {/* Suggestion tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                <span className="text-[11px] text-slate-400 font-medium mr-1">Popular requests:</span>
                <button
                  type="button"
                  onClick={() => handleSuggestClick('AC gas leak recharge')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-full text-xs font-medium text-slate-600 dark:text-gray-300 transition"
                >
                  "AC Gas Top-Up"
                </button>
                <button
                  type="button"
                  onClick={() => handleSuggestClick('UPS repair diagnostic')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-full text-xs font-medium text-slate-600 dark:text-gray-300 transition"
                >
                  "UPS Repair"
                </button>
                <button
                  type="button"
                  onClick={() => handleSuggestClick('Leaking bathroom pipe repair')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-full text-xs font-medium text-slate-600 dark:text-gray-300 transition"
                >
                  "Water Leakage"
                </button>
                <button
                  type="button"
                  onClick={() => handleSuggestClick('Home tutor O/A Level Math')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-gray-900 dark:hover:bg-gray-800 rounded-full text-xs font-medium text-slate-600 dark:text-gray-300 transition"
                >
                  "O-Level Math Tutor"
                </button>
              </div>
            </div>
          </section>

          {/* Bento Card 2: Live Status & Safety Assurance (col-span-4) */}
          <aside className="lg:col-span-4 bg-white dark:bg-gray-950 rounded-3xl border border-slate-200/80 dark:border-gray-800/80 p-6 shadow-sm overflow-hidden flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">Active Service Network</h3>
                <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/55 text-emerald-800 dark:text-emerald-300 text-[10px] font-semibold rounded-full uppercase tracking-wider">
                  Real-Time
                </span>
              </div>
              
              <div className="space-y-4 mt-2 text-left">
                <div className="relative pl-7 pb-2">
                  <div className="absolute left-0 top-0.5 w-4.5 h-4.5 bg-emerald-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                    ✓
                  </div>
                  <div className="absolute left-[9px] top-5 bottom-0 w-[1.5px] bg-emerald-200 dark:bg-emerald-900" />
                  <p className="text-xs font-semibold text-slate-800 dark:text-gray-200">Instant AI Matching</p>
                  <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-0.5">Analyzes issue details to pair you with certified candidates nearby.</p>
                </div>
                
                <div className="relative pl-7 pb-2">
                  <div className="absolute left-0 top-0.5 w-4.5 h-4.5 bg-emerald-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                    ✓
                  </div>
                  <div className="absolute left-[9px] top-5 bottom-0 w-[1.5px] bg-emerald-200 dark:bg-emerald-900" />
                  <p className="text-xs font-semibold text-slate-800 dark:text-gray-200">CNIC & Police Checked</p>
                  <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-0.5">Every technician undergoes mandatory identity verification.</p>
                </div>
                
                <div className="relative pl-7">
                  <div className="absolute left-0 top-0.5 w-4.5 h-4.5 bg-slate-200 dark:bg-gray-800 rounded-full flex items-center justify-center text-slate-600 dark:text-gray-400 text-[10px] font-semibold">
                    3
                  </div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-gray-300">Upfront Price Guarantee</p>
                  <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-0.5">Clear job quotes before work starts — no hidden surcharges.</p>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-slate-50 dark:bg-gray-900/60 rounded-2xl p-3.5 border border-slate-200/60 dark:border-gray-800">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">Fastest Response</span>
                <span className="text-emerald-700 dark:text-emerald-400 text-xs font-semibold">~12 Min Average ETA</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-gray-300 mt-1 leading-relaxed text-left">
                Available pros are currently online across Lahore, Karachi, and Islamabad.
              </p>
            </div>
          </aside>

        </div>

        {/* MID ROW BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">

          {/* Bento Card 3: Community Stats (col-span-4) */}
          <section className="lg:col-span-4 bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="relative z-10 flex flex-col justify-between h-full text-left">
              <div>
                <p className="text-[10px] font-semibold uppercase text-emerald-400 tracking-wider mb-1">Local Network</p>
                <p className="font-display text-3xl font-bold tracking-tight mt-1">1,240+</p>
                <p className="text-xs text-slate-300 mt-1">Verified Local Professionals</p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-200 bg-[url('https://api.dicebear.com/7.x/avataaars/svg?seed=Junaid')] bg-cover" />
                  <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-300 bg-[url('https://api.dicebear.com/7.x/avataaars/svg?seed=Bilal')] bg-cover" />
                  <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-400 bg-[url('https://api.dicebear.com/7.x/avataaars/svg?seed=Maria')] bg-cover" />
                  <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white">+2.8k</div>
                </div>
                <span className="text-[10px] font-medium text-slate-400 bg-white/10 px-2.5 py-0.5 rounded-full">ACTIVE NEARBY</span>
              </div>
            </div>
            
            <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4 pointer-events-none">
              <Users className="h-32 w-32" />
            </div>
          </section>

          {/* Bento Card 4: Safety Shield (col-span-4) */}
          <section className="lg:col-span-4 bg-white dark:bg-gray-950 rounded-3xl border border-slate-200/80 dark:border-gray-800/80 p-6 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all duration-300 text-left">
            <div>
              <span className="inline-flex items-center space-x-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-800 dark:text-emerald-300">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>CNIC & Background Verified</span>
              </span>
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white mt-3">Family & Home Safety Guarantee</h3>
              <p className="text-xs text-slate-600 dark:text-gray-400 mt-1.5 leading-relaxed">
                Every provider on HunarHub undergoes identity check and police record screening before joining our platform.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between text-xs font-medium text-slate-500">
              <span className="text-emerald-700 dark:text-emerald-400">✓ Police Clearance</span>
              <span>•</span>
              <span className="text-slate-700 dark:text-slate-300">Upfront Quotes</span>
            </div>
          </section>

          {/* Bento Card 5: Punctuality Stats (col-span-4) */}
          <section className="lg:col-span-4 bg-emerald-900/90 rounded-3xl p-6 text-white relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="relative z-10 flex flex-col justify-between h-full text-left">
              <div>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-emerald-300">Arrival Reliability</span>
                <p className="font-display text-3xl font-bold mt-1">98.9%</p>
                <p className="text-xs text-emerald-100/90 mt-1">On-Time Arrival Record Across Major Cities</p>
              </div>

              <div className="mt-5 space-y-1 text-xs text-emerald-200">
                <div className="flex justify-between">
                  <span>DHA / Cantt Average</span>
                  <span className="font-semibold text-white">~15 Mins</span>
                </div>
                <div className="flex justify-between">
                  <span>Gulberg / Town Average</span>
                  <span className="font-semibold text-white">~12 Mins</span>
                </div>
              </div>
            </div>
            
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
              <Clock className="h-28 w-28 text-white" />
            </div>
          </section>

        </div>

        {/* BENTO CARD 6: SERVICE CATEGORIES GRID (col-span-12) */}
        <section className="bg-white dark:bg-gray-950 rounded-3xl border border-slate-200/80 dark:border-gray-800/80 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div className="text-left">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Popular Service Categories
              </h3>
              <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                Select a category to view top verified professionals available right now in {selectedCity}.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchFilter('');
                setActivePage('ai-assistant');
              }}
              className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline self-start sm:self-auto"
            >
              Ask AI Assistant →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, idx) => (
              <div
                key={idx}
                onClick={() => handleQuickBook(cat.name)}
                className={`group p-4 rounded-2xl border cursor-pointer transition-all duration-200 hover:shadow-md flex flex-col items-center justify-center text-center ${cat.bg}`}
              >
                <span className="text-2xl block group-hover:scale-105 transition duration-200 mb-2">{cat.icon}</span>
                <h4 className="font-display font-bold text-xs text-slate-900 dark:text-white">{cat.name}</h4>
                <p className="text-[10px] text-slate-500 mt-1 opacity-90">{cat.count}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BENTO CARD 7: RECOMMENDED PROS GRID (col-span-12) */}
        <section className="bg-white dark:bg-gray-950 rounded-3xl border border-slate-200/80 dark:border-gray-800/80 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="text-left">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Top Rated Professionals Nearby
              </h3>
              <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">
                Verified specialists with proven track records and high customer ratings in {selectedCity}.
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setSearchFilter('');
                  setActivePage('recommendations');
                }} 
                className="px-3.5 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-full text-xs font-semibold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 transition"
              >
                View All Experts
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recommendedPros.map((p) => (
              <div 
                key={p.id}
                className="rounded-2xl border border-slate-200/60 dark:border-gray-800 bg-slate-50/50 dark:bg-gray-900/40 p-4 flex gap-4 text-left hover:border-slate-300 dark:hover:border-gray-700 hover:bg-white dark:hover:bg-gray-900 transition-all duration-200 shadow-2xs"
              >
                <div className="relative shrink-0">
                  <img src={p.photo} alt={p.name} referrerPolicy="no-referrer" className="w-14 h-14 rounded-xl object-cover" />
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full h-3.5 w-3.5 border-2 border-white dark:border-gray-900" />
                </div>
                
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 
                        onClick={() => {
                          setSelectedProvider(p);
                          setActivePage('provider-profile');
                        }}
                        className="font-bold text-xs text-slate-900 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-400 cursor-pointer truncate"
                      >
                        {p.name}
                      </h4>
                      <span className="text-[11px] font-semibold text-amber-600 shrink-0">★ {p.rating}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-gray-400 truncate">{p.category} • {p.experienceYears} yrs exp.</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-gray-800">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">Rs. {p.basePrice}</span>
                    <button
                      onClick={() => {
                        setSelectedProvider(p);
                        setActivePage('booking-confirmation');
                        toast(`Selected ${p.name} for direct booking checkout.`);
                      }}
                      className="h-7 px-3 bg-slate-900 hover:bg-slate-800 text-white dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg text-xs font-semibold transition-all active:scale-95"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BENTO CARD 8: TESTIMONIALS (col-span-12) */}
        <section className="bg-white dark:bg-gray-950 rounded-3xl border border-slate-200 dark:border-gray-800/80 p-6 sm:p-8 shadow-sm">
          <h3 className="font-display font-extrabold text-base text-gray-900 dark:text-white mb-6 text-left">
            Trusted by Pakistan's Modern Households
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockReviews.map((rev) => (
              <div 
                key={rev.id} 
                className="rounded-2xl border border-slate-100 dark:border-gray-850 bg-slate-50/20 dark:bg-gray-900/20 p-5 text-left"
              >
                <div className="flex items-center space-x-3 mb-3 text-left">
                  <img src={rev.authorAvatar} alt={rev.authorName} referrerPolicy="no-referrer" className="h-9 w-9 rounded-full object-cover border border-slate-200 dark:border-gray-850" />
                  <div>
                    <h4 className="font-bold text-xs text-gray-800 dark:text-white">{rev.authorName}</h4>
                    <p className="text-[9px] text-gray-400">{rev.date}</p>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <StarRating rating={rev.rating} size="sm" />
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-300 italic leading-relaxed text-left">
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

// ==========================================
// 2. AI BOOKING ASSISTANT PAGE (ChatGPT style)
// ==========================================
export function AIBookingAssistantPage({ setActivePage, toast, setSearchFilter, setAiExtractedIntent }: PageProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: 'Assalam-o-Alaikum! I am your HunarHub AI Agent. Describe your home maintenance issue or salon needs in plain English or Urdu/Roman Urdu. I will analyze your words, draft the exact service specifications, estimate pricing, and recommend verified nearby providers.',
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentReasoning, setCurrentReasoning] = useState<any | null>(null);

  const prompts = [
    { text: 'My UPS is beep-tripping when electricity cuts off.', label: '⚡ UPS Checkup' },
    { text: 'AC thanda nahi kar raha, pressure wash servicing chahiye.', label: '❄️ AC Repair' },
    { text: 'Kitchen pipe leakage is flooding the tiled floor.', label: '🚰 Pipe Repair' },
    { text: 'Need home-service hydra facial and styling for next Friday.', label: '💄 Beauty Spa' },
    { text: 'Need experienced O-Level Math home tutor in DHA.', label: '📚 Math Tutor' },
    { text: 'Looking for verified driver for intercity road trip.', label: '🚗 Chauffeur' }
  ];

  const handleVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        toast('🎙️ Voice listening active... Speak into microphone!');
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputText(transcript);
          toast(`Voice captured: "${transcript}"`);
        };
        recognition.onerror = () => {
          const sample = 'AC compressor is making loud noise and not cooling';
          setInputText(sample);
          toast(`Voice captured: "${sample}"`);
        };
        recognition.start();
      } catch (e) {
        const sample = 'AC compressor is making loud noise and not cooling';
        setInputText(sample);
        toast(`Voice captured: "${sample}"`);
      }
    } else {
      const sample = 'Urgent plumber required for bathroom leakage in DHA Phase 5';
      setInputText(sample);
      toast(`Voice captured: "${sample}"`);
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error('API Response not ok');
      }

      const result = await response.json();
      const detectedService = result.serviceType;
      const confidenceScore = result.confidence;
      const urgLevel = result.urgency;
      const prio = result.priority;
      const reasoningSteps = result.reasoning;

      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        sender: 'assistant',
        text: `I have successfully parsed your problem request. I identified your required service category as **${detectedService}** (Confidence Score: ${confidenceScore}%). \n\nI have structured a customized technical brief for the technicians. Would you like me to recommend the best certified candidates in your neighborhood?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        reasoning: {
          steps: reasoningSteps,
          confidence: confidenceScore,
          intent: {
            service: detectedService,
            urgency: urgLevel,
            priority: prio
          }
        }
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setCurrentReasoning(assistantMsg.reasoning);
      setIsTyping(false);
      setSearchFilter(detectedService);
      setAiExtractedIntent(assistantMsg.reasoning);
      toast(`AI successfully extracted intent: ${detectedService}`);
    } catch (err) {
      console.warn("Express /api/chat call failed, using rule-based backup...", err);
      // Heuristic fallback
      setTimeout(() => {
        let detectedService = 'Electrician';
        let confidenceScore = 96;
        let urgLevel: 'Low' | 'Medium' | 'High' = 'Medium';
        let prio: 'Fastest' | 'Cheapest' | 'Best Rated' | 'Balanced' = 'Balanced';
        let reasoningSteps = [
          'Lexical tokenizer loaded in Roman-Urdu and English dataset packages.',
          'Extracted semantic entities: "AC", "UPS", "leakage" matching diagnostic databases.',
          'Analyzing spatial grid coordinates in Karachi / Lahore DHA sectors.',
          'Determining regional material inflation parameters for correct PKR estimate.'
        ];

        const lowerText = text.toLowerCase();
        if (lowerText.includes('ac') || lowerText.includes('cooling') || lowerText.includes('thanda')) {
          detectedService = 'AC Technician';
          urgLevel = 'High';
          prio = 'Fastest';
          confidenceScore = 98;
          reasoningSteps = [
            'Entity "AC / cooling" extracted.',
            'Detected high ambient temperature constraints (+42°C current regional log).',
            'Urgency elevated to High (AC required in regional season).',
            'Cross-referencing active certified HVAC technicians within 3.5km radial grid.'
          ];
        } else if (lowerText.includes('leak') || lowerText.includes('pipe') || lowerText.includes('plumb') || lowerText.includes('leakage')) {
          detectedService = 'Plumber';
          urgLevel = 'High';
          prio = 'Fastest';
          confidenceScore = 97;
          reasoningSteps = [
            'Entity "flooding/leakage" implies fluid pressure failures.',
            'Determined high risk of permanent wood/flooring degradation.',
            'Piping diagnostic: PPR replacement tools required.',
            'Filtering WASA-licensed plumbing candidates within a 15-minute response ring.'
          ];
        } else if (lowerText.includes('makeup') || lowerText.includes('facial') || lowerText.includes('beauty') || lowerText.includes('threading')) {
          detectedService = 'Beautician';
          urgLevel = 'Low';
          prio = 'Best Rated';
          confidenceScore = 95;
          reasoningSteps = [
            'Aesthetics query extracted for home-beauty-salon services.',
            'High hygiene priority flagged; filtering providers carrying certified sterilization boxes.',
            'Cross-matching candidates holding international cosmetics certificates.'
          ];
        } else if (lowerText.includes('tutor') || lowerText.includes('math') || lowerText.includes('physics') || lowerText.includes('class')) {
          detectedService = 'Tutor';
          urgLevel = 'Medium';
          prio = 'Balanced';
          confidenceScore = 94;
          reasoningSteps = [
            'STEM education pedagogy keywords flagged.',
            'Cross-referencing university graduates with active police clearance logs.',
            'Matching schedule availabilities for home-sessions.'
          ];
        } else if (lowerText.includes('driver') || lowerText.includes('car') || lowerText.includes('gaari')) {
          detectedService = 'Driver';
          urgLevel = 'Medium';
          prio = 'Balanced';
          confidenceScore = 93;
          reasoningSteps = [
            'Defensive driving protocols flagged.',
            'Validating candidates with pristine intercity motorway records.',
            'Verifying manual/auto transmission compatibility.'
          ];
        }

        const assistantMsg: ChatMessage = {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: `I have successfully parsed your problem request. I identified your required service category as **${detectedService}** (Confidence Score: ${confidenceScore}%). \n\nI have structured a customized technical brief for the technicians. Would you like me to recommend the best certified candidates in your neighborhood?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          reasoning: {
            steps: reasoningSteps,
            confidence: confidenceScore,
            intent: {
              service: detectedService,
              urgency: urgLevel,
              priority: prio
            }
          }
        };

        setMessages((prev) => [...prev, assistantMsg]);
        setCurrentReasoning(assistantMsg.reasoning);
        setIsTyping(false);
        setSearchFilter(detectedService);
        setAiExtractedIntent(assistantMsg.reasoning);
        toast(`AI successfully extracted intent: ${detectedService}`);
      }, 1500);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Chat window column */}
        <div className="lg:col-span-8 border border-gray-100 rounded-2xl bg-white p-4 sm:p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950 flex flex-col h-[calc(100vh-160px)] min-h-[540px] max-h-[750px]">
          {/* Chat header */}
          <div className="flex items-center justify-between border-b border-gray-50 pb-3 dark:border-gray-800">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white font-display">
                <Sparkles className="h-5 w-5 animate-pulse text-teal-300" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white">HunarHub AI Agentic Assistant</h3>
                <span className="text-[10px] text-green-500 font-bold tracking-wider uppercase flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1.5 animate-ping" />
                  Multi-Lingual Model Active
                </span>
              </div>
            </div>
            <span className="rounded-full bg-gray-50 px-3 py-1 text-[11px] font-semibold text-gray-500 dark:bg-gray-800 dark:text-gray-300">
              Urdu / English / Roman Urdu
            </span>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                }`}
              >
                <div
                  className={`rounded-2xl p-4 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-none'
                      : 'bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 rounded-tl-none border border-gray-100 dark:border-gray-800'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
                <span className="text-[9px] text-gray-400 mt-1 font-mono">{msg.timestamp}</span>

                {/* Inline reasoning trigger */}
                {msg.reasoning && (
                  <div className="mt-2.5 w-full">
                    <button
                      onClick={() => {
                        setCurrentReasoning(msg.reasoning);
                        setActivePage('recommendations');
                        toast(`Pre-filtering results by: ${msg.reasoning?.intent.service}`);
                      }}
                      className="flex items-center justify-between w-full rounded-xl border border-blue-100 bg-blue-50/40 p-3 hover:bg-blue-50/80 transition text-xs dark:border-blue-950/40 dark:bg-gray-900"
                    >
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-blue-500 font-bold">AI Recommendation Ready</span>
                        <p className="font-bold text-gray-800 dark:text-gray-200 mt-0.5">Filter {msg.reasoning.intent.service} Lists</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-blue-500" />
                    </button>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center space-x-2 mr-auto max-w-[80%] bg-gray-50 p-3.5 rounded-2xl rounded-tl-none dark:bg-gray-900">
                <span className="text-xs text-gray-400">AI reasoning in progress</span>
                <span className="flex space-x-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce delay-100" />
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce delay-200" />
                </span>
              </div>
            )}
          </div>

          {/* Message Input bar and Suggested Prompts */}
          <div className="border-t border-gray-100 dark:border-gray-800 pt-3 space-y-3">
            <div className="flex items-center space-x-2 bg-gray-50 rounded-xl px-3 py-1 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition">
              <button
                type="button"
                onClick={handleVoiceInput}
                className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition shrink-0"
                title="Voice Input"
              >
                <Mic className="h-4.5 w-4.5" />
              </button>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
                placeholder="Describe your request in Urdu or English (e.g. AC gas leak, pipe repair)..."
                className="w-full bg-transparent py-2 text-xs focus:outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 font-medium"
              />
              <button
                type="button"
                onClick={() => handleSend(inputText)}
                className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 transition active:scale-95 shrink-0"
                title="Send Request"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Suggested Prompts BELOW the text box */}
            <div>
              <div className="flex items-center justify-between mb-2 px-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-blue-500" />
                  Suggested Prompts
                </span>
                <span className="text-[10px] text-gray-400 hidden sm:inline">Click any prompt to ask AI agent</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {prompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(p.text)}
                    className="group rounded-xl border border-gray-100 bg-gray-50/80 p-2 text-left hover:border-blue-400 hover:bg-blue-50/50 dark:border-gray-800/80 dark:bg-gray-900 dark:hover:border-blue-800 dark:hover:bg-blue-950/30 transition shadow-2xs"
                  >
                    <span className="font-bold text-blue-600 dark:text-blue-400 block text-[10px] group-hover:underline">
                      {p.label}
                    </span>
                    <span className="text-[11px] text-gray-600 dark:text-gray-300 truncate block mt-0.5 leading-tight">
                      "{p.text}"
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI reasoning log column */}
        <div className="lg:col-span-4 space-y-4">
          {currentReasoning ? (
            <AIReasoningCard
              service={currentReasoning.intent.service}
              urgency={currentReasoning.intent.urgency}
              priority={currentReasoning.intent.priority}
              confidence={currentReasoning.confidence}
              steps={currentReasoning.steps}
            />
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-6 text-center dark:border-gray-800 dark:bg-gray-950">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-400 mx-auto dark:bg-gray-900">
                <Info className="h-6 w-6" />
              </div>
              <h4 className="font-display font-bold text-sm text-gray-800 dark:text-white mt-3">Heuristics Off</h4>
              <p className="text-xs text-gray-400 mt-1">Describe your query in the chat prompt first to unlock real-time agent tracking logs and NADRA spatial check traces.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. PROVIDER RECOMMENDATION PAGE
// ==========================================
export function ProviderRecommendationPage({ setActivePage, toast, setSelectedProvider, searchFilter, setSearchFilter, selectedProvider }: PageProps) {
  const [activeTab, setActiveTab] = useState<'fastest' | 'cheapest' | 'best' | 'balanced'>('balanced');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [distanceFilter, setDistanceFilter] = useState<number>(5);
  const [matchingReason, setMatchingReason] = useState<string>('');

  useEffect(() => {
    const fetchMatchingReason = async () => {
      try {
        const res = await fetch('/api/match-providers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            serviceType: searchFilter || 'Electrician',
            priority: activeTab
          })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.explanations) {
            if (activeTab === 'fastest') setMatchingReason(data.explanations.fastestReason);
            else if (activeTab === 'cheapest') setMatchingReason(data.explanations.cheapestReason);
            else if (activeTab === 'best') setMatchingReason(data.explanations.bestRatedReason);
            else setMatchingReason(data.explanations.balancedReason);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch matching explanations from server", err);
      }
    };
    fetchMatchingReason();
  }, [searchFilter, activeTab]);

  const handleBook = (provider: Provider) => {
    setSelectedProvider(provider);
    setActivePage('booking-confirmation');
    toast(`Initiating Booking Workflow for: ${provider.name}`);
  };

  const handleViewProfile = (provider: Provider) => {
    setSelectedProvider(provider);
    setActivePage('provider-profile');
    toast(`Opening profile of ${provider.name}`);
  };

  // Filter & Sort Logic
  const filteredProviders = mockProviders
    .filter((p) => {
      // Search term filtering
      if (searchFilter) {
        return p.category.toLowerCase().includes(searchFilter.toLowerCase()) || p.name.toLowerCase().includes(searchFilter.toLowerCase());
      }
      return true;
    })
    .filter((p) => {
      // Rating filtering
      if (ratingFilter) return p.rating >= ratingFilter;
      return true;
    })
    .filter((p) => {
      // Distance filtering
      return p.distanceKm <= distanceFilter;
    })
    .sort((a, b) => {
      if (activeTab === 'fastest') return a.etaMinutes - b.etaMinutes;
      if (activeTab === 'cheapest') return a.basePrice - b.basePrice;
      if (activeTab === 'best') return b.rating - a.rating;
      // balanced default
      return b.reliabilityScore - a.reliabilityScore;
    });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Top filter dashboard panel */}
      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-gray-800 dark:bg-gray-950/40 backdrop-blur-md space-y-3">
        {/* Category Pills Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-gray-400 shrink-0 mr-1">Categories:</span>
          {['All', 'Electrician', 'AC Technician', 'Plumber', 'Beautician', 'Tutor', 'Driver', 'Carpenter', 'Solar Specialist'].map((cat) => {
            const isSelected = cat === 'All' ? !searchFilter : searchFilter.toLowerCase().includes(cat.toLowerCase());
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  if (cat === 'All') {
                    setSearchFilter('');
                  } else {
                    setSearchFilter(cat);
                  }
                }}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold shrink-0 transition ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm dark:bg-emerald-600'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-2 border-t border-slate-200/60 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search filter input */}
            <div className="relative bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl px-3 py-1.5 flex items-center w-full sm:w-64 shadow-2xs">
              <Search className="h-4 w-4 text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search name, category, skill..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-transparent text-xs focus:outline-none text-slate-900 dark:text-white"
              />
              {searchFilter && (
                <button
                  onClick={() => setSearchFilter('')}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold ml-1 px-1"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Distance slider filter */}
            <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-xl px-3 py-1.5 flex items-center justify-between w-full sm:w-56 text-xs text-slate-600 dark:text-gray-300 shadow-2xs">
              <span>Radius: <b className="text-slate-900 dark:text-white">{distanceFilter} km</b></span>
              <input
                type="range"
                min="1"
                max="10"
                value={distanceFilter}
                onChange={(e) => setDistanceFilter(parseInt(e.target.value))}
                className="w-24 accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Quick rating toggles & reset */}
          <div className="flex items-center space-x-2 overflow-x-auto py-1">
            <span className="text-[11px] text-slate-500 font-semibold uppercase mr-1">Rating:</span>
            {[null, 4.8, 4.9].map((star, idx) => (
              <button
                key={idx}
                onClick={() => setRatingFilter(star)}
                className={`rounded-xl px-3 py-1 text-xs font-semibold shrink-0 transition ${
                  ratingFilter === star
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300'
                }`}
              >
                {star === null ? 'All Ratings' : `${star}+ ⭐`}
              </button>
            ))}

            {(searchFilter || ratingFilter !== null || distanceFilter < 10) && (
              <button
                onClick={() => {
                  setSearchFilter('');
                  setRatingFilter(null);
                  setDistanceFilter(10);
                  toast('Filters reset to default');
                }}
                className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline px-2 py-1 shrink-0"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {matchingReason && (
        <div className="mt-4 rounded-2xl border border-teal-100 bg-teal-50/25 p-4 dark:border-teal-950/20 dark:bg-teal-950/10 flex items-start space-x-3 animate-fade-in">
          <Sparkles className="h-5 w-5 text-teal-500 shrink-0 mt-0.5" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">Agentic Matching Explanation (Observe → Reason → Decide)</span>
            <p className="text-xs text-gray-700 dark:text-gray-300 mt-1 leading-relaxed">
              {matchingReason}
            </p>
          </div>
        </div>
      )}

      {/* Recommended Tabs bar */}
      <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-3.5 dark:border-gray-800 gap-4">
        <div>
          <span className="inline-flex items-center space-x-1.5 rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold text-teal-700 dark:bg-teal-950/40 dark:text-teal-400 mb-1.5">
            <Check className="h-3 w-3" />
            <span>Agent-Optimized Recommendations</span>
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
            Recommended Verified Providers
          </h2>
        </div>

        {/* Recommendation sorting tabs */}
        <div className="flex items-center space-x-1 bg-gray-50 p-1 rounded-xl dark:bg-gray-950">
          {(['fastest', 'cheapest', 'best', 'balanced'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                toast(`Sorted by: ${tab}`);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                activeTab === tab
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-900 dark:text-white'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Cards list or Empty State */}
      {filteredProviders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 animate-fade-in">
          {filteredProviders.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              onBook={handleBook}
              onViewProfile={handleViewProfile}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-200 p-12 text-center mt-8 dark:border-gray-800 bg-slate-50/50 dark:bg-gray-900/30">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 dark:bg-gray-800 shadow-2xs">
            <Info className="h-6 w-6 text-slate-400" />
          </div>
          <h3 className="font-display font-bold text-base text-slate-800 dark:text-white mt-4">No Matching Professionals</h3>
          <p className="text-xs text-slate-500 dark:text-gray-400 max-w-sm mx-auto mt-1.5 leading-relaxed">
            No verified technicians match your current filters. Try expanding your search radius or selecting a different category.
          </p>
          <button
            onClick={() => {
              setSearchFilter('');
              setRatingFilter(null);
              setDistanceFilter(10);
              toast('Resetting filter criteria...');
            }}
            className="mt-5 inline-flex items-center space-x-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition dark:bg-emerald-600 dark:hover:bg-emerald-500 shadow-2xs"
          >
            <span>Reset All Filters</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. PROVIDER PROFILE PAGE
// ==========================================
export function ProviderProfilePage({ setActivePage, toast, selectedProvider }: PageProps) {
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  if (!selectedProvider) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h3 className="font-display text-lg font-bold">No Provider Selected</h3>
        <p className="text-xs text-gray-400 mt-1">Please go to recommendations list and select a technician profile.</p>
        <button onClick={() => setActivePage('recommendations')} className="mt-4 rounded-xl bg-blue-600 text-white px-4 py-2 text-xs font-semibold">
          View Recommendations
        </button>
      </div>
    );
  }

  const handleConfirmBook = () => {
    if (!selectedSlot) {
      toast('Please choose an available scheduling slot first.');
      return;
    }
    setActivePage('booking-confirmation');
    toast(`Scheduled appointment at: ${selectedSlot}`);
  };

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Cover Banner */}
      <div className="relative h-48 sm:h-64 bg-gradient-to-r from-blue-700 to-teal-500">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-4 left-4">
          <button
            onClick={() => setActivePage('recommendations')}
            className="rounded-xl bg-white/20 backdrop-blur-md border border-white/10 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-white/30 transition"
          >
            ← Back to Recommendations
          </button>
        </div>
      </div>

      {/* Main Profile Grid */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left bio details column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedProvider.photo}
                    alt={selectedProvider.name}
                    referrerPolicy="no-referrer"
                    className="h-20 w-20 rounded-2xl object-cover border-4 border-white shadow-md dark:border-gray-900"
                  />
                  <div>
                    <h1 className="font-display text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                      {selectedProvider.name}
                    </h1>
                    <p className="text-xs text-gray-400 mt-0.5">{selectedProvider.category} Expert • {selectedProvider.experienceYears} Years Exp</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="flex items-center space-x-1 text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full dark:bg-teal-950/40">
                    <ShieldCheck className="h-4 w-4" />
                    <span>NADRA Certified</span>
                  </span>
                </div>
              </div>

              {/* Bio description */}
              <div className="mt-6 border-t border-gray-50 pt-4 dark:border-gray-800">
                <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white">About Me</h3>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{selectedProvider.bio}</p>
              </div>

              {/* Technical skills */}
              <div className="mt-5">
                <h3 className="font-display font-bold text-xs text-gray-400 uppercase tracking-wider">Expertise Badges</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedProvider.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs font-medium text-gray-700 bg-gray-50 px-3 py-1 rounded-xl dark:bg-gray-900 dark:text-gray-300 border border-gray-100 dark:border-gray-850"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications and credentials */}
              <div className="mt-6 border-t border-gray-50 pt-4 dark:border-gray-800">
                <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white flex items-center space-x-1.5">
                  <Award className="h-4.5 w-4.5 text-blue-500" />
                  <span>Licensed Credentials</span>
                </h3>
                <div className="mt-3 space-y-2">
                  {selectedProvider.certifications.map((cert, index) => (
                    <div key={index} className="flex items-start space-x-2 text-xs">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                      <p className="text-gray-600 dark:text-gray-400 font-medium">{cert}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Portfolio gallery */}
              <div className="mt-6 border-t border-gray-50 pt-4 dark:border-gray-800">
                <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white">Recent Portfolio Jobs</h3>
                <div className="grid grid-cols-2 gap-4 mt-3">
                  {selectedProvider.portfolioImgs.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="Job detail"
                      referrerPolicy="no-referrer"
                      className="rounded-xl h-36 w-full object-cover border border-gray-100 hover:opacity-90 transition dark:border-gray-800"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Provider Reviews */}
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-950">
              <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white">Customer Reviews</h3>
              <div className="mt-4 space-y-4">
                {mockReviews.map((rev) => (
                  <div key={rev.id} className="border-b border-gray-50 pb-4 last:border-b-0 last:pb-0 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2.5">
                        <img src={rev.authorAvatar} alt={rev.authorName} referrerPolicy="no-referrer" className="h-8 w-8 rounded-full object-cover" />
                        <div>
                          <h4 className="font-bold text-xs text-gray-800 dark:text-white">{rev.authorName}</h4>
                          <span className="text-[10px] text-gray-400">{rev.date}</span>
                        </div>
                      </div>
                      <StarRating rating={rev.rating} size="sm" />
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar schedular column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md dark:border-gray-800 dark:bg-gray-950 sticky top-20">
              <span className="text-[9px] uppercase tracking-wider text-gray-400 font-mono block">Estimated Fee</span>
              <p className="font-display font-extrabold text-2xl text-gray-900 dark:text-white mt-1">
                Rs. {selectedProvider.basePrice}
                <span className="text-xs font-medium text-gray-400">/{selectedProvider.category === 'Tutor' || selectedProvider.category === 'Electrician' || selectedProvider.category === 'Plumber' || selectedProvider.category === 'Driver' ? 'hr' : 'job'}</span>
              </p>

              {/* Availability Calendar Selector */}
              <div className="mt-5 border-t border-gray-50 pt-4 dark:border-gray-800">
                <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Select Availability Slot</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedProvider.availableTimeSlots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      className={`rounded-xl border py-2.5 text-center text-xs font-bold transition ${
                        selectedSlot === slot
                          ? 'bg-blue-600 border-blue-600 text-white shadow'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-850 dark:text-gray-300'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Performance indexes */}
              <div className="mt-5 space-y-2 border-t border-gray-50 pt-4 dark:border-gray-800 text-xs text-gray-500 font-mono">
                <div className="flex justify-between">
                  <span>Reliability Index</span>
                  <span className="font-bold text-blue-600">{selectedProvider.reliabilityScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Response Time</span>
                  <span className="font-bold text-gray-800 dark:text-gray-200">{selectedProvider.responseTimeMinutes} mins</span>
                </div>
                <div className="flex justify-between">
                  <span>Cancellation Rate</span>
                  <span className="font-bold text-red-500">{selectedProvider.cancellationRate}%</span>
                </div>
              </div>

              <button
                onClick={handleConfirmBook}
                className="w-full mt-5 rounded-xl bg-blue-600 py-3.5 text-xs font-bold text-white shadow hover:bg-blue-700 active:scale-98 transition"
              >
                Proceed to Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
