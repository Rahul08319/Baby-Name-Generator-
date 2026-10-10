import React from 'react';
import { BabyName } from '../types';
import { CURRENT_YEAR } from '../services/curatedNames';

interface CompareModalProps {
  names: [BabyName, BabyName] | null;
  onClose: () => void;
}

const CompareModal: React.FC<CompareModalProps> = ({ names, onClose }) => {
  if (!names) return null;
  const [first, second] = names;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-md animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.25)] border border-black/10 overflow-hidden z-10 my-8">
        
        {/* Header */}
        <div className="p-6 border-b border-black/5 flex items-center justify-between bg-gray-50/50">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Apple Atelier Comparison
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">
              {first.name} vs. {second.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 text-gray-700 transition-all active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Comparison Grid */}
        <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
          
          {/* Photos and Names Header */}
          <div className="grid grid-cols-2 gap-4 text-center">
            
            <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100 flex flex-col items-center">
              <img
                src={first.imageUrl}
                alt={first.name}
                className="w-20 h-20 rounded-2xl object-cover shadow-sm mb-3"
              />
              <h4 className="text-2xl font-bold text-gray-900">{first.name}</h4>
              <p className="text-xs font-mono text-gray-500">/{first.pronunciation}/</p>
              <span className="mt-2 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700">
                {first.origin} &bull; {first.gender}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex flex-col items-center">
              <img
                src={second.imageUrl}
                alt={second.name}
                className="w-20 h-20 rounded-2xl object-cover shadow-sm mb-3"
              />
              <h4 className="text-2xl font-bold text-gray-900">{second.name}</h4>
              <p className="text-xs font-mono text-gray-500">/{second.pronunciation}/</p>
              <span className="mt-2 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                {second.origin} &bull; {second.gender}
              </span>
            </div>

          </div>

          {/* Meaning Comparison */}
          <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/5">
            <h5 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 text-center">
              Significance &amp; Origin
            </h5>
            <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
              <p className="text-gray-700 font-medium leading-relaxed border-r border-black/5 pr-3">
                "{first.meaning}"
              </p>
              <p className="text-gray-700 font-medium leading-relaxed pl-1">
                "{second.meaning}"
              </p>
            </div>
          </div>

          {/* Matrix Attributes */}
          <div className="space-y-2 text-xs">
            
            {/* Syllables */}
            <div className="grid grid-cols-3 p-3 rounded-xl bg-gray-50 items-center text-center">
              <span className="font-bold text-gray-900">{first.syllables}</span>
              <span className="font-semibold text-gray-400 uppercase tracking-wider">Syllables</span>
              <span className="font-bold text-gray-900">{second.syllables}</span>
            </div>

            {/* Numerology */}
            <div className="grid grid-cols-3 p-3 rounded-xl bg-gray-50 items-center text-center">
              <span className="font-bold text-pink-600">#{first.numerologyNumber}</span>
              <span className="font-semibold text-gray-400 uppercase tracking-wider">Life Path</span>
              <span className="font-bold text-indigo-600">#{second.numerologyNumber}</span>
            </div>

            {/* Element */}
            <div className="grid grid-cols-3 p-3 rounded-xl bg-gray-50 items-center text-center">
              <span className="font-bold text-gray-800">{first.element}</span>
              <span className="font-semibold text-gray-400 uppercase tracking-wider">Element</span>
              <span className="font-bold text-gray-800">{second.element}</span>
            </div>

            {/* Zodiac */}
            <div className="grid grid-cols-3 p-3 rounded-xl bg-gray-50 items-center text-center">
              <span className="font-bold text-gray-800">{first.astrologySign}</span>
              <span className="font-semibold text-gray-400 uppercase tracking-wider">Zodiac Sign</span>
              <span className="font-bold text-gray-800">{second.astrologySign}</span>
            </div>

            {/* Popularity Rank */}
            <div className="grid grid-cols-3 p-3 rounded-xl bg-gray-50 items-center text-center">
              <span className="font-bold text-emerald-600">#{first.popularityTrend?.rank}</span>
              <span className="font-semibold text-gray-400 uppercase tracking-wider">{CURRENT_YEAR} Rank</span>
              <span className="font-bold text-emerald-600">#{second.popularityTrend?.rank}</span>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50/80 border-t border-black/5 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full bg-gray-900 text-white font-bold text-xs shadow-xs hover:bg-black transition-all active:scale-95"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
};

export default CompareModal;
