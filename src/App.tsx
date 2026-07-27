import React, { useState, useEffect } from 'react';
import { Sparkles, Sun, Moon, CheckCircle, Bell, User, AlertCircle } from 'lucide-react';
import { Page, UserRole, Booking, AppNotification, Provider, AuthUser } from './types';
import { mockBookingHistory, mockNotifications, mockProviders } from './data';
import { populateDatabase } from './lib/seedDatabase';
import { auth, logoutFirebase } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Navigation & Structure Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageSelector from './components/PageSelector';

// Modular Page Bundles
import {
  LandingPage,
  AIBookingAssistantPage,
  ProviderRecommendationPage,
  ProviderProfilePage,
} from './pages/DiscoveryPages';

import {
  BookingConfirmationPage,
  BookingTrackingPage,
  BookingHistoryPage,
  FeedbackPage,
} from './pages/OperationsPages';

import {
  UserDashboard,
  ProviderDashboard,
  AdminDashboard,
} from './pages/DashboardPages';

import {
  LoginPage,
  RegistrationPage,
  AboutPage,
  ContactPage,
  FAQsPage,
  NotFoundPage,
  PrivacyPolicyPage,
  TermsPage,
  NotificationsPage,
} from './pages/AuthInfoPages';

export default function App() {
  // Navigation Routing States
  const [activePage, setActivePage] = useState<Page>('landing');
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [darkMode, setDarkMode] = useState(false);

  // Core Booking Systems States
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(mockProviders[0]); // Default first electrician
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [pastBookings, setPastBookings] = useState<Booking[]>(mockBookingHistory);
  const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications);

  // Load initial backend database data on mount and keep components reactive
  const refreshBackendData = async () => {
    try {
      const res = await fetch('/api/data');
      if (res.ok) {
        const data = await res.json();
        if (data.providers) {
          setPastBookings(data.pastBookings);
          setNotifications(data.notifications);
          setActiveBooking(data.activeBooking);
          if (data.providers.length > 0 && !selectedProvider) {
            setSelectedProvider(data.providers[0]);
          }
        }
      }
    } catch (err) {
      console.warn("Backend API sync failed, falling back to local mocks.", err);
    }
  };

  useEffect(() => {
    refreshBackendData();
    populateDatabase()
      .then((res) => console.log('Firestore seed status:', res))
      .catch((err) => console.warn('Firestore seeding notice:', err));
  }, []);

  // User Auth State
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  // Sync Firebase Auth user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setCurrentUser({
          displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
          email: fbUser.email || undefined,
          photoURL: fbUser.photoURL || undefined,
          uid: fbUser.uid,
        });
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await logoutFirebase();
    } catch (err) {
      console.warn('Logout notice:', err);
    }
    setCurrentUser(null);
    toast('Logged out successfully');
    setActivePage('landing');
  };
  const [searchFilter, setSearchFilter] = useState('');
  const [aiExtractedIntent, setAiExtractedIntent] = useState<any | null>(null);

  // Toast System
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // Scroll to top upon page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Sync dark mode class on HTML document element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-[#F8FAFC] text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200 flex flex-col font-sans">
        
        {/* Toast Alert overlay */}
        {toastMsg && (
          <div className="fixed top-20 right-6 z-50 animate-slide-in max-w-sm">
            <div className="flex items-center space-x-3 rounded-2xl border border-blue-100 bg-white p-4 shadow-xl dark:border-gray-800 dark:bg-gray-950">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                <Sparkles className="h-4.5 w-4.5 animate-pulse text-teal-400" />
              </div>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-tight">
                {toastMsg}
              </p>
            </div>
          </div>
        )}

        {/* Global Navbar */}
        <Navbar
          activePage={activePage}
          setActivePage={setActivePage}
          userRole={userRole}
          setUserRole={setUserRole}
          unreadNotificationsCount={unreadNotificationsCount}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        {/* Dynamic Page Router Core */}
        <main className="flex-grow">
          {activePage === 'landing' && (
            <LandingPage
              setActivePage={setActivePage}
              toast={toast}
              selectedProvider={selectedProvider}
              setSelectedProvider={setSelectedProvider}
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
              setAiExtractedIntent={setAiExtractedIntent}
            />
          )}

          {activePage === 'ai-assistant' && (
            <AIBookingAssistantPage
              setActivePage={setActivePage}
              toast={toast}
              selectedProvider={selectedProvider}
              setSelectedProvider={setSelectedProvider}
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
              setAiExtractedIntent={setAiExtractedIntent}
            />
          )}

          {activePage === 'recommendations' && (
            <ProviderRecommendationPage
              setActivePage={setActivePage}
              toast={toast}
              selectedProvider={selectedProvider}
              setSelectedProvider={setSelectedProvider}
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
              setAiExtractedIntent={setAiExtractedIntent}
            />
          )}

          {activePage === 'provider-profile' && (
            <ProviderProfilePage
              setActivePage={setActivePage}
              toast={toast}
              selectedProvider={selectedProvider}
              setSelectedProvider={setSelectedProvider}
              searchFilter={searchFilter}
              setSearchFilter={setSearchFilter}
              setAiExtractedIntent={setAiExtractedIntent}
            />
          )}

          {activePage === 'booking-confirmation' && (
            <BookingConfirmationPage
              setActivePage={setActivePage}
              toast={toast}
              selectedProvider={selectedProvider}
              activeBooking={activeBooking}
              setActiveBooking={setActiveBooking}
              pastBookings={pastBookings}
              setPastBookings={setPastBookings}
            />
          )}

          {activePage === 'booking-tracking' && (
            <BookingTrackingPage
              setActivePage={setActivePage}
              toast={toast}
              selectedProvider={selectedProvider}
              activeBooking={activeBooking}
              setActiveBooking={setActiveBooking}
              pastBookings={pastBookings}
              setPastBookings={setPastBookings}
            />
          )}

          {activePage === 'booking-history' && (
            <BookingHistoryPage
              setActivePage={setActivePage}
              toast={toast}
              selectedProvider={selectedProvider}
              activeBooking={activeBooking}
              setActiveBooking={setActiveBooking}
              pastBookings={pastBookings}
              setPastBookings={setPastBookings}
            />
          )}

          {activePage === 'feedback' && (
            <FeedbackPage
              setActivePage={setActivePage}
              toast={toast}
              selectedProvider={selectedProvider}
              activeBooking={activeBooking}
              setActiveBooking={setActiveBooking}
              pastBookings={pastBookings}
              setPastBookings={setPastBookings}
            />
          )}

          {activePage === 'user-dashboard' && (
            <UserDashboard
              setActivePage={setActivePage}
              toast={toast}
              activeBooking={activeBooking}
              pastBookings={pastBookings}
              currentUser={currentUser}
            />
          )}

          {activePage === 'provider-dashboard' && (
            <ProviderDashboard
              setActivePage={setActivePage}
              toast={toast}
              activeBooking={activeBooking}
              pastBookings={pastBookings}
            />
          )}

          {activePage === 'admin-dashboard' && (
            <AdminDashboard
              setActivePage={setActivePage}
              toast={toast}
              activeBooking={activeBooking}
              pastBookings={pastBookings}
            />
          )}

          {activePage === 'login' && (
            <LoginPage
              setActivePage={setActivePage}
              toast={toast}
              notifications={notifications}
              setNotifications={setNotifications}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          )}

          {activePage === 'registration' && (
            <RegistrationPage
              setActivePage={setActivePage}
              toast={toast}
              notifications={notifications}
              setNotifications={setNotifications}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          )}

          {activePage === 'about' && <AboutPage />}

          {activePage === 'contact' && <ContactPage toast={toast} />}

          {activePage === 'faqs' && <FAQsPage />}

          {activePage === 'not-found' && <NotFoundPage setActivePage={setActivePage} />}

          {activePage === 'privacy' && <PrivacyPolicyPage />}

          {activePage === 'terms' && <TermsPage />}

          {activePage === 'notifications' && (
            <NotificationsPage
              setActivePage={setActivePage}
              toast={toast}
              notifications={notifications}
              setNotifications={setNotifications}
            />
          )}
        </main>

        {/* Global Footer */}
        <Footer setActivePage={setActivePage} />

        {/* Dark Mode Floating Trigger button */}
        <div className="fixed bottom-6 left-6 z-50">
          <button
            onClick={() => {
              setDarkMode(!darkMode);
              toast(darkMode ? 'Light Mode theme loaded' : 'Premium Dark Mode theme loaded');
            }}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-gray-150 text-gray-700 shadow-lg hover:scale-105 active:scale-95 transition dark:bg-gray-850 dark:border-gray-800 dark:text-gray-200"
            title="Toggle theme mode"
          >
            {darkMode ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5 text-blue-600" />}
          </button>
        </div>

        {/* Floating Sandbox controller: Instant access to check all 20 pages! */}
        <PageSelector activePage={activePage} setActivePage={setActivePage} toast={toast} />

      </div>
    </div>
  );
}
