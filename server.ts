import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// ==========================================
// 1. LAZY INITIALIZE GEMINI API
// ==========================================
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not set. Falling back to rule-based responses.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || 'PLACEHOLDER_KEY',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// ==========================================
// 2. IN-MEMORY STATE (SEEDED DATA)
// ==========================================
// We define our initial seed database inside the server so mutations are shared and persist across client refreshes
let providers = [
  {
    id: 'p1',
    name: 'Muhammad Bilal',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    category: 'Electrician',
    rating: 4.9,
    reviewsCount: 142,
    experienceYears: 8,
    distanceKm: 1.4,
    etaMinutes: 15,
    reliabilityScore: 99,
    cancellationRate: 1,
    basePrice: 800, // PKR per hour
    skills: ['UPS Repair', 'DB Wiring', 'Short Circuit Detection', 'Inverter Installation', 'Generator Service'],
    languages: ['Urdu', 'Punjabi', 'English'],
    bio: 'Professional certified electrician with over 8 years of field experience in residential and commercial wiring. Expert in UPS emergency backup solutions and resolving complex short-circuit issues. Punctuality and quality work guaranteed.',
    completedJobs: 924,
    responseTimeMinutes: 5,
    certifications: [
      'Punjab Board of Technical Education Certified Electrician',
      'Solar Panel Systems Installer Diploma'
    ],
    portfolioImgs: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80'
    ],
    availableTimeSlots: ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '07:00 PM']
  },
  {
    id: 'p7',
    name: 'Rashid Mahmood',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    category: 'Electrician',
    rating: 4.8,
    reviewsCount: 198,
    experienceYears: 12,
    distanceKm: 2.3,
    etaMinutes: 20,
    reliabilityScore: 97,
    cancellationRate: 2,
    basePrice: 950,
    skills: ['3-Phase Commercial Wiring', 'Smart Switchboard Setup', 'Breaker Box Overhaul', 'Industrial Generator Sync'],
    languages: ['Urdu', 'English'],
    bio: 'Senior industrial and domestic electrician. Specializing in high-voltage 3-phase wiring, smart home automation switches, and diagnostic testing for hidden short-circuits.',
    completedJobs: 1320,
    responseTimeMinutes: 8,
    certifications: [
      'K-Electric Approved Electrical Contractor',
      'Schneider Electric Certified Technician'
    ],
    portfolioImgs: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=400&auto=format&fit=crop&q=80'
    ],
    availableTimeSlots: ['10:00 AM', '01:00 PM', '03:30 PM', '06:00 PM']
  },
  {
    id: 'p2',
    name: 'Aisha Rahman',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    category: 'Beautician',
    rating: 4.8,
    reviewsCount: 215,
    experienceYears: 6,
    distanceKm: 2.8,
    etaMinutes: 25,
    reliabilityScore: 97,
    cancellationRate: 3,
    basePrice: 2500, // PKR base package
    skills: ['Bridal Makeup', 'Hydra Facial', 'Hair Styling', 'Waxing & Threading', 'Manicure & Pedicure'],
    languages: ['Urdu', 'English'],
    bio: 'Certified makeup artist and skincare consultant trained in Dubai. Specializing in home salon services with premium international products. Safe, hygienic, and personalized pampering right in your living room.',
    completedJobs: 540,
    responseTimeMinutes: 12,
    certifications: [
      'CIBTAC Diploma in Beauty Therapy',
      'Kryolan Professional Makeup Certificate'
    ],
    portfolioImgs: [
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80'
    ],
    availableTimeSlots: ['10:00 AM', '01:00 PM', '03:30 PM', '06:00 PM']
  },
  {
    id: 'p8',
    name: 'Sidra Parvez',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    category: 'Beautician',
    rating: 4.9,
    reviewsCount: 164,
    experienceYears: 8,
    distanceKm: 1.9,
    etaMinutes: 18,
    reliabilityScore: 99,
    cancellationRate: 1,
    basePrice: 2800,
    skills: ['Derma Glow Facial', 'Keratin Hair Treatment', 'Party Makeup', 'Organic Nail Art'],
    languages: ['Urdu', 'English'],
    bio: 'Skincare expert and salon director offering luxury home pampering sessions. Uses strictly sanitized kits and organic imported serums for long-lasting glow and zero skin irritation.',
    completedJobs: 710,
    responseTimeMinutes: 7,
    certifications: [
      'L’Oréal Professional Senior Colorist Badge',
      'DermaPen World Certified Aesthetician'
    ],
    portfolioImgs: [
      'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&auto=format&fit=crop&q=80'
    ],
    availableTimeSlots: ['11:00 AM', '02:00 PM', '05:00 PM', '07:30 PM']
  },
  {
    id: 'p3',
    name: 'Tariq Mehmood',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    category: 'AC Technician',
    rating: 4.7,
    reviewsCount: 310,
    experienceYears: 12,
    distanceKm: 3.2,
    etaMinutes: 20,
    reliabilityScore: 96,
    cancellationRate: 4,
    basePrice: 1500, // PKR service
    skills: ['Inverter AC Gas Charging', 'Leaking Diagnostics', 'Compressor Replacement', 'Deep Pressure Wash Service'],
    languages: ['Urdu', 'Pashto', 'Punjabi'],
    bio: 'Veteran heating and cooling expert. Specialize in energy-efficient inverter AC repairs, gas top-ups, and thorough chemical cleaning that lowers your electricity bills. Hundreds of happy families served across the city.',
    completedJobs: 1850,
    responseTimeMinutes: 8,
    certifications: [
      'DAE in HVAC (Heating, Ventilation & Air Conditioning)',
      'Daikin Inverter Technology Certified Partner'
    ],
    portfolioImgs: [
      'https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1621905252507-b354bc25edac?w=400&auto=format&fit=crop&q=80'
    ],
    availableTimeSlots: ['08:00 AM', '11:00 AM', '02:00 PM', '05:00 PM', '07:30 PM']
  },
  {
    id: 'p9',
    name: 'Usman Ghani',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    category: 'AC Technician',
    rating: 4.9,
    reviewsCount: 230,
    experienceYears: 9,
    distanceKm: 1.1,
    etaMinutes: 12,
    reliabilityScore: 98,
    cancellationRate: 1,
    basePrice: 1600,
    skills: ['Inverter PCB Board Diagnostics', 'Copper Pipe Flare Repair', 'R32 Gas Top-Up', 'Floor Standing Chiller Maintenance'],
    languages: ['Urdu', 'English'],
    bio: 'Gree & Orient master technician. Specialist in circuit board (PCB) micro-soldering for inverter units and high-pressure nitrogen leak detection.',
    completedJobs: 1420,
    responseTimeMinutes: 6,
    certifications: [
      'Gree Air Conditioners Authorized Service Specialist',
      'HVAC Safety & Refrigerant Handling Certification'
    ],
    portfolioImgs: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80'
    ],
    availableTimeSlots: ['09:30 AM', '12:30 PM', '03:30 PM', '06:30 PM']
  },
  {
    id: 'p4',
    name: 'Sajid Ali',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    category: 'Plumber',
    rating: 4.9,
    reviewsCount: 189,
    experienceYears: 10,
    distanceKm: 0.8,
    etaMinutes: 10,
    reliabilityScore: 98,
    cancellationRate: 2,
    basePrice: 700, // PKR/hour
    skills: ['Geyser Repair & Fitting', 'Water Tank Cleaning', 'Leakage Waterproofing', 'PPR & GI Pipe Fitting'],
    languages: ['Urdu', 'Punjabi'],
    bio: 'Prompt and reliable plumbing expert. Known for quick diagnosis of hidden seepages and high-grade pipeline installations. I carry advanced water-leak sensor equipment to avoid unnecessary breaking of your tiles.',
    completedJobs: 1120,
    responseTimeMinutes: 4,
    certifications: [
      'WASA Registered Sanitary Contractor',
      'Certified Hydro-Plumbing Inspector'
    ],
    portfolioImgs: [
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542013936693-8848e5740a7a?w=400&auto=format&fit=crop&q=80'
    ],
    availableTimeSlots: ['09:00 AM', '12:00 PM', '03:00 PM', '06:00 PM', '08:00 PM']
  },
  {
    id: 'p10',
    name: 'Farhan Tanveer',
    photo: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
    category: 'Plumber',
    rating: 4.8,
    reviewsCount: 145,
    experienceYears: 7,
    distanceKm: 2.5,
    etaMinutes: 22,
    reliabilityScore: 96,
    cancellationRate: 2,
    basePrice: 750,
    skills: ['Automatic Motor Pump Setup', 'Underground Line Flushing', 'Shower Panel Fitting', 'Commercial Sewage Unblocking'],
    languages: ['Urdu', 'Pashto'],
    bio: 'Equipped with heavy-duty electric drain snakes and hydro-jets. Specializes in solving blocked sewerage drains without breaking tiled floors.',
    completedJobs: 890,
    responseTimeMinutes: 9,
    certifications: [
      'TEVTA Plumbing Specialist Diploma',
      'Sanitary Pipeline Safety Certificate'
    ],
    portfolioImgs: [
      'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&auto=format&fit=crop&q=80'
    ],
    availableTimeSlots: ['08:30 AM', '11:30 AM', '02:30 PM', '05:30 PM']
  },
  {
    id: 'p5',
    name: 'Zara Naqvi',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    category: 'Tutor',
    rating: 4.9,
    reviewsCount: 88,
    experienceYears: 5,
    distanceKm: 4.5,
    etaMinutes: 45,
    reliabilityScore: 100,
    cancellationRate: 0,
    basePrice: 1200, // PKR per session (O/A Level)
    skills: ['O-Level Physics', 'A-Level Mathematics', 'SAT Math Prep', 'Calculus & Algebra'],
    languages: ['Urdu', 'English'],
    bio: 'NUST engineering graduate with a passion for pedagogy. Specializing in making tough STEM concepts incredibly easy. Comprehensive notes, past-paper practice, and guaranteed grade improvements.',
    completedJobs: 210,
    responseTimeMinutes: 15,
    certifications: [
      'B.E. Mechanical Engineering, NUST',
      'Cambridge O-Level Pedagogy Excellence Badge'
    ],
    portfolioImgs: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&auto=format&fit=crop&q=80'
    ],
    availableTimeSlots: ['03:00 PM', '05:00 PM', '07:00 PM']
  },
  {
    id: 'p11',
    name: 'Prof. Kamran Siddiqui',
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    category: 'Tutor',
    rating: 5.0,
    reviewsCount: 175,
    experienceYears: 14,
    distanceKm: 3.0,
    etaMinutes: 30,
    reliabilityScore: 99,
    cancellationRate: 1,
    basePrice: 1500,
    skills: ['O/A Level Chemistry', 'MDCAT Entrance Prep', 'Organic Chemistry', 'IB & IGCSE Syllabus'],
    languages: ['Urdu', 'English'],
    bio: 'Former A-Level college department head with over 14 years teaching Cambridge students. Produced dozens of A* grades and national distinction holders.',
    completedJobs: 640,
    responseTimeMinutes: 10,
    certifications: [
      'M.Sc Organic Chemistry, KU',
      'Cambridge International Educator Certificate'
    ],
    portfolioImgs: [
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&auto=format&fit=crop&q=80'
    ],
    availableTimeSlots: ['04:00 PM', '06:00 PM', '08:00 PM']
  },
  {
    id: 'p6',
    name: 'Waqas Bhatti',
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    category: 'Driver',
    rating: 4.6,
    reviewsCount: 350,
    experienceYears: 15,
    distanceKm: 2.1,
    etaMinutes: 18,
    reliabilityScore: 94,
    cancellationRate: 5,
    basePrice: 1000, // PKR per hour (Intercity or outstation)
    skills: ['Defensive Driving', 'VIP Protocol Routing', 'Manual & Automatic Expert', 'Toyota/Honda Diagnostics'],
    languages: ['Urdu', 'Punjabi', 'English'],
    bio: 'Highly experienced professional driver for long tours, airport transfers, and corporate executives. Extremely polite, non-smoker, clean background. Familiar with all major highways and remote routes of Pakistan.',
    completedJobs: 2450,
    responseTimeMinutes: 10,
    certifications: [
      'National Highways & Motorway Police (NHMP) Driver Certificate',
      'Elite Security & Defensive Driving Protocol'
    ],
    portfolioImgs: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&auto=format&fit=crop&q=80'
    ],
    availableTimeSlots: ['07:00 AM', '10:00 AM', '01:00 PM', '04:00 PM', '08:00 PM']
  },
  {
    id: 'p12',
    name: 'Hamza Chaudhry',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    category: 'Driver',
    rating: 4.9,
    reviewsCount: 210,
    experienceYears: 8,
    distanceKm: 1.6,
    etaMinutes: 14,
    reliabilityScore: 99,
    cancellationRate: 1,
    basePrice: 1100,
    skills: ['Intercity Motorway Travel', 'Luxury Sedan Handling', 'GPS Navigation Expert', 'Family Safety Protocol'],
    languages: ['Urdu', 'English', 'Punjabi'],
    bio: 'Courteous and punctual driver with verified police character certificate. Punctual airport drops and safe family journeys between Lahore, Islamabad, and Murree.',
    completedJobs: 1180,
    responseTimeMinutes: 5,
    certifications: [
      'Motorway Police First-Aid & Highway Safety Badge',
      'Defensive Driving Academy Diploma'
    ],
    portfolioImgs: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&auto=format&fit=crop&q=80'
    ],
    availableTimeSlots: ['06:00 AM', '09:00 AM', '02:00 PM', '06:00 PM']
  },
  {
    id: 'p13',
    name: 'Master Zulfiqar',
    photo: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
    category: 'Carpenter',
    rating: 4.9,
    reviewsCount: 168,
    experienceYears: 16,
    distanceKm: 2.0,
    etaMinutes: 25,
    reliabilityScore: 98,
    cancellationRate: 1,
    basePrice: 900,
    skills: ['Custom Kitchen Cabinets', 'Door Lock Installation', 'Furniture Lacquer Polish', 'Wooden Flooring Repair'],
    languages: ['Urdu', 'Punjabi'],
    bio: 'Master craftsman in solid wood and MDF furniture. Known for precise door alignment, smooth drawer runners, and high-gloss deco paint polish.',
    completedJobs: 1540,
    responseTimeMinutes: 8,
    certifications: [
      'TEVTA Master Woodworking Craftsman',
      'Chiniot Furniture Guild Member'
    ],
    portfolioImgs: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop&q=80'
    ],
    availableTimeSlots: ['09:00 AM', '12:00 PM', '03:00 PM', '05:30 PM']
  },
  {
    id: 'p14',
    name: 'Engr. Asadullah Khan',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    category: 'Solar Specialist',
    rating: 4.9,
    reviewsCount: 220,
    experienceYears: 7,
    distanceKm: 3.5,
    etaMinutes: 30,
    reliabilityScore: 99,
    cancellationRate: 0,
    basePrice: 2000,
    skills: ['On-Grid & Hybrid Solar Systems', 'Net Metering Approval', 'Lithium Battery Calibration', 'Structure Elevating & Solar Cleaning'],
    languages: ['Urdu', 'English', 'Pashto'],
    bio: 'PEC Registered Electrical Engineer specializing in 5kW to 50kW residential solar setups. Guarantees maximum daily generation units and clean neat wiring.',
    completedJobs: 480,
    responseTimeMinutes: 10,
    certifications: [
      'PEC Registered Electrical Engineer',
      'AEDB Certified Solar Installer (Category C1)'
    ],
    portfolioImgs: [
      'https://images.unsplash.com/photo-1509391365360-2e959784a276?w=400&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=400&auto=format&fit=crop&q=80'
    ],
    availableTimeSlots: ['10:00 AM', '02:00 PM', '05:00 PM']
  }
];

