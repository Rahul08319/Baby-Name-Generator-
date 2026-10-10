import React, { useState } from 'react';
import { BabyName } from '../types';
import { audioService } from '../services/audioService';
import { CURRENT_YEAR } from '../services/curatedNames';

interface NameDetailModalProps {
  nameItem: BabyName | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (babyName: BabyName) => void;
  onShare: (babyName: BabyName) => void;
}

type CardTheme = 'rose' | 'cupertino' | 'champagne' | 'mint' | 'obsidian';

const NameDetailModal: React.FC<NameDetailModalProps> = ({
  nameItem,
  onClose,
  isFavorite,
  onToggleFavorite,
  onShare,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'announcement'>('profile');
  const [cardTheme, setCardTheme] = useState<CardTheme>('rose');
  const [customSubtitle, setCustomSubtitle] = useState('Welcome to the World, Little Wonder');
  const [copiedAnnouncement, setCopiedAnnouncement] = useState(false);

  if (!nameItem) return null;

  const {
    name,
    meaning,
    origin,
    gender,
    pronunciation,
    syllables,
    vibe,
    imageUrl,
    popularityTrend,
    numerologyNumber,
    astrologySign,
    element,
    historicMeaning,
  } = nameItem;

  const handlePronounce = async () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    audioService.playTapSound();
    await audioService.pronounceName(name, origin);
    setIsPlayingAudio(false);
  };

  const handleCopyAnnouncement = () => {
    audioService.playSuccessChime();
    const text = `✨ Introducing our little blessing: ${name} ✨\nOrigin: ${origin}\nMeaning: "${meaning}"\nElement: ${element} | Zodiac: ${astrologySign}\nWith all our love.`;
    navigator.clipboard.writeText(text);
    setCopiedAnnouncement(true);
    setTimeout(() => setCopiedAnnouncement(false), 2500);
  };

  const themeClasses: Record<CardTheme, { bg: string; text: string; border: string }> = {
    rose: {
      bg: 'bg-gradient-to-br from-rose-100 via-pink-50 to-white',
      text: 'text-rose-900',
      border: 'border-rose-200',
    },
    cupertino: {
      bg: 'bg-gradient-to-br from-blue-100 via-indigo-50 to-white',
      text: 'text-blue-900',
      border: 'border-blue-200',
    },
    champagne: {
      bg: 'bg-gradient-to-br from-amber-100 via-yellow-50 to-white',
      text: 'text-amber-900',
      border: 'border-amber-200',
    },
    mint: {
      bg: 'bg-gradient-to-br from-emerald-100 via-teal-50 to-white',
      text: 'text-emerald-900',
      border: 'border-emerald-200',
    },
    obsidian: {
      bg: 'bg-gradient-to-br from-gray-950 via-gray-900 to-black',
      text: 'text-white',
      border: 'border-gray-800',
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-md animate-fade-in">
      
      {/* Backdrop click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Sheet Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.25)] border border-black/10 overflow-hidden z-10 my-8">
        
        {/* Header Hero Image */}
        <div className="relative w-full h-56 sm:h-64 bg-black/10 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 flex items-center justify-center w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Title and Pronunciation overlaid */}
          <div className="absolute bottom-4 left-6 right-6 text-white z-10 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                  {origin}
                </span>
                <span className="text-xs font-semibold opacity-80">
                  {gender.toUpperCase()}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans">
                {name}
              </h2>
              <p className="text-xs sm:text-sm font-mono opacity-85 mt-0.5">
                /{pronunciation}/ &bull; {syllables} {syllables === 1 ? 'syllable' : 'syllables'}
              </p>
            </div>

            {/* Pronounce Audio Button */}
            <button
              onClick={handlePronounce}
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white text-gray-900 font-bold text-xs shadow-lg hover:bg-pink-50 transition-all active:scale-95"
            >
              {isPlayingAudio ? (
                <span className="flex items-center gap-1">
                  <span className="w-1 h-3 bg-pink-600 animate-pulse" />
                  <span className="w-1 h-4 bg-pink-600 animate-pulse delay-75" />
                  <span className="w-1 h-2 bg-pink-600 animate-pulse delay-150" />
                  <span>Speaking...</span>
                </span>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-pink-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                  <span>Pronounce</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Segmented Navigation */}
        <div className="border-b border-black/5 bg-gray-50/50 p-2 flex gap-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'profile'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Name Profile &amp; Astrological Dynamics
          </button>
          <button
            onClick={() => setActiveTab('announcement')}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'announcement'
                ? 'bg-white text-pink-600 shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Announcement Card Keepsake
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          
          {activeTab === 'profile' ? (
            <>
              {/* Meaning Card */}
              <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                  Core Significance
                </h4>
                <p className="text-base text-gray-800 leading-relaxed font-medium">
                  {meaning}
                </p>
                {historicMeaning && (
                  <p className="text-xs text-gray-500 mt-2 italic leading-relaxed border-t border-black/5 pt-2">
                    {historicMeaning}
                  </p>
                )}
              </div>

              {/* Astrological, Numerology & Elemental Harmony */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Cosmic &amp; Vibrational Harmony
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  
                  <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-center">
                    <span className="text-xs text-indigo-500 font-semibold uppercase">Zodiac</span>
                    <div className="text-base font-bold text-indigo-950 mt-0.5">
                      {astrologySign}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-pink-50/60 border border-pink-100 text-center">
                    <span className="text-xs text-pink-500 font-semibold uppercase">Life Path #</span>
                    <div className="text-base font-bold text-pink-950 mt-0.5">
                      {numerologyNumber}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-center">
                    <span className="text-xs text-emerald-500 font-semibold uppercase">Element</span>
                    <div className="text-base font-bold text-emerald-950 mt-0.5">
                      {element}
                    </div>
                  </div>

                </div>
              </div>

              {/* 5-Year Dynamic Popularity Trajectory Chart */}
              {popularityTrend && (
                <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        {CURRENT_YEAR} Trajectory &amp; Future Forecast
                      </h4>
                      <p className="text-xs text-gray-600 font-medium">
                        Rank #{popularityTrend.rank} ({popularityTrend.trend.toUpperCase()})
                      </p>
                    </div>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                      +{popularityTrend.changePercent}% Multi-Year Surge
                    </span>
                  </div>

                  {/* SVG Line Graph */}
                  <div className="h-28 w-full pt-4">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 400 80">
                      <line x1="0" y1="70" x2="400" y2="70" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
                      
                      {/* Trajectory points */}
                      {popularityTrend.trajectory.map((val, idx) => {
                        const x = (idx / 4) * 380 + 10;
                        const min = Math.min(...popularityTrend.trajectory);
                        const max = Math.max(...popularityTrend.trajectory, min + 1);
                        const y = 65 - ((val - min) / (max - min)) * 50;
                        const yr = CURRENT_YEAR - 2 + idx;

                        return (
                          <g key={yr}>
                            <circle cx={x} cy={y} r="4" fill="#ec4899" stroke="#fff" strokeWidth="2" />
                            <text x={x} y="78" textAnchor="middle" fontSize="10" fill="#9ca3af" fontWeight="600">
                              {yr}
                            </text>
                            <text x={x} y={y - 8} textAnchor="middle" fontSize="9" fill="#1f2937" fontWeight="bold">
                              #{val}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Announcement Card Keepsake Generator */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500 uppercase">Card Palette Theme</span>
                <div className="flex gap-1.5">
                  {(['rose', 'cupertino', 'champagne', 'mint', 'obsidian'] as CardTheme[]).map((thm) => (
                    <button
                      key={thm}
                      onClick={() => setCardTheme(thm)}
                      className={`w-6 h-6 rounded-full border-2 transition-all ${
                        thm === 'rose' ? 'bg-rose-400' :
                        thm === 'cupertino' ? 'bg-blue-500' :
                        thm === 'champagne' ? 'bg-amber-400' :
                        thm === 'mint' ? 'bg-emerald-400' : 'bg-gray-900'
                      } ${cardTheme === thm ? 'border-gray-900 scale-110 shadow-xs' : 'border-transparent'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Keepsake Visual Card */}
              <div className={`p-8 rounded-3xl border text-center shadow-lg transition-all ${themeClasses[cardTheme].bg} ${themeClasses[cardTheme].border}`}>
                <p className="text-xs uppercase tracking-widest font-bold opacity-75 mb-2">
                  Birth Announcement Keepsake
                </p>
                <h3 className={`text-4xl font-extrabold tracking-tight ${themeClasses[cardTheme].text}`}>
                  {name}
                </h3>
                <p className="text-xs font-mono opacity-80 mt-1">
                  /{pronunciation}/ &bull; {origin}
                </p>
                <div className="w-12 h-0.5 bg-current mx-auto my-4 opacity-30" />
                <p className={`text-sm italic font-medium max-w-md mx-auto ${themeClasses[cardTheme].text}`}>
                  "{meaning}"
                </p>
                <p className="text-xs mt-4 opacity-75 font-semibold">
                  {customSubtitle}
                </p>
              </div>

              <div className="flex justify-center pt-2">
                <button
                  onClick={handleCopyAnnouncement}
                  className="px-6 py-2.5 rounded-full bg-gray-900 text-white text-xs font-bold shadow-md hover:bg-black transition-all active:scale-95 flex items-center gap-1.5"
                >
                  {copiedAnnouncement ? '✨ Copied Keepsake Text!' : '📋 Copy Announcement Text'}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-gray-50/80 border-t border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(nameItem)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-xs transition-all active:scale-95 ${
                isFavorite
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-black/5 hover:bg-black/10 text-gray-700'
              }`}
            >
              <span>{isFavorite ? '❤️ Favorited' : '🤍 Add Favorite'}</span>
            </button>
            <button
              onClick={() => onShare(nameItem)}
              className="px-4 py-2 rounded-full bg-black/5 hover:bg-black/10 text-gray-700 font-semibold text-xs transition-all active:scale-95"
            >
              Share Name
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-gray-900 text-white text-xs font-bold shadow-xs hover:bg-black transition-all active:scale-95"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};

export default NameDetailModal;
