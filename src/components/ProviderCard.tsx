import React from 'react';
import { Star, ShieldCheck, MapPin, Clock, Check } from 'lucide-react';
import { Provider } from '../types';

interface ProviderCardProps {
  key?: string;
  provider: Provider;
  onBook: (provider: Provider) => void;
  onViewProfile: (provider: Provider) => void;
}

export default function ProviderCard({ provider, onBook, onViewProfile }: ProviderCardProps) {
  return (
    <div className="group relative rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 dark:border-gray-800 dark:bg-gray-950">
      {/* Top Banner (Verification & Rating) */}
      <div className="flex items-center justify-between mb-3.5">
        <span className="flex items-center space-x-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full dark:bg-emerald-950/40 dark:text-emerald-300">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Identity & Police Cleared</span>
        </span>
        <span className="text-[11px] font-semibold text-slate-500 dark:text-gray-400">
          {provider.reliabilityScore}% On-Time
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
        {/* Photo */}
        <div className="relative shrink-0">
          <img
            src={provider.photo}
            alt={provider.name}
            referrerPolicy="no-referrer"
            className="h-16 w-16 rounded-2xl object-cover border border-slate-100 shadow-sm group-hover:scale-105 transition duration-200 dark:border-gray-800"
          />
          <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white shadow ring-2 ring-white dark:ring-gray-900">
            <Check className="h-3 w-3" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1.5">
            <h4
              onClick={() => onViewProfile(provider)}
              className="font-display font-bold text-base text-slate-900 hover:text-emerald-700 dark:text-white dark:hover:text-emerald-400 cursor-pointer transition truncate"
            >
              {provider.name}
            </h4>
            <span className="text-xs text-slate-400 font-medium">• {provider.category}</span>
          </div>

          <div className="flex items-center space-x-2 mt-1 text-xs text-slate-500 dark:text-gray-400">
            <span>{provider.experienceYears} yrs exp</span>
            <span>•</span>
            <span className="flex items-center text-amber-500 font-semibold">
              <Star className="h-3.5 w-3.5 fill-current mr-0.5" />
              <span className="text-slate-800 dark:text-gray-200">{provider.rating}</span>
              <span className="text-slate-400 font-normal ml-0.5">({provider.reviewsCount})</span>
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-gray-400 line-clamp-1 mt-1.5">{provider.bio}</p>
        </div>
      </div>

      {/* Grid Specs */}
      <div className="mt-4 grid grid-cols-3 gap-2 border-y border-slate-100 py-3 text-xs dark:border-gray-800">
        <div className="text-center">
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">Distance</span>
          <p className="font-semibold text-slate-700 dark:text-gray-200 flex items-center justify-center mt-0.5">
            <MapPin className="h-3.5 w-3.5 text-rose-500 mr-1 shrink-0" />
            <span>{provider.distanceKm} km</span>
          </p>
        </div>
        <div className="text-center border-x border-slate-100 dark:border-gray-800">
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">Est. Arrival</span>
          <p className="font-semibold text-slate-700 dark:text-gray-200 flex items-center justify-center mt-0.5">
            <Clock className="h-3.5 w-3.5 text-emerald-600 mr-1 shrink-0" />
            <span>~{provider.etaMinutes} mins</span>
          </p>
        </div>
        <div className="text-center">
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">Jobs Done</span>
          <p className="font-semibold text-slate-700 dark:text-gray-200 mt-0.5">{provider.completedJobs || 120}+</p>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-3 flex flex-wrap gap-1.5 max-h-12 overflow-hidden">
        {provider.skills.slice(0, 3).map((skill, index) => (
          <span
            key={index}
            className="text-[10px] font-medium text-slate-600 bg-slate-100/80 px-2 py-0.5 rounded-md dark:bg-gray-900 dark:text-gray-300"
          >
            {skill}
          </span>
        ))}
        {provider.skills.length > 3 && (
          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md dark:bg-emerald-950/40 dark:text-emerald-300">
            +{provider.skills.length - 3} more
          </span>
        )}
      </div>

      {/* Price & Action Footer */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3.5 dark:border-gray-800">
        <div>
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">Estimated Base</span>
          <p className="font-display font-extrabold text-base text-slate-900 dark:text-white">
            Rs. {provider.basePrice}
            <span className="text-[11px] font-normal text-slate-400 ml-0.5">/{provider.category === 'Tutor' || provider.category === 'Electrician' || provider.category === 'Plumber' || provider.category === 'Driver' ? 'hr' : 'job'}</span>
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onViewProfile(provider)}
            className="rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-900"
          >
            Profile
          </button>
          <button
            onClick={() => onBook(provider)}
            className="rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition dark:bg-emerald-600 dark:hover:bg-emerald-500"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