let bookings = [
  {
    id: 'b-past-1',
    provider: providers[0], // Bilal
    date: '2026-07-10',
    time: '11:30 AM',
    location: 'House 412, Block Y, DHA Phase 3, Lahore',
    basePrice: 800,
    serviceFee: 150,
    promoDiscount: 100,
    loyaltyDiscount: 50,
    total: 800,
    status: 'completed',
    category: 'Electrician',
    description: 'Fix tripping breaker in main distribution box',
    paymentMethod: 'Easypaisa',
    customerName: 'Fahad Taj',
    customerPhone: '0300-1234567'
  },
  {
    id: 'b-past-2',
    provider: providers[2], // Tariq
    date: '2026-06-25',
    time: '02:00 PM',
    location: 'House 412, Block Y, DHA Phase 3, Lahore',
    basePrice: 1500,
    serviceFee: 150,
    promoDiscount: 0,
    loyaltyDiscount: 50,
    total: 1600,
    status: 'completed',
    category: 'AC Technician',
    description: 'Inverter AC master chemical washing',
    paymentMethod: 'Cash on Delivery',
    customerName: 'Fahana Taj',
    customerPhone: '0300-1234567'
  }
];

let disputes = [
  {
    id: 'disp-1',
    bookingId: 'b-past-1',
    category: 'Overcharging',
    claimText: 'The technician charged Rs. 1500 when the app quoted Rs. 800 base Price.',
    estimatedPrice: 800,
    chargedPrice: 1500,
    status: 'resolved',
    refundRecommended: 700,
    decisionExplanation: 'Observation: Charged price exceeds scheduled invoice. Decision: Recalculate and recommend full refund of Rs. 700 to user wallet. Reliability score for Muhammad Bilal penalized by 1 point.',
    date: '2026-07-12'
  }
];

