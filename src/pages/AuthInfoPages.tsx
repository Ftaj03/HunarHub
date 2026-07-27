import React, { useState } from 'react';
import {
  Lock,
  Mail,
  User,
  MapPin,
  CheckCircle,
  FileText,
  Phone,
  HelpCircle,
  Search,
  Bell,
  Sliders,
  Send,
  ExternalLink,
  ChevronDown,
  Sparkles,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { Page, AppNotification, AuthUser } from '../types';
import { mockNotifications, mockFAQs } from '../data';
import { loginWithGoogle } from '../lib/firebase';

interface AuthInfoProps {
  setActivePage: (page: Page) => void;
  toast: (msg: string) => void;
  notifications: AppNotification[];
  setNotifications: React.Dispatch<React.SetStateAction<AppNotification[]>>;
  currentUser?: AuthUser | null;
  setCurrentUser?: (user: AuthUser | null) => void;
}

// ==========================================
// 12. LOGIN PAGE (Split Layout)
// ==========================================
export function LoginPage({ setActivePage, toast, setCurrentUser }: AuthInfoProps) {
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');

  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const user = await loginWithGoogle();
      const authUser: AuthUser = {
        displayName: user.displayName || user.email?.split('@')[0] || 'User',
        email: user.email || undefined,
        photoURL: user.photoURL || undefined,
        uid: user.uid,
      };
      if (setCurrentUser) setCurrentUser(authUser);
      toast(`Signed in as ${authUser.displayName}`);
      setActivePage('user-dashboard');
    } catch (err: any) {
      toast(`Google Sign-In failed: ${err?.message || 'Unknown error'}`);
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      toast('Please input a valid mobile number.');
      return;
    }
    setOtpSent(true);
    toast(`OTP successfully dispatched to +92 ${phone}`);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode === '1234' || otpCode.length === 4) {
      const authUser: AuthUser = {
        displayName: userName.trim() || 'Fahad Taj',
        email: `${phone ? phone : 'user'}@hunarhub.pk`,
      };
      if (setCurrentUser) setCurrentUser(authUser);
      setActivePage('user-dashboard');
      toast(`Login Authorized! Welcome ${authUser.displayName}`);
    } else {
      toast('Authentication Failed. Try OTP "1234" to test sandbox login.');
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[60vh]">
        {/* Left column visual branding */}
        <div className="lg:col-span-6 space-y-6 text-left hidden lg:block bg-gradient-to-br from-blue-600 to-teal-500 p-12 rounded-3xl text-white">
          <span className="inline-flex items-center space-x-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
            <Sparkles className="h-4 w-4 text-teal-300" />
            <span>Secured HunarHub Gateways</span>
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            Pakistan's First AI-Agentic Local Household Marketplace
          </h2>
          <p className="text-sm text-blue-100 max-w-sm leading-relaxed">
            Punctual domestic repairs, tutoring, beauty pampering and certified drivers under a unified safety-first Nadra check umbrella.
          </p>
          <div className="border-t border-white/15 pt-6 text-xs text-blue-200 font-mono">
            Support: support@hunarhub.pk • Helpline: +92-300-1234567
          </div>
        </div>

        {/* Right column Form card */}
        <div className="lg:col-span-6 w-full max-w-md mx-auto">
          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-950">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">Welcome Back</h3>
                <p className="text-xs text-gray-400 mt-0.5">Authenticate using secure SMS OTP code gateways.</p>
              </div>
              <button
                type="button"
                onClick={() => setActivePage('registration')}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Sign Up
              </button>
            </div>

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="mt-4 space-y-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Full Name (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Fahad Taj"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full mt-1 rounded-xl border border-gray-200 px-3.5 py-2.5 text-xs focus:outline-none dark:border-gray-800 dark:bg-gray-900 text-gray-800 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Mobile Phone Number</label>
                  <div className="mt-1 flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 dark:bg-gray-900 dark:border-gray-800">
                    <span className="text-xs text-gray-400 mr-2 font-bold font-mono">+92</span>
                    <input
                      type="tel"
                      required
                      placeholder="3001234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-transparent text-xs text-gray-800 dark:text-white focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition"
                >
                  Send OTP Verification Code
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="mt-4 space-y-4 animate-fade-in">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Enter 4-Digit OTP Code</label>
                  <div className="mt-1 flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 dark:bg-gray-900 dark:border-gray-800">
                    <Lock className="h-4 w-4 text-gray-400 mr-2" />
                    <input
                      type="text"
                      required
                      maxLength={4}
                      placeholder="1234"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full bg-transparent text-xs text-gray-800 dark:text-white focus:outline-none text-center font-bold tracking-widest font-mono"
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 block mt-1.5 text-center">Test Sandbox Key: Input <b>1234</b> to bypass check.</span>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition"
                >
                  Verify & Log In
                </button>
              </form>
            )}

            {/* Google Authentication Option */}
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-gray-800">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="w-full flex items-center justify-center space-x-2 rounded-xl border border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-2.5 px-4 text-xs font-semibold text-slate-700 dark:text-gray-200 shadow-2xs hover:bg-slate-50 dark:hover:bg-gray-800 transition disabled:opacity-50"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{googleLoading ? 'Connecting...' : 'Continue with Google Account'}</span>
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-50 text-center dark:border-gray-800 flex items-center justify-between">
              <span className="text-xs text-gray-400">New to HunarHub?</span>
              <button onClick={() => setActivePage('registration')} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                Create Free Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 13. REGISTRATION PAGE (Multi-Step Form)
