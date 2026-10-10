import React from 'react';
import { CURRENT_YEAR } from '../services/curatedNames';

interface YearTrendsBannerProps {
  onQuickInspiration: (culture: string, letter: string, vibe: string) => void;
}

const YearTrendsBanner: React.FC<YearTrendsBannerProps> = ({ onQuickInspiration }) => {
  const currentYear = CURRENT_YEAR;
  const nextYear = currentYear + 1;
  const centuryYear = currentYear - 100;

  return (
    <section className="mb-12">
      {/* Apple-style Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold tracking-wide uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Automated Yearly Trend Intelligence
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 font-sans">
            {currentYear} &amp; {nextYear} Name Horizon
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-1 max-w-xl">
            Continuously calibrated naming forecast combining historical 100-year revival cycles, cultural phonetics, and astrological alignments.
          </p>
        </div>
      </div>

      {/* Apple Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Bento Card 1: Current Year Trending Vibe */}
        <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-pink-500/10 via-rose-500/5 to-white p-6 border border-pink-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_12px_40px_rgba(244,63,94,0.12)] hover:-translate-y-0.5">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-pink-500 text-white font-bold text-base shadow-sm">
              🌟
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-pink-100 text-pink-700 border border-pink-200">
              {currentYear} Wave
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">
            Nature &amp; Ethereal Botanicals
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
            Names inspired by blooming flora, tranquil waters, and open skies are surging this year with high parent resonance.
          </p>
          <div className="mt-4 pt-4 border-t border-pink-100 flex flex-wrap gap-1.5">
            <button
              onClick={() => onQuickInspiration('Japanese', 'A', 'Nature & Floral')}
              className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-gray-700 border border-pink-200/60 shadow-xs transition-all active:scale-95"
            >
              🌸 Aoi (Japanese)
            </button>
            <button
              onClick={() => onQuickInspiration('Celtic', 'R', 'Nature & Floral')}
              className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-gray-700 border border-pink-200/60 shadow-xs transition-all active:scale-95"
            >
              🌿 Rowan (Celtic)
            </button>
          </div>
        </div>

        {/* Bento Card 2: Next Year Outlook (Dynamic coming year) */}
        <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-white p-6 border border-indigo-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_12px_40px_rgba(99,102,241,0.12)] hover:-translate-y-0.5">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-indigo-600 text-white font-bold text-base shadow-sm">
              🔮
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
              {nextYear} Forecast
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">
            Celestial &amp; Minimalist Single-Syllables
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
            Predictive modeling indicates soaring interest in crisp, celestial names with punchy global pronunciations.
          </p>
          <div className="mt-4 pt-4 border-t border-indigo-100 flex flex-wrap gap-1.5">
            <button
              onClick={() => onQuickInspiration('Greek', 'O', 'Celestial & Sky')}
              className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-gray-700 border border-indigo-200/60 shadow-xs transition-all active:scale-95"
            >
              ✨ Orion (Greek)
            </button>
            <button
              onClick={() => onQuickInspiration('Latin', 'N', 'Celestial & Sky')}
              className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-gray-700 border border-indigo-200/60 shadow-xs transition-all active:scale-95"
            >
              ⭐ Nova (Latin)
            </button>
          </div>
        </div>

        {/* Bento Card 3: The 100-Year Revival Cycle */}
        <div className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-white p-6 border border-amber-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_12px_40px_rgba(245,158,11,0.12)] hover:-translate-y-0.5">
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-amber-500 text-white font-bold text-base shadow-sm">
              ⏳
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
              {centuryYear} → {currentYear}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 tracking-tight">
            The Golden Century Revival
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
            Names popular exactly 100 years ago ({centuryYear}) enter their prime nostalgia return cycle, offering vintage royalty with modern flair.
          </p>
          <div className="mt-4 pt-4 border-t border-amber-100 flex flex-wrap gap-1.5">
            <button
              onClick={() => onQuickInspiration('Irish', 'M', 'Royal & Timeless')}
              className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-gray-700 border border-amber-200/60 shadow-xs transition-all active:scale-95"
            >
              👑 Maeve (Irish)
            </button>
            <button
              onClick={() => onQuickInspiration('Latin', 'F', 'Modern Minimalist')}
              className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/80 hover:bg-white text-gray-700 border border-amber-200/60 shadow-xs transition-all active:scale-95"
            >
              🍀 Felix (Latin)
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default YearTrendsBanner;