let notifications = [
  {
    id: 'n1',
    type: 'booking',
    title: 'Booking Confirmed!',
    content: 'Your appointment with Muhammad Bilal (Electrician) is scheduled for today at 04:30 PM.',
    timestamp: '10 mins ago',
    read: false
  },
  {
    id: 'n2',
    type: 'promo',
    title: 'Azadi Day Special Discount',
    content: 'Use promo code HUNAR14 to enjoy a flat 14% off on any home service this week.',
    timestamp: '2 hours ago',
    read: false
  },
  {
    id: 'n3',
    type: 'message',
    title: 'New message from Aisha',
    content: '"Assalam-o-Alaikum, I am packing my facial equipment and will arrive at your home on time."',
    timestamp: '1 day ago',
    read: true
  },
  {
    id: 'n4',
    type: 'system',
    title: 'Account Verification Successful',
    content: 'Your biometric verification has been synchronized and verified with Nadra datasets successfully.',
    timestamp: '3 days ago',
    read: true
  }
];

// Active booking pointer
let activeBookingId: string | null = null;

// ==========================================
// 3. API ENDPOINTS
// ==========================================

// GET ALL BASE DATA FOR SYNCING STATE
app.get('/api/data', (req, res) => {
  const activeBooking = bookings.find(b => b.id === activeBookingId && b.status !== 'completed') || null;
  const pastBookings = bookings.filter(b => b.status === 'completed' || b.id !== activeBookingId);
  
  res.json({
    providers,
    bookings,
    activeBooking,
    pastBookings,
    disputes,
    notifications
  });
});