// ==========================================
export function RegistrationPage({ setActivePage, toast, setCurrentUser }: AuthInfoProps) {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<'customer' | 'provider'>('customer');
  const [name, setName] = useState('');
  const [cnic, setCnic] = useState('');

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      const newUser: AuthUser = {
        displayName: name || 'Fahad Taj',
        email: 'user@hunarhub.pk',
      };
      if (setCurrentUser) setCurrentUser(newUser);
      setActivePage('user-dashboard');
      toast(`Account created! Welcome ${newUser.displayName}`);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-8 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-200 animate-fade-in">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-950">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white">Create Account</h2>
            <p className="text-xs text-gray-400">Join HunarHub services platform</p>
          </div>
          <button
            type="button"
            onClick={() => setActivePage('login')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Already have an account? Log in
          </button>
        </div>

        {/* Step indicator bar */}
        <div className="flex justify-between items-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center space-x-2">
              <span
                className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  step === s
                    ? 'bg-blue-600 text-white'
                    : step > s
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-400 dark:bg-gray-800'
                }`}
              >
                {s}
              </span>
              <span className={`text-[11px] font-semibold ${step === s ? 'text-blue-600 font-bold' : 'text-gray-400'}`}>
                {s === 1 ? 'Personal' : s === 2 ? 'Credentials' : 'Finish'}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={handleNextStep} className="space-y-5">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-display text-base font-bold text-gray-900 dark:text-white">Choose Account Role</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('customer')}
                  className={`rounded-xl border p-4 text-left transition ${
                    role === 'customer'
                      ? 'border-2 border-blue-500 bg-blue-50/20'
                      : 'border-gray-150'
                  }`}
                >
                  <User className="h-5 w-5 text-blue-500" />
                  <h4 className="font-bold text-xs mt-2 text-gray-800 dark:text-white">I Need Services</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Book domestic certified experts with AI companion.</p>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('provider')}
                  className={`rounded-xl border p-4 text-left transition ${
                    role === 'provider'
                      ? 'border-2 border-blue-500 bg-blue-50/20'
                      : 'border-gray-150'
                  }`}
                >
                  <Sliders className="h-5 w-5 text-teal-500" />
                  <h4 className="font-bold text-xs mt-2 text-gray-800 dark:text-white">I Offer Services</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5">Become verified technician partner and earn cash.</p>
                </button>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Fahad Taj"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1.5 rounded-xl border border-gray-200 px-3.5 py-2 text-xs focus:outline-none dark:border-gray-850 dark:bg-gray-900 text-gray-800 dark:text-white"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-display text-base font-bold text-gray-900 dark:text-white">National Identification Details</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Biometric matching requires valid Pakistani CNIC credentials. We enforce safety-first compliance rules.
              </p>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">CNIC Number (13-Digits)</label>
                <input
                  type="text"
                  required
                  placeholder="35201-1234567-1"
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                  className="w-full mt-1.5 rounded-xl border border-gray-200 px-3.5 py-2 text-xs focus:outline-none dark:border-gray-850 dark:bg-gray-900 text-gray-850 dark:text-white font-mono"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 text-center animate-fade-in">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              <h3 className="font-display text-base font-bold text-gray-900 dark:text-white">Biometrics Syncing Ready</h3>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
                By completing check, you authorize HunarHub security frameworks to cross-reference biometric credentials with NADRA national database rosters.
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-gray-50 dark:border-gray-800">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="flex-1 rounded-xl border border-gray-200 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50"
              >
                Back
              </button>
            )}
            <button
              type="submit"
              className="flex-1 rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition"
            >
              {step === 3 ? 'Sync CNIC & Finish' : 'Next Step'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ==========================================
// 14. ABOUT PAGE
// ==========================================
export function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Our Story & Mission
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
          At HunarHub, our vision is simple: To empower trusted blue-collar professionals in Pakistan through modern, biometric-cleared agentic machine systems. We elevate safety while providing seamless home repairs at fair dynamic market pricing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 items-center">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=80"
          alt="Technical check"
          referrerPolicy="no-referrer"
          className="rounded-3xl h-64 w-full object-cover shadow-sm"
        />
        <div className="space-y-4 text-left">
          <h3 className="font-display font-bold text-lg text-gray-900 dark:text-white">Evolving Domestic Convenience</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Finding certified AC mechanics or trustworthy personal drivers has historically been chaotic in major hubs like Lahore, Karachi, and Islamabad. By establishing verified local service rings combined with an intelligent Urdu-fluent AI assistant, we bridge gaps for local households securely.
          </p>
          <div className="space-y-2 text-xs font-mono text-gray-400">
            <p>✓ WASA-licensed Sanitary Partners</p>
            <p>✓ CIBTAC certified home aesthetic therapists</p>
            <p>✓ Elite security & defensive protocol qualified drivers</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 15. CONTACT PAGE
// ==========================================
export function ContactPage({ toast }: { toast: (msg: string) => void }) {
  const [formName, setFormName] = useState('');
  const [formText, setFormText] = useState('');

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setFormName('');
    setFormText('');
    toast('Assalamu Alaikum. Message successfully filed! Helpdesks will respond via registered email within 24 hours.');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-7 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-950">
          <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white mb-4">Contact Customer Care</h2>
          <form onSubmit={handleSubmitContact} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Full Name</label>
              <input
                type="text"
                required
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Fahad Taj"
                className="w-full mt-1.5 rounded-xl border border-gray-200 px-3.5 py-2 text-xs focus:outline-none dark:border-gray-850 dark:bg-gray-900 text-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Inquiry details</label>
              <textarea
                required
                rows={5}
                value={formText}
                onChange={(e) => setFormText(e.target.value)}
                placeholder="Describe any issues regarding booking dispatch or portal biometrics..."
                className="w-full mt-1.5 rounded-xl border border-gray-200 p-4 text-xs focus:outline-none dark:border-gray-850 dark:bg-gray-900 text-gray-800 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700 transition"
            >
              Dispatch Inquiry
            </button>
          </form>
        </div>

        {/* Right Contact Cards */}
        <div className="lg:col-span-5 space-y-4 text-left">
          <div className="rounded-2xl bg-gray-50 p-5 dark:bg-gray-950/60 border border-gray-150 dark:border-gray-850">
            <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white mb-3">Headquarters</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              HunarHub Technology Hub,<br />
              Commercial Block Z, DHA Phase 5,<br />
              Lahore, Punjab, Pakistan
            </p>
            <div className="space-y-1 mt-4 text-xs font-mono text-gray-400">
              <p>Email: helpdesk@hunarhub.pk</p>
              <p>Ph: +92 (300) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 16. FAQS PAGE
// ==========================================
export function FAQsPage() {
  const [activeFAQ, setActiveFAQ] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="text-center space-y-3 mb-10">
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">FAQs & Knowledge Center</h1>
        <p className="text-xs text-gray-400 max-w-md mx-auto">Review common support items regarding biometric NADRA check systems and insurance caps.</p>
      </div>

      <div className="space-y-3 max-w-2xl mx-auto">
        {mockFAQs.map((faq, idx) => {
          const isOpen = activeFAQ === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-gray-100 bg-white dark:border-gray-850 dark:bg-gray-950 overflow-hidden"
            >
              <button
                onClick={() => setActiveFAQ(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-4 font-display font-bold text-xs text-left text-gray-800 dark:text-white hover:bg-gray-50/50"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`h-4 w-4 text-gray-400 transform transition ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-xs text-gray-500 leading-relaxed border-t border-gray-50 dark:border-gray-800 pt-3 animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// 17. 404 PAGE (Friendly Not Found)
// ==========================================
export function NotFoundPage({ setActivePage }: { setActivePage: (p: Page) => void }) {
  return (
    <div className="mx-auto max-w-md py-20 px-4 text-center text-left">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 mx-auto dark:bg-blue-950">
        <ShieldAlert className="h-8 w-8 animate-bounce" />
      </div>
      <h1 className="font-display font-extrabold text-4xl text-gray-900 dark:text-white mt-6">404 Error</h1>
      <p className="font-display font-bold text-sm text-gray-800 dark:text-gray-300 mt-2">Dossier / Page Missing</p>
      <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
        The requested URL parameter does not sync with our agentic coordination protocols. Return home to dispatch assistance safely.
      </p>
      <button
        onClick={() => setActivePage('landing')}
        className="mt-6 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 shadow-md"
      >
        Return Home Safely
      </button>
    </div>
  );
}

// ==========================================
// 18. PRIVACY POLICY PAGE
// ==========================================
export function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 text-left">
      <div className="space-y-4 border-b border-gray-100 pb-5 mb-6 dark:border-gray-800">
        <h1 className="font-display text-2xl font-extrabold text-gray-900 dark:text-white flex items-center space-x-2">
          <FileText className="h-6 w-6 text-blue-500" />
          <span>Privacy Policy Shield</span>
        </h1>
        <p className="text-[10px] text-gray-400 font-mono">Last updated: July 20, 2026 • Version 2.0</p>
      </div>

      <div className="space-y-4 text-xs text-gray-500 leading-relaxed">
        <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white">1. Information Governance</h3>
        <p>
          We take household safety seriously. To prevent fraud, our platform coordinates directly with national NADRA APIs for biometric verification. CNIC values collected are transiently processed under extreme AES-256 bit encryption and are never permanently stored in unencrypted memory caches.
        </p>
        <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white">2. Geolocation Coordinates Tracking</h3>
        <p>
          Live technician tracking is coordinates-driven. Tracking datasets are deleted 72 hours after successful job confirmation feedback.
        </p>
      </div>
    </div>
  );
}

