import React, { useState } from 'react';
import { Menu, X, Bell, User, Sparkles, Shield, Briefcase, Sliders, ChevronDown, Sun, Moon, LogOut, Search, Check, HelpCircle, PhoneCall, Info } from 'lucide-react';
import { Page, UserRole, AuthUser } from '../types';

interface NavbarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  unreadNotificationsCount: number;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  currentUser?: AuthUser | null;
  onLogout?: () => void;
}

export default function Navbar({
  activePage,
  setActivePage,
  userRole,
  setUserRole,
  unreadNotificationsCount,
  darkMode,
  setDarkMode,
  currentUser,
  onLogout,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navItems: { id: Page; label: string; icon?: React.ReactNode; badge?: string }[] = [
    { id: 'landing', label: 'Home' },
    { id: 'ai-assistant', label: 'AI Booking Assistant', icon: <Sparkles className="h-3.5 w-3.5 text-teal-500 animate-pulse" /> },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
    { id: 'faqs', label: 'FAQs' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90 transition-colors duration-300 shadow-xs dark:shadow-md">
      {/* Dropdown Backdrop Closer */}
      {(showRoleDropdown || showUserMenu) && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => {
            setShowRoleDropdown(false);
            setShowUserMenu(false);
          }}
        />
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          
          {/* Brand Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setActivePage('landing')}
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-slate-900 to-blue-900 dark:from-blue-600 dark:to-teal-500 text-white shadow-md group-hover:scale-105 transition-transform duration-200">
              <span className="font-display text-xl font-extrabold tracking-wider">H</span>
              <div className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-950 shadow-xs" />
            </div>
            <div>
              <span className="font-display text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-0.5">
                HunarHub<span className="text-emerald-600 dark:text-emerald-400">.pk</span>
              </span>
              <p className="text-[9px] text-slate-400 dark:text-slate-400 font-bold -mt-1 tracking-wider uppercase">
                VERIFIED LOCAL SERVICES
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-slate-100/70 dark:bg-slate-900/70 p-1 rounded-2xl border border-slate-200/60 dark:border-slate-800/60">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-emerald-400 shadow-xs border border-slate-200/60 dark:border-slate-700/60'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User & System Controls */}
          <div className="hidden md:flex items-center space-x-3">
            
            {/* Theme Toggle Button - Distinct, Beautiful & Functioning */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center space-x-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-all shadow-2xs hover:scale-105 active:scale-95"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <>
                  <Sun className="h-4 w-4 text-amber-400 fill-amber-400/30 animate-spin-slow" />
                  <span className="hidden lg:inline text-amber-300 font-bold">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 text-slate-700 fill-slate-700/20" />
                  <span className="hidden lg:inline text-slate-700 font-bold">Dark Mode</span>
                </>
              )}
            </button>

            {/* Notifications Bell */}
            <button
              onClick={() => setActivePage('notifications')}
              className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 transition-all hover:scale-105"
              title="Notifications"
            >
              <Bell className="h-4.5 w-4.5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white ring-2 ring-white dark:ring-slate-950 animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center space-x-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 px-3 py-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 transition shadow-2xs"
              >
                {userRole === 'customer' && (
                  <>
                    <User className="h-3.5 w-3.5 text-blue-500" />
                    <span>Customer</span>
                  </>
                )}
                {userRole === 'provider' && (
                  <>
                    <Briefcase className="h-3.5 w-3.5 text-teal-500" />
                    <span>Provider</span>
                  </>
                )}
                {userRole === 'admin' && (
                  <>
                    <Shield className="h-3.5 w-3.5 text-amber-500" />
                    <span>Admin</span>
                  </>
                )}
                <ChevronDown className="h-3 w-3 text-slate-400 ml-1" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-800 dark:bg-slate-900 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <p className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Switch Sandbox Role
                  </p>
                  <button
                    onClick={() => {
                      setUserRole('customer');
                      setActivePage('user-dashboard');
                      setShowRoleDropdown(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-bold transition ${
                      userRole === 'customer'
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                        : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-blue-500" />
                      <span>Customer View</span>
                    </div>
                    {userRole === 'customer' && <Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />}
                  </button>
                  <button
                    onClick={() => {
                      setUserRole('provider');
                      setActivePage('provider-dashboard');
                      setShowRoleDropdown(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-bold transition ${
                      userRole === 'provider'
                        ? 'bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400'
                        : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-4 w-4 text-teal-500" />
                      <span>Provider Desk</span>
                    </div>
                    {userRole === 'provider' && <Check className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400" />}
                  </button>
                  <button
                    onClick={() => {
                      setUserRole('admin');
                      setActivePage('admin-dashboard');
                      setShowRoleDropdown(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-bold transition ${
                      userRole === 'admin'
                        ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
                        : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-amber-500" />
                      <span>Admin Portal</span>
                    </div>
                    {userRole === 'admin' && <Check className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />}
                  </button>
                </div>
              )}
            </div>

            {/* Login / Signup or User Profile Badge */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-3 py-1.5 transition text-xs font-bold text-white shadow-sm"
                >
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt={currentUser.displayName} className="h-5 w-5 rounded-full object-cover ring-2 ring-white/30" />
                  ) : (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[10px] font-black text-white">
                      {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  <span className="font-bold text-xs max-w-[100px] truncate">{currentUser.displayName}</span>
                  <ChevronDown className="h-3 w-3 text-white/70" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-800 dark:bg-slate-900 z-50">
                    <div className="px-3 py-2.5 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentUser.displayName}</p>
                      {currentUser.email && (
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">{currentUser.email}</p>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        setActivePage('user-dashboard');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition flex items-center space-x-2 mt-1"
                    >
                      <User className="h-3.5 w-3.5 text-blue-500" />
                      <span>My Account Dashboard</span>
                    </button>
                    <button
                      onClick={() => {
                        if (onLogout) onLogout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition flex items-center space-x-2"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActivePage('login')}
                  className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-emerald-400 transition"
                >
                  Log In
                </button>
                <button
                  onClick={() => setActivePage('registration')}
                  className="rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 px-4 py-1.5 text-xs font-bold text-white shadow-xs transition"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 transition"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
            </button>
            <button
              onClick={() => setActivePage('notifications')}
              className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 transition"
            >
              <Bell className="h-5 w-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white ring-2 ring-white dark:ring-slate-950">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 transition"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-3 dark:border-slate-800 dark:bg-slate-950 transition-colors duration-200 shadow-xl">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center space-x-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
                  activePage === item.id
                    ? 'bg-blue-50 text-blue-600 dark:bg-slate-900 dark:text-emerald-400'
                    : 'text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-slate-100 my-2 pt-2 dark:border-slate-800" />

          {/* User Account / Auth */}
          {currentUser ? (
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-900 rounded-2xl">
              <div className="flex items-center space-x-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-black text-white">
                  {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="max-w-[140px]">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{currentUser.displayName}</p>
                  {currentUser.email && <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>}
                </div>
              </div>
              <button
                onClick={() => {
                  if (onLogout) onLogout();
                  setIsOpen(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-200 transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setActivePage('login');
                  setIsOpen(false);
                }}
                className="rounded-xl border border-slate-200 dark:border-slate-800 py-2 text-center text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setActivePage('registration');
                  setIsOpen(false);
                }}
                className="rounded-xl bg-slate-900 dark:bg-emerald-600 py-2 text-center text-xs font-bold text-white hover:bg-slate-800"
              >
                Sign Up
              </button>
            </div>
          )}

          <div className="border-t border-slate-100 my-2 pt-2 dark:border-slate-800" />

          {/* Sandbox Role Switcher */}
          <div className="px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Sandbox View</div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                setUserRole('customer');
                setActivePage('user-dashboard');
                setIsOpen(false);
              }}
              className={`rounded-xl py-2 text-center text-xs font-bold ${
                userRole === 'customer'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              Customer
            </button>
            <button
              onClick={() => {
                setUserRole('provider');
                setActivePage('provider-dashboard');
                setIsOpen(false);
              }}
              className={`rounded-xl py-2 text-center text-xs font-bold ${
                userRole === 'provider'
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              Provider
            </button>
            <button
              onClick={() => {
                setUserRole('admin');
                setActivePage('admin-dashboard');
                setIsOpen(false);
              }}
              className={`rounded-xl py-2 text-center text-xs font-bold ${
                userRole === 'admin'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
