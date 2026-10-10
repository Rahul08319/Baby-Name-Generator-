import React, { useState, useRef } from 'react';
import { Gender, GenerationFilters } from '../types';
import { audioService } from '../services/audioService';

interface InputFormProps {
  onGenerate: (filters: GenerationFilters) => void;
  isLoading: boolean;
  initialFilters?: Partial<GenerationFilters>;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const POPULAR_CULTURES = [
  { label: '🌸 Japanese', value: 'Japanese' },
  { label: '🕉️ Sanskrit', value: 'Sanskrit' },
  { label: '☘️ Irish', value: 'Irish' },
  { label: '🏛️ Greek', value: 'Greek' },
  { label: '🇮🇹 Italian', value: 'Italian' },
  { label: '⚔️ Norse', value: 'Norse' },
  { label: '🥐 French', value: 'French' },
  { label: '🌙 Arabic', value: 'Arabic' },
  { label: '🌿 Celtic', value: 'Celtic' },
  { label: '📜 Latin', value: 'Latin' },
  { label: '🌺 Hawaiian', value: 'Hawaiian' },
];

const VIBES = [
  'All Vibes',
  'Ethereal & Zen',
  'Nature & Floral',
  'Celestial & Sky',
  'Royal & Timeless',
  'Modern Minimalist',
];

const GENDER_OPTIONS: { label: string; value: Gender; icon: string }[] = [
  { label: 'All', value: 'all', icon: '✨' },
  { label: 'Boy', value: 'boy', icon: '👦' },
  { label: 'Girl', value: 'girl', icon: '👧' },
  { label: 'Unisex', value: 'unisex', icon: '🌱' },
];

const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
  const [culture, setCulture] = useState<string>('Japanese');
  const [letter, setLetter] = useState<string>('A');
  const [gender, setGender] = useState<Gender>('all');
  const [vibe, setVibe] = useState<string>('All Vibes');
  const [count, setCount] = useState<number>(6);
  const [error, setError] = useState<string | null>(null);

  const alphabetScrollRef = useRef<HTMLDivElement>(null);

  const handleSelectLetter = (char: string) => {
    audioService.playTapSound();
    setLetter(char);
    setError(null);
  };

  const handleSelectCulture = (cult: string) => {
    audioService.playTapSound();
    setCulture(cult);
  };

  const handleSelectGender = (g: Gender) => {
    audioService.playTapSound();
    setGender(g);
  };