// Helper function for local rule-based intent analysis fallback
function runRuleBasedAnalyzer(lowerText: string) {
  let category = 'Electrician';
  let urgency: 'Low' | 'Medium' | 'High' = 'Medium';
  let priority: 'Fastest' | 'Cheapest' | 'Best Rated' | 'Balanced' = 'Balanced';
  let reasoning = ['Lexical rules processed locally.', 'Mapped keywords against service dictionary.'];

  if (lowerText.includes('ac') || lowerText.includes('cooling') || lowerText.includes('thanda') || lowerText.includes('gas')) {
    category = 'AC Technician';
    urgency = 'High';
    priority = 'Fastest';
    reasoning.push('Matched thermal & HVAC descriptors.');
  } else if (lowerText.includes('leak') || lowerText.includes('pipe') || lowerText.includes('plumb') || lowerText.includes('water') || lowerText.includes('sink') || lowerText.includes('bathroom')) {
    category = 'Plumber';
    urgency = 'High';
    priority = 'Fastest';
    reasoning.push('Identified plumbing & piping issue.');
  } else if (lowerText.includes('makeup') || lowerText.includes('facial') || lowerText.includes('beauty') || lowerText.includes('parlor') || lowerText.includes('salon')) {
    category = 'Beautician';
    urgency = 'Low';
    priority = 'Best Rated';
    reasoning.push('Skincare/beauty service request registered.');
  } else if (lowerText.includes('tutor') || lowerText.includes('class') || lowerText.includes('math') || lowerText.includes('teacher') || lowerText.includes('study')) {
    category = 'Tutor';
    urgency = 'Medium';
    priority = 'Balanced';
    reasoning.push('Academic tutoring keywords detected.');
  } else if (lowerText.includes('driver') || lowerText.includes('car') || lowerText.includes('gaari') || lowerText.includes('drive')) {
    category = 'Driver';
    urgency = 'Medium';
    priority = 'Balanced';
    reasoning.push('Driver dispatch criteria matched.');
  } else if (lowerText.includes('ups') || lowerText.includes('wiring') || lowerText.includes('short') || lowerText.includes('power') || lowerText.includes('light') || lowerText.includes('lighten')) {
    category = 'Electrician';
    urgency = 'High';
    priority = 'Fastest';
    reasoning.push('Electrical fault descriptors matched.');
  }

  return {
    serviceType: category,
    urgency,
    priority,
    confidence: 95,
    language: 'Roman Urdu / English',
    reasoning
  };
}

