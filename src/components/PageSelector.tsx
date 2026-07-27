import React, { useState } from 'react';
import { Sliders, Check, ChevronRight, Sparkles, User, Briefcase, Shield, ArrowUpRight } from 'lucide-react';
import { Page } from '../types';

interface PageSelectorProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
  toast: (msg: string) => void;
}

export default function PageSelector({ activePage, setActivePage, toast }: PageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    {
      name: 'AI & Core Discovery',
      pages: [
        { id: 'landing' as Page, name: '1. Landing Page' },
        { id: 'ai-assistant' as Page, name: '2. AI Booking Assistant' },
        { id: 'recommendations' as Page, name: '3. Recommendation List' },
        { id: 'provider-profile' as Page, name: '4. Provider Profile' },
      ],
    },
    {
      name: 'Booking Operations',
      pages: [
        { id: 'booking-confirmation' as Page, name: '5. Confirmation Screen' },
        { id: 'booking-tracking' as Page, name: '6. Live Tracking (GPS)' },
        { id: 'booking-history' as Page, name: '7. History Log' },
        { id: 'feedback' as Page, name: '8. Rating & Feedback' },
      ],
    },
    {
      name: 'Personal Portals',
      pages: [
        { id: 'user-dashboard' as Page, name: '9. User Dashboard' },
        { id: 'provider-dashboard' as Page, name: '10. Provider Desk' },
        { id: 'admin-dashboard' as Page, name: '11. Admin Command' },
      ],
    },
    {
      name: 'Authentication & Forms',
      pages: [
        { id: 'login' as Page, name: '12. Login Portal' },
        { id: 'registration' as Page, name: '13. Registration Form' },
      ],
    },
    {
      name: 'Corporate & Legal',
      pages: [
        { id: 'about' as Page, name: '14. About Mission' },
        { id: 'contact' as Page, name: '15. Contact Support' },
        { id: 'faqs' as Page, name: '16. FAQ Hub' },
        { id: 'not-found' as Page, name: '17. 404 Error' },
        { id: 'privacy' as Page, name: '18. Privacy Policy' },
        { id: 'terms' as Page, name: '19. Terms & Conditions' },
        { id: 'notifications' as Page, name: '20. Notification Log' },
      ],
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 items-center space-x-2 rounded-full bg-slate-900 border border-slate-700/80 px-4 text-xs font-semibold text-slate-100 shadow-xl hover:bg-slate-800 active:scale-95 transition-all duration-200"
        id="demo-page-selector-btn"
      >
        <Sliders className="h-4 w-4 text-emerald-400" />
        <span className="font-sans">Explore Pages (20 Views)</span>
      </button>

      {/* Control Drawer */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 max-h-[80vh] overflow-y-auto rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl dark:border-gray-800 dark:bg-gray-950 transition-all duration-200 scrollbar">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
            <div>
              <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white">HunarHub Sandbox Explorer</h3>
              <p className="text-[10px] text-gray-400">Jump directly to verify each of the 20 pages separately</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-white"
            >
              Close
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {categories.map((cat, idx) => (
              <div key={idx} className="space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  {cat.name}
                </p>
                <div className="space-y-1">
                  {cat.pages.map((p) => {
                    const isSelected = activePage === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          setActivePage(p.id);
                          toast(`Navigated to: ${p.name.substring(3)}`);
                          setIsOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white'
                        }`}
                      >
                        <span className="flex items-center space-x-1.5">
                          {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />}
                          <span>{p.name}</span>
                        </span>
                        {isSelected ? (
                          <Check className="h-3.5 w-3.5 text-blue-500" />
                        ) : (
                          <ChevronRight className="h-3 w-3 text-gray-300 dark:text-gray-700" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-gray-100 pt-3 text-[10px] text-gray-400 text-center dark:border-gray-800">
            HunarHub Prototype • Built with React & Tailwind
          </div>
        </div>
      )}
    </div>
  );
}
