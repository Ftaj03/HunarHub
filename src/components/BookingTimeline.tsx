import React from 'react';
import { CheckCircle, UserCheck, Navigation, Play, Flag, Check } from 'lucide-react';

interface BookingTimelineProps {
  currentStatus: 'confirmed' | 'assigned' | 'en-route' | 'arrived' | 'started' | 'completed';
}

export default function BookingTimeline({ currentStatus }: BookingTimelineProps) {
  const steps = [
    {
      id: 'confirmed',
      label: 'Booking Confirmed',
      desc: 'AI system matched and confirmed availability.',
      icon: CheckCircle,
      color: 'text-blue-500 bg-blue-100 dark:bg-blue-950 dark:text-blue-400',
    },
    {
      id: 'assigned',
      label: 'Provider Assigned',
      desc: 'Provider accepted and prepared technical gear.',
      icon: UserCheck,
      color: 'text-teal-500 bg-teal-100 dark:bg-teal-950 dark:text-teal-400',
    },
    {
      id: 'en-route',
      label: 'Provider En Route',
      desc: 'GPS reports transit via local corridors.',
      icon: Navigation,
      color: 'text-amber-500 bg-amber-100 dark:bg-amber-950 dark:text-amber-400',
    },
    {
      id: 'arrived',
      label: 'Provider Arrived',
      desc: 'Provider arrived at your registered doorstep.',
      icon: Check,
      color: 'text-purple-500 bg-purple-100 dark:bg-purple-950 dark:text-purple-400',
    },
    {
      id: 'started',
      label: 'Job Started',
      desc: 'Biometric OTP verified. Repairs in progress.',
      icon: Play,
      color: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-400',
    },
    {
      id: 'completed',
      label: 'Completed',
      desc: 'Job verified by customer. Digital receipt compiled.',
      icon: Flag,
      color: 'text-green-500 bg-green-100 dark:bg-green-950 dark:text-green-400',
    },
  ];

  const getStatusIndex = (status: string) => {
    return steps.findIndex((s) => s.id === status);
  };

  const currentIndex = getStatusIndex(currentStatus);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Progress Tracker</span>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 font-mono">
          Phase {currentIndex + 1}/6
        </span>
      </div>

      <div className="relative pl-6 space-y-6 border-l border-gray-100 dark:border-gray-800">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isActive = index === currentIndex;
          const StepIcon = step.icon;

          return (
            <div key={step.id} className="relative">
              {/* Timeline dot line connection */}
              <span
                className={`absolute -left-[31px] top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full border-2 ring-4 ring-white dark:ring-gray-950 transition ${
                  isCompleted
                    ? 'border-green-500 bg-green-500 text-white'
                    : isActive
                    ? 'border-blue-600 bg-white dark:bg-gray-900 text-blue-600 animate-pulse'
                    : 'border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-300'
                }`}
              >
                {isCompleted ? (
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                ) : (
                  <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-blue-600' : 'bg-transparent'}`} />
                )}
              </span>

              {/* Step info block */}
              <div
                className={`rounded-2xl border p-4 transition-all duration-300 ${
                  isActive
                    ? 'border-blue-100 bg-blue-50/30 shadow-sm dark:border-blue-900/20 dark:bg-blue-950/10'
                    : 'border-transparent bg-transparent'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${step.color}`}>
                    <StepIcon className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4
                      className={`font-display font-bold text-sm leading-tight ${
                        isActive
                          ? 'text-gray-900 dark:text-white'
                          : isCompleted
                          ? 'text-gray-700 dark:text-gray-300'
                          : 'text-gray-400'
                      }`}
                    >
                      {step.label}
                    </h4>
                    <p
                      className={`text-xs mt-0.5 ${
                        isActive ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500'
                      }`}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Additional micro elements for active phase */}
                {isActive && step.id === 'en-route' && (
                  <div className="mt-3 rounded-lg bg-white p-2.5 border border-gray-100 dark:bg-gray-900 dark:border-gray-800 flex justify-between items-center text-[10px] font-mono">
                    <span className="text-gray-400">Transit: Shahrah-e-Faisal</span>
                    <span className="text-amber-600 font-bold">Speed: ~45 km/h</span>
                  </div>
                )}
                {isActive && step.id === 'started' && (
                  <div className="mt-3 rounded-lg bg-white p-2.5 border border-gray-100 dark:bg-gray-900 dark:border-gray-800 flex justify-between items-center text-[10px] font-mono">
                    <span className="text-gray-400">Biometric OTP Status</span>
                    <span className="text-green-600 font-bold">✓ VERIFIED via Nadra API</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
