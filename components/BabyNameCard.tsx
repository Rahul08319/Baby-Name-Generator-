import React, { useState } from 'react';
import { BabyName } from '../types';
import { audioService } from '../services/audioService';

interface BabyNameCardProps {
  babyName: BabyName;
  isFavorite: boolean;
  onToggleFavorite: (babyName: BabyName) => void;
  onShare: (babyName: BabyName) => void;
  onInspect: (babyName: BabyName) => void;
}

const BabyNameCard: React.FC<BabyNameCardProps> = ({
  babyName,
  isFavorite,
  onToggleFavorite,
  onShare,
  onInspect,
}) => {
  const { name, meaning, origin, gender, pronunciation, syllables, vibe, imageUrl, popularityTrend } = babyName;
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePronounce = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    audioService.playTapSound();
    await audioService.pronounceName(name, origin);
    setIsPlayingAudio(false);
  };

  const handleFavClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isFavorite) {
      audioService.playFavoriteChime();
    } else {
      audioService.playTapSound();
    }
    onToggleFavorite(babyName);
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    audioService.playTapSound();
    onShare(babyName);
  };

  return (
    <div
      onClick={() => onInspect(babyName)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white/80 backdrop-blur-2xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
    >
      {/* Specular Highlight along top edge */}
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none z-20" />

      {/* Media & Action Bar Container */}
      <div className="relative w-full h-52 overflow-hidden bg-black/5">
        
        {/* Card Image */}
        <img
          src={imageUrl}
          alt={`Artistic representation of ${name}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle Ambient Gradient Tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-wrap items-center gap-1.5">
          <span className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-white/90 backdrop-blur-md text-gray-800 shadow-xs border border-white/40">
            {origin}
          </span>
          <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full backdrop-blur-md shadow-xs border border-white/40 ${
            gender === 'boy'
              ? 'bg-blue-500/85 text-white'
              : gender === 'girl'
              ? 'bg-pink-500/85 text-white'
              : 'bg-emerald-500/85 text-white'
          }`}>
            {gender === 'boy' ? 'Boy 👦' : gender === 'girl' ? 'Girl 👧' : 'Unisex 🌱'}
          </span>
        </div>

        {/* Top Right Floating Actions */}
        <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5">
          {/* Pronounce Voice Button */}
          <button
            type="button"
            onClick={handlePronounce}
            aria-label={`Listen to pronunciation of ${name}`}
            title="Hear Pronunciation"
            className={`flex items-center justify-center w-8 h-8 rounded-full backdrop-blur-md transition-all duration-200 active:scale-90 ${
              isPlayingAudio
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white/80 hover:bg-white text-gray-700 shadow-xs'
            }`}
          >
            {isPlayingAudio ? (
              <span className="flex items-center gap-0.5">
                <span className="w-0.5 h-3 bg-white animate-pulse" />
                <span className="w-0.5 h-4 bg-white animate-pulse delay-75" />
                <span className="w-0.5 h-2 bg-white animate-pulse delay-150" />
              </span>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleShareClick}
            aria-label={`Share ${name}`}
            title="Share Baby Name"
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-700 backdrop-blur-md shadow-xs transition-all duration-200 active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>

          {/* Favorite Heart Button */}
          <button
            type="button"
            onClick={handleFavClick}
            aria-label={isFavorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
            title={isFavorite ? "Favorited" : "Add to Favorites"}
            className={`flex items-center justify-center w-8 h-8 rounded-full backdrop-blur-md transition-all duration-200 active:scale-90 ${
              isFavorite
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-white/80 hover:bg-white text-gray-600 shadow-xs'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 transition-transform duration-200 ${isFavorite ? 'fill-white stroke-white scale-110' : 'stroke-current'}`}
              viewBox="0 0 24 24"
              fill={isFavorite ? "currentColor" : "none"}
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Bottom Image Overlay Info */}
        <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-white/95">
          <div className="text-xs font-mono font-medium tracking-wider opacity-90">
            /{pronunciation}/
          </div>
          <div className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
            {syllables} {syllables === 1 ? 'syllable' : 'syllables'}
          </div>
        </div>

      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Name & Dynamic Trend */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-pink-600 transition-colors">
              {name}
            </h3>
            {popularityTrend && (
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                popularityTrend.trend === 'rising'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                  : 'bg-indigo-50 text-indigo-700 border border-indigo-200/60'
              }`}>
                #{popularityTrend.rank} in {popularityTrend.forecastYear}
              </span>
            )}
          </div>

          {/* Meaning Description */}
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {meaning}
          </p>
        </div>

        {/* Card Footer Details */}
        <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-xs text-gray-500 font-medium">
          <span className="flex items-center gap-1 text-gray-400">
            <span>✨</span>
            <span className="text-gray-600">{vibe || 'Timeless'}</span>
          </span>
          <span className="text-pink-600 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
            Explore Details &rarr;
          </span>
        </div>

      </div>
    </div>
  );
};

export default BabyNameCard;