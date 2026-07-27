# HunarHub — Agentic Local Service Marketplace for Pakistan 🇵🇰

[![Live App](https://img.shields.io/badge/Live%20Demo-hunar--hub--tau.vercel.app-emerald?style=for-the-badge&logo=vercel)](https://hunar-hub-tau.vercel.app/)
[![Stack](https://img.shields.io/badge/Stack-React%20%7C%20TypeScript%20%7C%20Express%20%7C%20Tailwind-blue)](https://react.dev)
[![AI Engine](https://img.shields.io/badge/AI%20Engine-Gemini%203.6%20Flash-orange)](https://ai.google.dev)
[![Database](https://img.shields.io/badge/Database-Firebase%20Firestore-yellow)](https://firebase.google.com)

🌐 **Live Deployed Application**: [https://hunar-hub-tau.vercel.app/](https://hunar-hub-tau.vercel.app/)

**HunarHub** (ہنر ہب) is an AI-powered, agentic local service marketplace built specifically for South Asian urban centers (Lahore, Karachi, Islamabad). It connects households and businesses with trusted, NADRA-verified skilled professionals—electricians, AC mechanics, plumbers, beauticians, tutors, drivers, carpenters, and solar specialists.

---

## 🌟 1. Overview & Real Problem Solved

### The Problem
Finding reliable home service technicians in Pakistan has traditionally been chaotic, fragmented, and unsafe:
- **Language & Query Barriers**: Customers describe problems in mixed Roman Urdu ("*AC thanda nahi kar raha, gas leaking lagti hai*") or regional dialects, which standard search filters fail to parse.
- **Price Opacity & Overcharging**: Absence of transparent upfront diagnostic estimates leads to frequent billing disputes.
- **Trust & Safety Concerns**: Absence of verifiable background checks makes inviting strangers into homes stressful.
- **Unreliable Scheduling**: No real-time ETA tracking or structured booking history.

### The Solution
HunarHub solves these challenges through an **Agentic Multi-Agent System**:
1. **Urdu-Fluent Intent Understanding Agent**: Conversational AI parses natural language requests in English, Urdu, or Roman Urdu and extracts technical service specs instantly.
2. **Automated NADRA & Police Verification Agent**: Cross-checks technician biometric records and police character clearance.
3. **Transparent Price & Matching Engine**: Ranks top candidates by proximity, reliability score, and transparent rates.
4. **AI Dispute & Overcharge Arbitrator**: Automatically evaluates customer claims against provider diagnostic logs to recommend fair refunds.

---

## 🚀 2. Complete Features List

### 🤖 1. AI Booking Assistant (ChatGPT-Style Interface)
- **Natural Language Parsing**: Accepts complex descriptions in English or Roman Urdu.
- **Prompt Suggestions Bar**: Convenient suggested prompt chips positioned directly **below the chat input box** (*UPS Checkup, AC Repair, Pipe Repair, Beauty Spa, Math Tutor, Chauffeur*) for one-tap execution.
- **Live Agentic Reasoning Feed**: Transparent step-by-step trace showing intent extraction, memory recall, and confidence metrics.
- **Memory Recall Agent**: Identifies repeat service requests (*e.g., "send Bilal electrician again"*) and automatically retrieves prior technicians.

### 🔍 2. Provider Discovery & Category Directory
- **Multi-Category Coverage**: Electricians, AC Technicians, Plumbers, Beauticians, Home Tutors, Drivers, Carpenters, and Solar Specialists.
- **Interactive Search & Filters**: Search by technician name, specific skill (*e.g., "Inverter PCB", "3-Phase Wiring"*), city, or rating.
- **Rich Provider Profiles**: View completed job counts, cancellation rates, verification badges, portfolio photos, and available time slots.

### 📊 3. Active Operations & Real-Time Dispatch Dashboard
- **Live ETA Counter**: Dynamic arrival countdown with interactive location visualization.
- **Direct Contact Simulation**: One-tap phone calls and SMS messaging with assigned technicians.
- **Booking Timeline**: Step-by-step progress tracking from *Accepted* to *In-Transit*, *Work In Progress*, and *Completed*.

### 🛡️ 4. Trust, Security & NADRA Verification Hub
- **Biometric Check Synchronization**: View NADRA biometric clearance status and police record badges.
- **Reliability & Cancellation Ratings**: Real-time mathematical scoring based on historical job compliance.

### ⚖️ 5. AI Dispute Resolution Center
- **Automated Claim Arbitrator**: Submit dispute claims (*e.g., overcharging or incomplete work*).
- **Impartial AI Decision Engine**: Compares customer claim notes against app estimates and generates instant binding recommendations and partial refund advice.

### 🔔 6. Notifications & Firebase Cloud Data Persistence
- **Firestore Synchronization**: Real-time persistence for users, bookings, providers, and review collections.
- **Notification Feed**: Live alerts for promo codes, system verifications, and technician updates.

---

## 🧠 3. The AI Feature & System Prompt

The core intelligence behind HunarHub is driven by the **Intent Understanding & Context Extraction Agent**, powered by Google's **Gemini 3.6 Flash** model via the `@google/genai` TypeScript SDK.

### How It Works
When a user types or clicks a suggested prompt, the server-side proxy endpoint (`/api/chat`) executes the Gemini model with a structured system prompt. It extracts:
- **`serviceType`**: Mapped strictly to verified categories (`Electrician`, `Beautician`, `AC Technician`, `Plumber`, `Tutor`, `Driver`, `Carpenter`, `Solar Specialist`).
- **`urgency`**: Evaluates problem severity (`High` for electrical faults/leaks, `Medium`, `Low`).
- **`priority`**: Classifies user preference (`Fastest`, `Cheapest`, `Best Rated`, or `Balanced`).
- **`confidence`**: Statistical accuracy score (0-100%).
- **`reasoning`**: 3-step explanation of the diagnostic logic.

### Exact Server System Prompt

```typescript
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
  "serviceType": "Electrician" | "Beautician" | "AC Technician" | "Plumber" | "Tutor" | "Driver" | "Carpenter" | "Solar Specialist",
  "urgency": "Low" | "Medium" | "High",
  "priority": "Fastest" | "Cheapest" | "Best Rated" | "Balanced",
  "confidence": number,
  "language": string,
  "reasoning": string[]
}
Do not include markdown tags like \`\`\`json or trailing characters.`;
```

---

## 🛠️ 4. Tools, Services, & AI Models Used

| Layer | Technology / Tool | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18 + Vite + TypeScript | Modern, high-performance single page application |
| **Styling & UI** | Tailwind CSS + Lucide React | Clean, accessible design system with responsive dark/light modes |
| **Motion & Animations** | Motion (`motion/react`) | Fluid layout transitions and tab switching |
| **AI SDK & Model** | `@google/genai` (`gemini-3.6-flash`) | Fast, structured JSON multimodal reasoning with server-side proxying |
| **Backend Server** | Express.js + `tsx` / `esbuild` | RESTful API endpoints for chat, matching, bookings, and sync |
| **Database & Auth** | Firebase Firestore + Firebase Auth | Durable cloud data persistence for real-time app state |
| **Asset Imagery** | Unsplash HD Imagery | High-resolution photography for provider profiles and portfolio galleries |

---

## 📸 5. Screenshots & Visual Walkthrough

### 1. AI Booking Assistant & Suggested Prompts
*The AI Agentic chat window featuring suggested prompt chips conveniently located directly below the input text box for instant query submission.*

```
+-----------------------------------------------------------------------+
|  HunarHub AI Agentic Assistant                            [● Online]  |
+-----------------------------------------------------------------------+
|  🤖 HunarHub AI: "Assalam-o-Alaikum! What service do you need?"       |
|  👤 User: "My UPS is beep-tripping when electricity cuts off."        |
|  🤖 HunarHub AI: "Parsed intent: Service = Electrician, Urgency = High"|
+-----------------------------------------------------------------------+
|  [ 🎤 ]  Type your maintenance issue in Urdu/English...    [ Send → ] |
+-----------------------------------------------------------------------+
|  ✨ SUGGESTED PROMPTS                                                 |
|  [ ⚡ UPS Checkup ]   [ ❄️ AC Repair ]     [ 🚰 Pipe Repair ]          |
|  [ 💄 Beauty Spa ]   [ 📚 Math Tutor ]    [ 🚗 Chauffeur ]            |
+-----------------------------------------------------------------------+
```

### 2. Verified Provider Directory
*Browse verified technicians with clear badges, hourly rates, experience years, and real-time category filtering.*

```
+-----------------------------------------------------------------------+
| Categories: [All] [Electrician] [AC Technician] [Plumber] [Beautician]|
+-----------------------------------------------------------------------+
|  [Photo]  Muhammad Bilal  ⭐ 4.9 (142 reviews)      [✔ NADRA VERIFIED]|
|           Electrician • 8 yrs exp. • PKR 800/hr                       |
|           Skills: UPS Repair, DB Wiring, Short Circuit Detection      |
|           [ View Profile & Book ]                                     |
+-----------------------------------------------------------------------+
```

### 3. Real-Time Operations & Active Dispatch
*Track active provider ETA countdowns, simulate direct phone calls, and manage booking progress.*

```
+-----------------------------------------------------------------------+
|  ACTIVE SERVICE DISPATCH #b-101                                        |
|  Technician: Muhammad Bilal (Electrician)                              |
|  Estimated Arrival: 15 mins  ● Status: In-Transit                     |
|  [ 📞 Call Provider ]   [ 💬 Send Message ]   [ 📍 Live Map ]         |
+-----------------------------------------------------------------------+
```

---

## ⚙️ 6. How to Run the Project

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm** or **bun** package manager

### Step-by-Step Setup

1. **Clone or Open the Repository**:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Configure Environment Variables**:
   Create a `.env` file in the root directory (refer to `.env.example`):
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The application will start on `http://localhost:3000`.

5. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

*Built with ❤️ for Pakistan using React, TypeScript, Express, Firebase, and Gemini AI.*