// AGENT 1 & 2: INTENT UNDERSTANDING & MEMORY ORCHESTRATION AGENT
app.post('/api/chat', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Message text is required.' });
  }

  const lowerText = text.toLowerCase();

  // Memorable Providers Matching
  // Check user booking history for repeat request context (e.g., "same electrician", "send Bilal again", etc.)
  let repeatProvider: any = null;
  const isRepeatRequest = lowerText.includes('same') || lowerText.includes('dobara') || lowerText.includes('pichla') || lowerText.includes('bilal') || lowerText.includes('tariq');
  
  if (isRepeatRequest) {
    if (lowerText.includes('bilal')) {
      repeatProvider = providers.find(p => p.id === 'p1');
    } else if (lowerText.includes('tariq')) {
      repeatProvider = providers.find(p => p.id === 'p3');
    } else if (lowerText.includes('electrician') || lowerText.includes('ups') || lowerText.includes('breaker')) {
      const pastElectrician = bookings.find(b => b.category === 'Electrician');
      if (pastElectrician) repeatProvider = pastElectrician.provider;
    } else if (lowerText.includes('ac') || lowerText.includes('thanda')) {
      const pastAc = bookings.find(b => b.category === 'AC Technician');
      if (pastAc) repeatProvider = pastAc.provider;
    }
  }

  let parsedResult: any = null;

  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'PLACEHOLDER_KEY') {
    try {
      const ai = getAiClient();
      const prompt = `You are the core Intent Understanding Agent of HunarHub - Pakistan's premier on-demand service app.
Analyze the user's maintenance or salon request (which may be in English, Urdu, Roman Urdu, or a mix of languages).

User message: "${text}"

Your tasks:
1. Identify the 'serviceType'. It MUST be one of: "Electrician", "Beautician", "AC Technician", "Plumber", "Tutor", "Driver", "Carpenter", "Solar Specialist". If unsure, match the closest one.
2. Determine 'urgency': "Low", "Medium", or "High". Urgent issues like leakages, AC in high heat, or short circuits are High.
3. Determine 'priority': "Fastest", "Cheapest", "Best Rated", or "Balanced".
4. Determine the 'confidence' level (0-100) of your extraction.
5. Provide a short 3-step 'reasoning' array explaining how you parsed the intent (in English).
6. Detect language: "English", "Urdu", "Roman Urdu", or "Mixed".

Return ONLY a valid JSON object matching the following structure:
{
  "serviceType": "Electrician" | "Beautician" | "AC Technician" | "Plumber" | "Tutor" | "Driver",
  "urgency": "Low" | "Medium" | "High",
  "priority": "Fastest" | "Cheapest" | "Best Rated" | "Balanced",
  "confidence": number,
  "language": string,
  "reasoning": string[]
}
Do not include markdown tags like \`\`\`json or trailing characters.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });
      
      let responseText = (response.text || '').trim();
      if (responseText.startsWith('```json')) {
        responseText = responseText.replace(/^```json\s*/i, '').replace(/\s*```$/, '');
      } else if (responseText.startsWith('```')) {
        responseText = responseText.replace(/^```\s*/i, '').replace(/\s*```$/, '');
      }
      parsedResult = JSON.parse(responseText);
    } catch (geminiError: any) {
      console.warn("Gemini API call unavailable or returned error. Falling back to rule-based analyzer:", geminiError?.message || geminiError);
      parsedResult = runRuleBasedAnalyzer(lowerText);
    }
  } else {
    parsedResult = runRuleBasedAnalyzer(lowerText);
  }

  // Ensure parsedResult exists
  if (!parsedResult) {
    parsedResult = runRuleBasedAnalyzer(lowerText);
  }

  // Memory Agent integration: If a repeat provider is found and matches the service category, prioritize it!
  if (repeatProvider && repeatProvider.category === parsedResult.serviceType) {
    parsedResult.reasoning.push(`[Memory Agent] Detected repeat request. Automatically retrieving favorite/previous provider: ${repeatProvider.name}.`);
    parsedResult.prioritizedProviderId = repeatProvider.id;
  }

  res.json(parsedResult);
});