  const handleSelectVibe = (v: string) => {
    audioService.playTapSound();
    setVibe(v);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!culture.trim()) {
      setError('Please enter or select a culture/heritage.');
      return;
    }
    if (!letter || !/^[A-Za-z]$/.test(letter)) {
      setError('Please select a starting letter (A-Z).');
      return;
    }
    setError(null);
    audioService.playTapSound();
    onGenerate({
      culture: culture.trim(),
      letter: letter.toUpperCase(),
      gender,
      vibe: vibe === 'All Vibes' ? 'all' : vibe,
      count,
    });
  };

  return (
    <div className="relative rounded-3xl bg-white/80 backdrop-blur-2xl border border-black/5 p-6 sm:p-8 shadow-[0_16px_50px_rgba(0,0,0,0.06)] transition-all duration-300">
      
      {/* Subtle Specular Top Highlight */}
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Culture Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-800 tracking-tight flex items-center gap-1.5">
              <span>Culture &amp; Heritage</span>
            </label>
            <span className="text-xs text-gray-400 font-medium">Select or type custom</span>
          </div>

          {/* Quick Cultural Pills */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {POPULAR_CULTURES.map((item) => {
              const isSelected = culture.toLowerCase() === item.value.toLowerCase();
              return (
                <button
                  type="button"
                  key={item.value}
                  onClick={() => handleSelectCulture(item.value)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? 'bg-gray-900 text-white shadow-xs'
                      : 'bg-black/5 hover:bg-black/10 text-gray-700'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="relative">
            <input
              type="text"
              value={culture}
              onChange={(e) => setCulture(e.target.value)}
              placeholder="e.g. Japanese, Sanskrit, Gaelic, Yoruba, Nordic..."
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-2xl bg-black/[0.03] border border-black/10 focus:border-pink-500/80 focus:bg-white focus:ring-4 focus:ring-pink-500/15 text-gray-900 text-sm font-medium transition-all duration-200 placeholder-gray-400 outline-none"
            />
            {culture && (
              <button
                type="button"
                onClick={() => setCulture('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs font-semibold px-2 py-0.5 rounded-full hover:bg-black/5"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Interactive Alphabet A-Z Picker */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-gray-800 tracking-tight flex items-center gap-2">
              <span>Starting Letter</span>
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-pink-100 text-pink-700 font-bold text-xs">
                {letter}
              </span>
            </label>
            <span className="text-xs text-gray-400 font-medium">Scroll A–Z</span>
          </div>

          <div
            ref={alphabetScrollRef}
            className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none scroll-smooth snap-x"
          >
            {ALPHABET.map((char) => {
              const isSelected = letter === char;
              return (
                <button
                  type="button"
                  key={char}
                  onClick={() => handleSelectLetter(char)}
                  className={`flex-shrink-0 w-9 h-10 rounded-xl font-bold text-sm transition-all duration-200 snap-center active:scale-95 flex items-center justify-center ${
                    isSelected
                      ? 'bg-gradient-to-tr from-pink-500 to-rose-500 text-white shadow-sm scale-105'
                      : 'bg-black/[0.04] hover:bg-black/[0.08] text-gray-700'
                  }`}
                >
                  {char}
                </button>
              );
            })}
          </div>
        </div>

        {/* Apple Segmented Control for Gender & Vibe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Gender Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 tracking-tight mb-2">
              Gender Focus
            </label>
            <div className="grid grid-cols-4 p-1 rounded-2xl bg-black/[0.04] border border-black/5">
              {GENDER_OPTIONS.map((opt) => {
                const isSelected = gender === opt.value;
                return (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => handleSelectGender(opt.value)}
                    className={`py-2 px-1 text-xs font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-1 active:scale-95 ${
                      isSelected
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span>{opt.icon}</span>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Vibe Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 tracking-tight mb-2">
              Aesthetic Vibe
            </label>
            <div className="relative">
              <select
                value={vibe}
                onChange={(e) => handleSelectVibe(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl bg-black/[0.03] border border-black/10 focus:border-pink-500/80 focus:bg-white focus:ring-4 focus:ring-pink-500/15 text-gray-900 text-xs sm:text-sm font-medium transition-all duration-200 outline-none cursor-pointer appearance-none"
              >
                {VIBES.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
            </div>
          </div>

        </div>

        {/* Batch Count Pill Slider */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Results per Atelier Generation
          </span>
          <div className="flex items-center gap-1 bg-black/[0.04] p-1 rounded-xl">
            {[6, 9, 12].map((num) => (
              <button
                type="button"
                key={num}
                onClick={() => {
                  audioService.playTapSound();
                  setCount(num);
                }}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  count === num
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-center animate-fade-in">
            {error}
          </div>
        )}

        {/* Primary Apple Glass Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-600 hover:opacity-95 text-white font-bold text-base shadow-[0_12px_32px_rgba(244,63,94,0.35)] hover:shadow-[0_16px_40px_rgba(244,63,94,0.45)] active:scale-[0.99] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group overflow-hidden"
          >
            {/* Ambient Shine Overlay */}
            <span className="absolute inset-0 w-1/2 h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />

            {isLoading ? (
              <>
                <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="tracking-wide">Atelier AI Synthesizing...</span>
              </>
            ) : (
              <>
                <span className="text-lg">✨</span>
                <span className="tracking-wide">Discover {count} Exquisite Baby Names</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default InputForm;
