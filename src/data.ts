import { Provider, AppNotification, Booking, FAQItem, ChatMessage, Review } from './types';

export const mockProviders: Provider[] = [
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

export const mockReviews: Review[] = [
  {
    id: 'r1',
    authorName: 'Hassan Shah',
    authorAvatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=80&auto=format&fit=crop&q=80',
    rating: 5,
    date: '2026-07-15',
    comment: 'Exceptional service! Bilal fixed our UPS wiring within 30 minutes. The AI reasoning was spot on about his quick ETA. Highly recommended.'
  },
  {
    id: 'r2',
    authorName: 'Mariam Fatima',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80',
    rating: 5,
    date: '2026-07-12',
    comment: 'Aisha is incredibly professional. She set up her sanitization gear first and did an amazing Hydra facial. Loved the convenience of home salon!'
  },
  {
    id: 'r3',
    authorName: 'Kamran Lodhi',
    authorAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=80',
    rating: 4,
    date: '2026-07-10',
    comment: 'Tariq cleaned my 1.5 ton inverter AC. The airflow is vastly improved, cooling is like new. He charged exactly what was quoted on the app.'
  }
];

export const mockNotifications: AppNotification[] = [
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

export const mockFAQs: FAQItem[] = [
  {
    question: 'How does the AI Booking Assistant work?',
    answer: 'You can simply type or speak your problem in plain Urdu, Roman Urdu, or English (e.g., "Mera ac thanda nahi kar raha aur pani leak ho raha hai"). Our proprietary agentic AI extracts the underlying issue, determines the urgency level, calculates prices based on local market rates, and filters providers in your exact neighborhood to recommend the absolute best matches.',
    category: 'booking'
  },
  {
    question: 'Are service providers verified?',
    answer: 'Absolutely. Every provider on HunarHub undergoes a rigorous multi-step verification process, including biometric NADRA Verification, physical home/shop checks, police character certificates, and a hands-on technical skill assessment by our master trainers.',
    category: 'providers'
  },
  {
    question: 'How do payments work in Pakistan?',
    answer: 'We support cashless convenience! You can securely pay via Easypaisa, JazzCash, Nayapay, or any Visa/Mastercard credit/debit card directly inside the app. For traditional users, Cash on Delivery (COD) is also available directly to the provider upon job completion.',
    category: 'payment'
  },
  {
    question: 'What if a provider damages my appliance?',
    answer: 'Every booking made through the HunarHub platform is fully insured up to PKR 50,000 by our Hunar-Guarantee Protection scheme. In the rare event of accidental damages, our technical disputes team conducts an immediate audit and processes repairs or replacements within 48 hours.',
    category: 'trust'
  }
];

export const mockChatHistory: ChatMessage[] = [
  {
    id: 'c1',
    sender: 'assistant',
    text: 'Assalam-o-Alaikum! I am your AI HunarHub Agent. Describe what you need help with today in Urdu, Roman Urdu, or English. \n\nFor example: *"Hamare ghar ka water pump on nahi ho raha"* or *"I need a professional bridal makeup at home next Friday."*',
    timestamp: '10:00 AM'
  }
];

export const mockBookingHistory: Booking[] = [
  {
    id: 'b-past-1',
    provider: mockProviders[0], // Bilal
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
    provider: mockProviders[2], // Tariq
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
    customerName: 'Fahad Taj',
    customerPhone: '0300-1234567'
  }
];
