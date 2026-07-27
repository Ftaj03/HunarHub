import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Heart } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  setActivePage: (page: Page) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300 transition-colors duration-200 border-t border-gray-800">
      {/* Top Value Banner */}
      <div className="border-b border-gray-800 bg-gray-950/40 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center space-x-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">NADRA Verified Providers</h4>
                <p className="text-xs text-gray-400">Secure biometric verification with national databases.</p>
              </div>
            </div>
            <div className="flex items-center space-x-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">PKR 50K Hunar Guarantee</h4>
                <p className="text-xs text-gray-400">Complete property safety guarantee on all bookings.</p>
              </div>
            </div>
            <div className="flex items-center space-x-3.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Agentic AI Matching</h4>
                <p className="text-xs text-gray-400">Problem analysis & localized matching in real-time.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-display font-bold text-lg">
                H
              </div>
              <span className="font-display text-lg font-bold text-white">
                HunarHub<span className="text-blue-500">.pk</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              HunarHub is Pakistan's premier, AI-powered on-demand home services platform. We connect verified tech-savvy plumbers, electricians, and professionals with local households safely, quickly, and cashlessly.
            </p>
            <div className="space-y-2 text-xs text-gray-400 pt-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4.5 w-4.5 text-blue-500" />
                <span>+92 (300) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4.5 w-4.5 text-blue-500" />
                <span>support@hunarhub.pk</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4.5 w-4.5 text-blue-500" />
                <span>DHA Phase 5, Lahore, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Quick Links: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Services</h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('ai-assistant')} className="text-gray-400 hover:text-white transition">
                  Electricians
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('ai-assistant')} className="text-gray-400 hover:text-white transition">
                  Plumbers
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('ai-assistant')} className="text-gray-400 hover:text-white transition">
                  AC Technicians
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('ai-assistant')} className="text-gray-400 hover:text-white transition">
                  Home Salon & Beauticians
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('ai-assistant')} className="text-gray-400 hover:text-white transition">
                  Home Tutors
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('ai-assistant')} className="text-gray-400 hover:text-white transition">
                  Personal Drivers
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links: Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('about')} className="text-gray-400 hover:text-white transition">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('contact')} className="text-gray-400 hover:text-white transition">
                  Contact Support
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('faqs')} className="text-gray-400 hover:text-white transition">
                  FAQs & Center
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('registration')} className="text-gray-400 hover:text-white transition">
                  Become a Partner
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('login')} className="text-gray-400 hover:text-white transition">
                  Portal Login
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Newsletter</h4>
            <p className="mt-4 text-xs text-gray-400 leading-relaxed">
              Get the latest updates, home tips, and seasonal discount coupons.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full rounded-l-lg border-y border-l border-gray-700 bg-gray-800 px-3 py-1.5 text-xs text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-r-lg bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between text-[11px] text-gray-500">
          <div className="flex flex-wrap gap-4 md:gap-6">
            <button onClick={() => setActivePage('privacy')} className="hover:text-gray-400 transition">
              Privacy Policy
            </button>
            <button onClick={() => setActivePage('terms')} className="hover:text-gray-400 transition">
              Terms & Conditions
            </button>
            <button onClick={() => setActivePage('landing')} className="hover:text-gray-400 transition">
              Sitemap
            </button>
          </div>
          <p className="mt-4 md:mt-0 flex items-center space-x-1.5">
            <span>&copy; {new Date().getFullYear()} HunarHub Technologies (Pvt) Ltd. All rights reserved.</span>
            <span className="flex items-center text-red-500">
              <Heart className="h-3 w-3 mx-1 fill-current" />
              <span>in Pakistan</span>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