// ==========================================
// 19. TERMS & CONDITIONS PAGE
// ==========================================
export function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 text-left">
      <div className="space-y-4 border-b border-gray-100 pb-5 mb-6 dark:border-gray-800">
        <h1 className="font-display text-2xl font-extrabold text-gray-900 dark:text-white flex items-center space-x-2">
          <FileText className="h-6 w-6 text-teal-500" />
          <span>Terms & Conditions Charter</span>
        </h1>
        <p className="text-[10px] text-gray-400 font-mono">Effective: July 20, 2026 • Service Pact</p>
      </div>

      <div className="space-y-4 text-xs text-gray-500 leading-relaxed">
        <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white">1. Service Dispatch Warranties</h3>
        <p>
          HunarHub provides automated agentic scheduling services in Lahore, Karachi, and Islamabad. By completing a dispatch, the customer agrees to provide biometric OTP verification to the certified partner upon actual physical service completion.
        </p>
        <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white">2. HunarHub Damage Protection Policy</h3>
        <p>
          Qualified bookings are insured up to PKR 50,000 against verified technical damages occurring as direct results of partner services. Claims must be filed under our Support form within 48 hours.
        </p>
      </div>
    </div>
  );
}

// ==========================================
// 20. NOTIFICATIONS PAGE
// ==========================================
export function NotificationsPage({ notifications, setNotifications, toast }: AuthInfoProps) {
  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast('All notifications marked as read.');
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast('Notification cleared.');
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4 dark:border-gray-800 mb-6">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">Notifications Alert</h2>
          <p className="text-xs text-gray-400 mt-1">Review system updates, payment clearances, or promotional discounts.</p>
        </div>
        <button
          onClick={handleMarkAllRead}
          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          Mark all as read
        </button>
      </div>

      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`rounded-2xl border p-4 flex items-start justify-between gap-4 transition ${
                n.read
                  ? 'border-gray-100 bg-white dark:border-gray-850 dark:bg-gray-950/20'
                  : 'border-blue-100 bg-blue-50/10 dark:border-blue-900/10'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="mt-0.5 shrink-0">
                  <Bell className={`h-4.5 w-4.5 ${n.read ? 'text-gray-450' : 'text-blue-500 animate-pulse'}`} />
                </div>
                <div>
                  <h4 className={`text-xs font-bold ${n.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white'}`}>
                    {n.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{n.content}</p>
                  <span className="text-[10px] text-gray-400 font-mono mt-1.5 block">{n.timestamp}</span>
                </div>
              </div>
              <button
                onClick={() => handleDeleteNotification(n.id)}
                className="text-[10px] text-gray-400 hover:text-red-500 transition"
              >
                Clear
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-gray-200 rounded-3xl dark:border-gray-800">
          <Bell className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <h3 className="font-display font-bold text-xs text-gray-800 dark:text-white">Alert stream empty</h3>
          <p className="text-[10px] text-gray-400 mt-1">No alert flags are active at the moment.</p>
        </div>
      )}
    </div>
  );
}