// AGENT 3 & 5: PROVIDER MATCHING AGENT WITH EXPLAINABLE AI REASONING
app.post('/api/match-providers', (req, res) => {
  const { serviceType, priority, prioritizedProviderId } = req.body;
  
  if (!serviceType) {
    return res.status(400).json({ error: 'serviceType is required for matching.' });
  }

  // Filter providers in same category
  const candidates = providers.filter(p => p.category.toLowerCase() === serviceType.toLowerCase());

  if (candidates.length === 0) {
    return res.json({ cheapest: [], fastest: [], bestRated: [], balanced: [], reasoning: "No providers matched." });
  }

  // Rank according to criteria
  const cheapest = [...candidates].sort((a, b) => a.basePrice - b.basePrice);
  const fastest = [...candidates].sort((a, b) => a.etaMinutes - b.etaMinutes);
  const bestRated = [...candidates].sort((a, b) => b.rating - a.rating);
  const balanced = [...candidates].sort((a, b) => b.reliabilityScore - a.reliabilityScore);

  // If a memory provider is explicitly prioritized, push it to the top of the 'balanced' array
  let matchedBalanced = [...balanced];
  if (prioritizedProviderId) {
    const pIdx = matchedBalanced.findIndex(p => p.id === prioritizedProviderId);
    if (pIdx > -1) {
      const [fav] = matchedBalanced.splice(pIdx, 1);
      matchedBalanced.unshift(fav);
    }
  }

  // Generate explicit Explainable AI reasoning payloads
  const selectedCheapest = cheapest[0];
  const selectedFastest = fastest[0];
  const selectedBest = bestRated[0];
  const selectedBalanced = matchedBalanced[0];

  const explainableAI = {
    cheapestReason: `Matched ${selectedCheapest.name} at Rs. ${selectedCheapest.basePrice} base rate. Selected as the most economical candidate to respect budget bounds.`,
    fastestReason: `Matched ${selectedFastest.name} located just ${selectedFastest.distanceKm}km away (ETA: ${selectedFastest.etaMinutes} mins). Recommended for high-urgency recovery.`,
    bestRatedReason: `Matched ${selectedBest.name} possessing a spotless ${selectedBest.rating}⭐ score across ${selectedBest.reviewsCount} reviews. Recommended for complex precision tasks.`,
    balancedReason: prioritizedProviderId 
      ? `Prioritizing your favorite repeat provider ${selectedBalanced.name} as requested, who holds a strong ${selectedBalanced.reliabilityScore}% reliability record.`
      : `Matched ${selectedBalanced.name} offering optimal tradeoffs with a high ${selectedBalanced.reliabilityScore}% reliability rating, ${selectedBalanced.experienceYears} Years Experience, and low ${selectedBalanced.cancellationRate}% cancellations.`
  };

  res.json({
    cheapest: cheapest,
    fastest: fastest,
    bestRated: bestRated,
    balanced: matchedBalanced,
    explanations: explainableAI
  });
});

// AGENT 4: DYNAMIC PRICING ENGINE AGENT
app.post('/api/calculate-price', (req, res) => {
  const { providerId, urgency, promoCode } = req.body;
  const provider = providers.find(p => p.id === providerId);
  
  if (!provider) {
    return res.status(404).json({ error: 'Provider not found.' });
  }

  const basePrice = provider.basePrice;
  const travelCost = Math.round(provider.distanceKm * 40 + 80); // Rs 40/km + base Rs 80
  const complexitySurcharge = provider.category === 'AC Technician' || provider.category === 'Beautician' ? 250 : 100;
  
  // Urgency multiplier
  const urgencySurcharge = urgency === 'High' ? 200 : urgency === 'Medium' ? 100 : 0;
  
  // Demand surge (simulating evening surge or hot weather)
  const hour = new Date().getHours();
  const demandSurge = (hour > 16 || hour < 9) ? 150 : 0;

  // Discounts
  const loyaltyDiscount = 50; // default loyal customer wallet bonus
  let promoDiscount = 0;
  let promoApplied = false;

  if (promoCode && (promoCode.trim().toUpperCase() === 'HUNAR14' || promoCode.trim().toUpperCase() === 'KHIDMAT14')) {
    promoDiscount = Math.round((basePrice + travelCost) * 0.14);
    promoApplied = true;
  }

  const subtotal = basePrice + travelCost + complexitySurcharge + urgencySurcharge + demandSurge;
  const total = Math.max(200, subtotal - loyaltyDiscount - promoDiscount);

  res.json({
    basePrice,
    travelCost,
    complexitySurcharge,
    urgencySurcharge,
    demandSurge,
    loyaltyDiscount,
    promoDiscount,
    promoApplied,
    subtotal,
    total
  });
});

