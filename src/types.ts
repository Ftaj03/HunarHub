export type Page =
  | 'landing'
  | 'ai-assistant'
  | 'recommendations'
  | 'provider-profile'
  | 'booking-confirmation'
  | 'booking-tracking'
  | 'booking-history'
  | 'feedback'
  | 'user-dashboard'
  | 'provider-dashboard'
  | 'admin-dashboard'
  | 'login'
  | 'registration'
  | 'about'
  | 'contact'
  | 'faqs'
  | 'not-found'
  | 'privacy'
  | 'terms'
  | 'notifications';

export type UserRole = 'customer' | 'provider' | 'admin';

export interface AuthUser {
  displayName: string;
  email?: string;
  photoURL?: string;
  uid?: string;
}

export interface Provider {
  id: string;
  name: string;
  photo: string;
  category: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  distanceKm: number;
  etaMinutes: number;
  reliabilityScore: number; // percentage (e.g. 98)
  cancellationRate: number; // percentage (e.g. 2)
  basePrice: number; // in PKR
  skills: string[];
  languages: string[];
  bio: string;
  completedJobs: number;
  responseTimeMinutes: number;
  certifications: string[];
  portfolioImgs: string[];
  availableTimeSlots: string[];
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Booking {
  id: string;
  provider: Provider;
  date: string;
  time: string;
  location: string;
  basePrice: number;
  serviceFee: number;
  promoDiscount: number;
  loyaltyDiscount: number;
  total: number;
  status: 'confirmed' | 'assigned' | 'en-route' | 'arrived' | 'started' | 'completed';
  category: string;
  description: string;
  paymentMethod: string;
  customerName: string;
  customerPhone: string;
}

export interface AppNotification {
  id: string;
  type: 'booking' | 'promo' | 'message' | 'system';
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  reasoning?: {
    steps: string[];
    confidence: number;
    intent: {
      service: string;
      urgency: 'Low' | 'Medium' | 'High';
      priority: 'Fastest' | 'Cheapest' | 'Best Rated' | 'Balanced';
    };
  };
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'booking' | 'providers' | 'payment' | 'trust';
}
