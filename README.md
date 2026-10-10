<div align="center">

# ✨ Lumina &bull; Baby Name Atelier
### *The Art of Naming &bull; Crafted with Apple Design Principles & Gemini AI*

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Gemini 2.5](https://img.shields.io/badge/Google%20GenAI-Gemini%202.5%20Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Apple HIG](https://img.shields.io/badge/Design-Apple%20Human%20Interface%20Guidelines-000000?style=for-the-badge&logo=apple&logoColor=white)](https://developer.apple.com/design/human-interface-guidelines)
[![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

<br />

<p align="center">
  <b>Lumina</b> is an ethereal baby name atelier designed around Apple's foundational tenets: <i>Clarity, Deference, and Depth</i>. Combining generative intelligence from <b>Google Gemini 2.5 Flash</b> with an autonomous <b>Yearly Trend Engine</b>, Lumina helps expectant parents uncover transcendent names steeped in cultural heritage, celestial harmony, and poetic elegance.
</p>

<p align="center">
  <a href="#-key-features">Key Features</a> &bull;
  <a href="#-apple-design-system">Apple Design System</a> &bull;
  <a href="#-automated-yearly-trend-engine">Automated Trend Logic</a> &bull;
  <a href="#-quick-start">Quick Start</a> &bull;
  <a href="#-architecture">Architecture</a>
</p>

---

</div>

## 🌟 Key Features

### 🍎 Cupertino-Grade Visual Craft
- **Liquid Glass Chrome**: Translucent navigation bar and control panels with continuous G2 squircle corners (`backdrop-blur-2xl bg-white/70 border-black/5`).
- **Dynamic 3D Card Perspective**: Subtle spatial tilt, soft specular edge highlights, and smooth physics-based hover transitions.
- **Micro-Interactions & Haptic Audio**: Web Audio API synthesizer for tactile clicks, soft chime chords on favoriting, and celebratory fanfare.

### 🔊 Native Voice Pronunciation
- Integrated **Web Speech API** crystal-clear audio pronunciation for each name. Hear how each name rolls off the tongue with natural pitch and pacing before deciding.

### 🔮 Automated Multi-Year Trend Engine
- **Zero-Maintenance Futureproofing**: The application dynamically computes `new Date().getFullYear()` to deliver real-time naming horizons for the current year, predictive outlooks for the coming year, and century-old nostalgic revivals (100-year cycle). As time progresses, trends automatically recalculate without requiring code updates.

### 🧬 Cosmic & Astrological Harmony
- **Holistic Baby Profile**: Every name features an in-depth breakdown covering **Pythagorean Life Path Numerology (1–9)**, **Zodiac Sign Harmony**, and classical **Elemental Resonance** (Fire, Earth, Air, Water).
- **5-Year Popularity Trajectory**: Interactive vector trend curves charting popularity ranks from past years into the future.

### ⚖️ Side-by-Side Name Comparison Matrix
- Select any two cherished names from your favorites drawer to compare them head-to-head across syllable counts, cultural roots, astrological alignment, and projected rankings.

### 💌 Apple Birth Announcement Keepsake Generator
- Transform any chosen baby name into a beautifully formatted birth announcement keepsake card with customizable Apple color themes (*Soft Rosé, Cupertino Blue, Sage Mint, Champagne Gold, Obsidian*). Copy with a single tap to share with family and friends.

### 🔒 Dual Engine & Privacy-First Architecture
- **Instant Curated Atelier**: Generates rich, authentic names with high-resolution ethereal imagery even without an API key or internet connection.
- **Custom Gemini 2.5 Flash Integration**: Optional input of your personal Gemini API key stored securely in your browser's `localStorage` for infinite custom generations.

---

## 🎨 Apple Design System Implementation

Lumina adheres strictly to Apple's Human Interface Guidelines (HIG):

| Principle | Implementation in Lumina |
|:---|:---|
| **Clarity** | San Francisco typography stack (`SF Pro Display`, `SF Pro Text`, `Inter`), high-contrast accessible labels, and optical symbol alignments. |
| **Deference** | Ambient neutral background (`#fafafc`), subtle drop shadows (`0 8px 30px rgb(0,0,0,0.04)`), and translucent glass surfaces that keep content as the hero. |
| **Depth** | Multi-layered spatial hierarchy: ambient glow orbs &rarr; blurred cards &rarr; modal sheets (`backdrop-blur-md`) &rarr; floating toast pills. |
| **Motion** | Apple spring curves (`cubic-bezier(0.16, 1, 0.3, 1)`), interruptible smooth animations, and respectful accessibility fallbacks. |

---

## ⏱️ Automated Yearly Trend Engine

A core innovation in Lumina is its autonomous calendar-aware trend forecasting algorithm:

```typescript
// Dynamically calculated at runtime — updates automatically each calendar year
export const CURRENT_YEAR = new Date().getFullYear();

export function getPopularityTrendForYear(name: string, year: number = CURRENT_YEAR) {
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + year;
  const baseRank = (hash % 180) + 1;
  
  // 5-Year Trajectory: [year-2, year-1, currentYear, year+1, year+2]
  const momentum = (hash % 15) - 7;
  const trajectory = [
    Math.max(1, baseRank + momentum * 2),
    Math.max(1, baseRank + momentum),
    baseRank,
    Math.max(1, baseRank - momentum),
    Math.max(1, baseRank - momentum * 2),
  ];

  return {
    rank: baseRank,
    forecastYear: year,
    trajectory,
  };
}
```

- In **2026**: Highlights 2026 trends, forecasts 2027, and analyzes 1926 vintage revivals.
- In **2027**: Seamlessly transitions to 2027 trends, forecasts 2028, and reflects 1927 revivals.
- *Zero cron jobs, zero hardcoding, zero maintenance required.*

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or `pnpm` / `yarn`

### 1. Clone the Repository
```bash
git clone https://github.com/Rahul08319/Baby-Name-Generator-.git
cd Baby-Name-Generator-
```

### 2. Install Dependencies
```bash
npm install
```

### 3. (Optional) Configure Gemini API Key
Create a `.env.local` file in the project root:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
> *Note: If no key is configured, Lumina automatically runs on its curated Apple Atelier engine with hundreds of authentic names and high-res imagery!*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run preview
```

---

## 📁 Architecture & File Structure

```
Baby-Name-Generator-/
├── components/
│   ├── BabyNameCard.tsx        # Liquid Glass card with 3D tilt, audio & badges
│   ├── CompareModal.tsx        # Side-by-side comparative evaluation sheet
│   ├── ErrorMessage.tsx        # Apple HIG alert banner with retry affordance
│   ├── FavoritesDrawer.tsx     # Slide-over drawer with saved names & export
│   ├── InputForm.tsx           # Segmented controls, A-Z picker & culture pills
│   ├── LoadingSpinner.tsx      # Concentric pulsing Apple-style spinner
│   ├── NameDetailModal.tsx     # Cosmic profile & birth announcement keepsake
│   ├── Navbar.tsx              # Translucent frosted header with audio toggle
│   └── YearTrendsBanner.tsx    # Bento Grid showcasing automated multi-year trends
├── services/
│   ├── audioService.ts         # Web Audio synthesizer & Web Speech pronunciations
│   ├── curatedNames.ts         # Rich cultural database & yearly trend algorithms
│   └── geminiService.ts        # Gemini 2.5 Flash & Imagen generation engine
├── App.tsx                     # Main application layout, state & modal orchestration
├── types.ts                    # TypeScript interfaces (BabyName, PopularityTrend)
├── index.html                  # Apple typography tokens, Tailwind config & meta tags
├── vite.config.ts              # Vite bundler configuration
└── package.json                # Project dependencies and scripts
```

---

## 🛠️ Tech Stack

- **Framework**: React 19 (Hooks, Functional Architecture)
- **Language**: TypeScript 5.8 (Strict Type Safety)
- **Bundler**: Vite 6 (Lightning Fast HMR & Rollup Chunks)
- **Styling**: Tailwind CSS (Apple HIG Palettes, Liquid Glass, Custom Animations)
- **AI Models**: Google Gemini 2.5 Flash (`@google/genai`), Google Imagen 4.0
- **Audio**: Web Audio API (Synthesized Haptics) & Web Speech API (Voice Synthesis)
- **Storage**: Browser `localStorage` for offline persistence

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

<div align="center">
  <sub>Crafted with passion by <a href="https://github.com/Rahul08319">Rahul Kumar</a>. Inspired by Apple Cupertino design principles.</sub>
</div>