// AGENT 7 & 5: BOOKING CREATION & SCHEDULING AGENT
app.post('/api/bookings', (req, res) => {
  const { providerId, date, timeSlot, location, pricingBreakdown, paymentMethod } = req.body;
  const provider = providers.find(p => p.id === providerId);

  if (!provider) {
    return res.status(404).json({ error: 'Provider not found.' });
  }

  // Prevent double booking: Verify if provider is still available for the slot
  if (!provider.availableTimeSlots.includes(timeSlot)) {
    return res.status(409).json({ 
      error: 'Scheduling Conflict', 
      message: `${provider.name} was just booked for ${timeSlot} slot. Please select another slot.` 
    });
  }

  // Scheduling Agent: Book provider and subtract the booked slot, plus allocate travel buffer
  provider.availableTimeSlots = provider.availableTimeSlots.filter(s => s !== timeSlot);

  const bookingId = `b-${Date.now().toString().slice(-6)}`;
  const newBooking = {
    id: bookingId,
    provider,
    date: date || new Date().toLocaleDateString(),
    time: timeSlot,
    location: location || 'House 412, Block Y, DHA Phase 3, Lahore',
    basePrice: pricingBreakdown.basePrice,
    serviceFee: pricingBreakdown.travelCost + pricingBreakdown.complexitySurcharge + pricingBreakdown.urgencySurcharge + pricingBreakdown.demandSurge,
    promoDiscount: pricingBreakdown.promoDiscount,
    loyaltyDiscount: pricingBreakdown.loyaltyDiscount,
    total: pricingBreakdown.total,
    status: 'confirmed',
    category: provider.category,
    description: `Dynamic on-demand assistance matching ${provider.category} expertise.`,
    paymentMethod: paymentMethod || 'Easypaisa',
    customerName: 'Fahad Taj',
    customerPhone: '0300-1234567'
  };

  bookings.push(newBooking);
  activeBookingId = bookingId;

  // Dispatch Notification Agent
  const newNotif = {
    id: `notif-${Date.now()}`,
    type: 'booking' as const,
    title: 'Booking Active!',
    content: `Scheduled with ${provider.name} at ${timeSlot}. Automated route buffers mapped successfully.`,
    timestamp: 'Just now',
    read: false
  };
  notifications.unshift(newNotif);

  res.status(201).json({
    booking: newBooking,
    notification: newNotif,
    message: 'Booking successfully generated by scheduling orchestrator.'
  });
});

// AGENT 8: TRACKING AGENT (Advance status or update position)
app.post('/api/bookings/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  const booking = bookings.find(b => b.id === id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found.' });
  }

  booking.status = status;

  // Push contextual notification when status shifts
  let notifText = '';
  if (status === 'assigned') notifText = `${booking.provider.name} is preparing logistics.`;
  if (status === 'en-route') notifText = `${booking.provider.name} has departed. GPRS estimated arrival in ${booking.provider.etaMinutes}m.`;
  if (status === 'arrived') notifText = `${booking.provider.name} has reached your gate. Verify his NADRA badge first.`;
  if (status === 'started') notifText = `Job has commenced. Material logging session active.`;
  if (status === 'completed') {
    notifText = `Service accomplished successfully. Total Rs. ${booking.total} paid via ${booking.paymentMethod}.`;
    booking.provider.completedJobs += 1;
    activeBookingId = null; // Free active pointer
  }

  const statusNotif = {
    id: `notif-${Date.now()}`,
    type: 'booking' as const,
    title: `Dispatch Update: ${status.toUpperCase()}`,
    content: notifText,
    timestamp: 'Just now',
    read: false
  };
  notifications.unshift(statusNotif);

  res.json({
    booking,
    notification: statusNotif
  });
});

