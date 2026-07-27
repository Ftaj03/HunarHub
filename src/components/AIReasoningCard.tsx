import React, { useState } from 'react';
import { Sparkles, ShieldCheck, ChevronDown, ChevronUp, CheckCircle, Clock } from 'lucide-react';

interface AIReasoningCardProps {
  service: string;
  urgency: 'Low' | 'Medium' | 'High';
  priority: 'Fastest' | 'Cheapest' | 'Best Rated' | 'Balanced';
  confidence: number;
  steps: string[];
}

export default function AIReasoningCard({
  service,
  urgency,
  priority,
  confidence,
  steps,
}: AIReasoningCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900/60">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Request Analysis</h4>
            <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">Smart Match Breakdown</h3>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
            {confidence}% Match Match
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-200/60 hover:text-slate-600 dark:hover:bg-gray-800"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Extracted Intent Badges */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="rounded-xl border border-slate-200/60 bg-white p-2.5 dark:border-gray-800 dark:bg-gray-950">
          <span className="text-[10px] text-slate-400 font-medium">Service Needed</span>
          <p className="font-bold text-xs text-slate-800 dark:text-gray-200">{service || 'Detecting...'}</p>
        </div>
        <div className="rounded-xl border border-slate-200/60 bg-white p-2.5 dark:border-gray-800 dark:bg-gray-950">
          <span className="text-[10px] text-slate-400 font-medium">Urgency</span>
          <p className="flex items-center space-x-1.5 font-bold text-xs">
            <span
              className={`h-2 w-2 rounded-full ${
                urgency === 'High' ? 'bg-rose-500' : urgency === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
            />
            <span
              className={
                urgency === 'High' ? 'text-rose-600' : urgency === 'Medium' ? 'text-amber-600' : 'text-emerald-600'
              }
            >
              {urgency} Priority
            </span>
          </p>
        </div>
        <div className="rounded-xl border border-slate-200/60 bg-white p-2.5 dark:border-gray-800 dark:bg-gray-950">
          <span className="text-[10px] text-slate-400 font-medium">Preference</span>
          <p className="font-bold text-xs text-indigo-600 dark:text-indigo-400">{priority}</p>
        </div>
        <div className="rounded-xl border border-slate-200/60 bg-white p-2.5 dark:border-gray-800 dark:bg-gray-950">
          <span className="text-[10px] text-slate-400 font-medium">Verification</span>
          <p className="flex items-center space-x-1 font-bold text-xs text-emerald-600">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Verified Only</span>
          </p>
        </div>
      </div>

      {/* Collapsible reasoning list */}
      {isExpanded && (
        <div className="mt-4 border-t border-slate-200/60 pt-3 dark:border-gray-800">
          <h5 className="text-[11px] font-semibold text-slate-500 dark:text-gray-400 flex items-center space-x-1">
            <Clock className="h-3.5 w-3.5" />
            <span>How we selected candidates:</span>
          </h5>
          <div className="mt-2.5 space-y-2">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-200 text-[10px] font-semibold text-slate-700 dark:bg-gray-800 dark:text-gray-300">
                  {index + 1}
                </div>
                <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