// AGENT 10: FEEDBACK AGENT (Update reputation & rankings)
app.post('/api/submit-feedback', (req, res) => {
  const { providerId, rating, comment } = req.body;
  const provider = providers.find(p => p.id === providerId);

  if (!provider) {
    return res.status(404).json({ error: 'Provider not found.' });
  }

  // Recalculate average rating and reliability score
  const previousRatingTotal = provider.rating * provider.reviewsCount;
  provider.reviewsCount += 1;
  provider.rating = parseFloat(((previousRatingTotal + rating) / provider.reviewsCount).toFixed(1));

  // Feedback Agent: Adjust reliability and cancellation buffers based on five-star reviews
  if (rating >= 4) {
    provider.reliabilityScore = Math.min(100, provider.reliabilityScore + 1);
  } else {
    provider.reliabilityScore = Math.max(60, provider.reliabilityScore - 4);
  }

  const reviewId = `rev-${Date.now()}`;
  const mockReviewObj = {
    id: reviewId,
    authorName: 'Fahad Taj',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&auto=format&fit=crop&q=80',
    rating,
    date: new Date().toISOString().slice(0, 10),
    comment: comment || 'Clean, highly compliant experience.'
  };

  res.json({
    provider,
    review: mockReviewObj,
    message: 'Feedback successfully registered. Provider scorecard updated.'
  });
});

// AGENT 11: DISPUTE RESOLUTION AGENT (Examine claims, audit overcharge logs)
app.post('/api/create-dispute', (req, res) => {
  const { bookingId, category, claimText, chargedPrice } = req.body;
  const booking = bookings.find(b => b.id === bookingId);

  if (!booking) {
    return res.status(404).json({ error: 'Associated booking not found.' });
  }

  const estimatedPrice = booking.total;
  const difference = chargedPrice - estimatedPrice;
  let refundRecommended = 0;
  let explanation = '';

  // Dispute resolution logic comparison
  if (category === 'Overcharging' && difference > 0) {
    refundRecommended = difference;
    explanation = `Observation: App invoice estimate was Rs. ${estimatedPrice}, while provider charged Rs. ${chargedPrice}. Difference is Rs. ${difference}. Decision: Dispute approved. Auto-recommend full refund of Rs. ${difference} to customer wallet. Action: Penalizing provider ${booking.provider.name} reliability rating by 2%.`;
    booking.provider.reliabilityScore = Math.max(60, booking.provider.reliabilityScore - 2);
  } else if (category === 'No-show') {
    refundRecommended = estimatedPrice;
    explanation = `Observation: User flagged provider did not arrive for appointment slot. Decision: Full refund of Rs. ${estimatedPrice} recommended. Action: Penalizing provider ${booking.provider.name} reliability scorecard by 5% and suspension warning triggered.`;
    booking.provider.reliabilityScore = Math.max(50, booking.provider.reliabilityScore - 5);
  } else if (category === 'Poor quality') {
    refundRecommended = Math.round(estimatedPrice * 0.5);
    explanation = `Observation: Job quality feedback flagged as substandard. Decision: Partial 50% refund (Rs. ${refundRecommended}) recommended to facilitate correction works. Action: Provider has been notified for training guidelines.`;
  } else {
    explanation = `Observation: Complaint logs parsed successfully. No price discrepancy noted. Refund evaluated as Rs. 0. Direct operations escalation manager assigned for active feedback.`;
  }

  const disputeObj = {
    id: `disp-${Date.now().toString().slice(-4)}`,
    bookingId,
    category,
    claimText,
    estimatedPrice,
    chargedPrice,
    status: 'resolved',
    refundRecommended,
    decisionExplanation: explanation,
    date: new Date().toISOString().slice(0, 10)
  };

  disputes.unshift(disputeObj);

  res.json(disputeObj);
});

// MARK NOTIFICATIONS AS READ
app.post('/api/notifications/read', (req, res) => {
  const { id } = req.body;
  if (id === 'all') {
    notifications = notifications.map(n => ({ ...n, read: true }));
  } else {
    notifications = notifications.map(n => n.id === id ? { ...n, read: true } : n);
  }
  res.json({ status: 'ok', count: notifications.filter(n => !n.read).length });
});

// ADMIN ANALYTICS ENDPOINT FOR CHART RENDERING
app.get('/api/admin/analytics', (req, res) => {
  const totalBookings = bookings.length;
  const completedCount = bookings.filter(b => b.status === 'completed').length;
  const revenue = bookings.reduce((sum, b) => sum + b.total, 0);
  
  // Categorized bookings
  const categoriesMap: Record<string, number> = {};
  bookings.forEach(b => {
    categoriesMap[b.category] = (categoriesMap[b.category] || 0) + 1;
  });

  const ratingSum = providers.reduce((sum, p) => sum + p.rating, 0);
  const avgSatisfaction = parseFloat((ratingSum / providers.length).toFixed(2));

  res.json({
    totalBookings,
    completedCount,
    revenue,
    avgSatisfaction,
    categoryDistribution: Object.entries(categoriesMap).map(([name, value]) => ({ name, value })),
    providerPerformance: providers.map(p => ({ name: p.name, jobs: p.completedJobs, rating: p.rating, score: p.reliabilityScore }))
  });
});

// ==========================================
// 4. VITE MIDDLEWARE & STATIC SERVING
// ==========================================
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[HunarHub Backend Engine] Server active on http://localhost:${PORT}`);
  });
}

startServer();
