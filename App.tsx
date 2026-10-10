import React, { useState, useCallback, useEffect } from 'react';
import { generateBabyNames } from './services/geminiService';
import { BabyName, GenerationFilters } from './types';
import { audioService } from './services/audioService';
import { CURRENT_YEAR, queryCuratedNames } from './services/curatedNames';

import Navbar from './components/Navbar';
import YearTrendsBanner from './components/YearTrendsBanner';
import InputForm from './components/InputForm';
import BabyNameCard from './components/BabyNameCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import NameDetailModal from './components/NameDetailModal';
import FavoritesDrawer from './components/FavoritesDrawer';
import CompareModal from './components/CompareModal';
import SettingsModal from './components/SettingsModal';

const App: React.FC = () => {
  const [names, setNames] = useState<BabyName[]>([]);
  const [favorites, setFavorites] = useState<BabyName[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals & Drawers state
  const [selectedInspectName, setSelectedInspectName] = useState<BabyName | null>(null);
  const [comparePair, setComparePair] = useState<[BabyName, BabyName] | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(audioService.isSoundEnabled());

  // Active filter for generated results view
  const [activeGenderView, setActiveGenderView] = useState<'all' | 'boy' | 'girl' | 'unisex'>('all');

  // Load initial favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lumina_favorite_names');
      if (saved) {
        setFavorites(JSON.parse(saved));
      } else {
        // Seed with a couple default favorites for great first impression
        const initialSeed = queryCuratedNames('Japanese', 'A', 'all', 'all', 2);
        setFavorites(initialSeed);
      }
    } catch (err) {
      console.error("Failed to load favorites", err);
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('lumina_favorite_names', JSON.stringify(favorites));
    } catch (err) {
      console.error("Failed to save favorites", err);
    }
  }, [favorites]);

  // Load default featured names on mount
  useEffect(() => {
    const defaultCurated = queryCuratedNames('Japanese', 'A', 'all', 'all', 6);
    setNames(defaultCurated);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleSound = () => {
    const nextState = audioService.toggleSound();
    setIsSoundOn(nextState);
    showToast(nextState ? '🔔 Interface Audio Enabled' : '🔕 Interface Audio Muted');
  };

  const handleGenerate = useCallback(async (filters: GenerationFilters) => {
    setIsLoading(true);
    setError(null);

    try {
      const results = await generateBabyNames(filters);
      setNames(results);
      audioService.playSuccessChime();
      showToast(`✨ Generated ${results.length} names for ${filters.culture} (${filters.letter})`);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An error occurred during name generation.');
      // Fallback seamlessly to curated database
      const fallback = queryCuratedNames(filters.culture, filters.letter, filters.gender, filters.vibe, filters.count);
      setNames(fallback);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleToggleFavorite = useCallback((babyName: BabyName) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.name.toLowerCase() === babyName.name.toLowerCase());
      if (exists) {
        showToast(`Removed "${babyName.name}" from favorites`);
        return prev.filter(f => f.name.toLowerCase() !== babyName.name.toLowerCase());
      } else {
        showToast(`❤️ Added "${babyName.name}" to favorites`);
        return [...prev, babyName];
      }
    });
  }, []);

  const handleShare = useCallback(async (babyName: BabyName) => {
    const text = `🍼 Check out this baby name from Lumina: ${babyName.name} (${babyName.origin})! It means "${babyName.meaning}". Forecast rank #${babyName.popularityTrend?.rank} in ${CURRENT_YEAR}.`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${babyName.name} - Baby Name Idea`,
          text: text,
        });
      } catch {
        // User dismissed share dialog
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        showToast('📋 Copied name details to clipboard!');
      } catch {
        showToast('Unable to copy to clipboard.');
      }
    }
  }, []);

  const handleQuickInspiration = (cult: string, lettr: string, vib: string) => {
    audioService.playTapSound();
    handleGenerate({
      culture: cult,
      letter: lettr,
      gender: 'all',
      vibe: vib,
      count: 6,
    });
  };

  const handleStartCompare = (n1: BabyName, n2: BabyName) => {
    setComparePair([n1, n2]);
  };

  // Filter currently displayed names by gender pill if selected
  const filteredDisplayNames = names.filter(n => {
    if (activeGenderView === 'all') return true;
    return n.gender === activeGenderView || n.gender === 'unisex';
  });

  return (
    <div className="min-h-screen bg-[#fafafc] text-[#1d1d1f] font-sans antialiased selection:bg-pink-500 selection:text-white flex flex-col justify-between">
      
      {/* Background Ambient Glow Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-pink-300/20 blur-3xl" />
        <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-indigo-300/20 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-amber-200/20 blur-3xl" />
      </div>

      {/* Apple Liquid Glass Navbar */}
      <Navbar
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        isSoundOn={isSoundOn}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-1 w-full">
        
        {/* Apple Hero Title & Subtitle */}
        <section className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.04] border border-black/5 text-gray-700 text-xs font-semibold tracking-wide mb-4 shadow-2xs backdrop-blur-md">
            <span>🍎 Apple Design Aesthetics</span>
            <span className="w-1 h-1 rounded-full bg-gray-400" />
            <span>✨ Gemini 2.5 Flash</span>
            <span className="w-1 h-1 rounded-full bg-gray-400" />
            <span className="text-pink-600 font-bold">{CURRENT_YEAR} Ready</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 font-sans leading-[1.1]">
            Find the Name That <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-pink-600 via-rose-500 to-indigo-600 bg-clip-text text-transparent">
              Echoes Through Generations
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Discover transcendent baby names crafted with Apple-grade clarity and depth. Powered by cultural etymology, astrological resonance, and dynamic trend forecasting for {CURRENT_YEAR} and {CURRENT_YEAR + 1}.
          </p>
        </section>

        {/* Dynamic Coming Years Trend Bento Grid */}
        <YearTrendsBanner onQuickInspiration={handleQuickInspiration} />

        {/* Apple HIG Input Control Panel */}
        <section className="max-w-4xl mx-auto mb-14">
          <InputForm onGenerate={handleGenerate} isLoading={isLoading} />
        </section>

        {/* Generation Results Section */}
        <section className="max-w-7xl mx-auto">
          
          {/* Results Bar with Gender Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-black/5">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 font-sans">
                Curated Recommendations
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                Showing {filteredDisplayNames.length} names &bull; Click any card for in-depth profile
              </p>
            </div>

            {/* Quick Result Gender Filter */}
            <div className="flex items-center gap-1 bg-black/[0.04] p-1 rounded-xl text-xs font-semibold">
              {(['all', 'boy', 'girl', 'unisex'] as const).map(g => (
                <button
                  key={g}
                  onClick={() => {
                    audioService.playTapSound();
                    setActiveGenderView(g);
                  }}
                  className={`px-3 py-1 rounded-lg capitalize transition-all ${
                    activeGenderView === g
                      ? 'bg-white text-gray-900 shadow-xs'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Loading, Error or Cards Grid */}
          {isLoading && <LoadingSpinner />}
          {error && <ErrorMessage message={error} onRetry={() => setError(null)} />}

          {!isLoading && filteredDisplayNames.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {filteredDisplayNames.map((item) => {
                const isFav = favorites.some(f => f.name.toLowerCase() === item.name.toLowerCase());
                return (
                  <BabyNameCard
                    key={item.id || item.name}
                    babyName={item}
                    isFavorite={isFav}
                    onToggleFavorite={handleToggleFavorite}
                    onShare={handleShare}
                    onInspect={(nameObj) => {
                      audioService.playTapSound();
                      setSelectedInspectName(nameObj);
                    }}
                  />
                );
              })}
            </div>
          )}

          {!isLoading && filteredDisplayNames.length === 0 && (
            <div className="text-center p-12 rounded-3xl bg-white/60 backdrop-blur-xl border border-black/5">
              <span className="text-3xl">🔍</span>
              <h3 className="mt-2 text-base font-bold text-gray-800">No Names Found</h3>
              <p className="text-xs text-gray-500 mt-1">Try switching gender filter or choose another culture above.</p>
            </div>
          )}

        </section>

      </main>

      {/* Apple-style Footer */}
      <footer className="mt-20 border-t border-black/5 bg-white/50 backdrop-blur-xl py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-800">Lumina Baby Name Atelier</span>
            <span>&bull;</span>
            <span>Crafted with Apple Human Interface Guidelines</span>
            <span>&bull;</span>
            <span>Automated Trend Engine &copy; {CURRENT_YEAR}</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Rahul08319/Baby-Name-Generator-"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-black font-semibold transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Floating Apple Toast Pill */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-gray-900/90 text-white text-xs font-semibold shadow-xl backdrop-blur-md animate-fade-in flex items-center gap-2 border border-white/10">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals & Slide-overs */}
      <NameDetailModal
        nameItem={selectedInspectName}
        onClose={() => setSelectedInspectName(null)}
        isFavorite={Boolean(selectedInspectName && favorites.some(f => f.name.toLowerCase() === selectedInspectName.name.toLowerCase()))}
        onToggleFavorite={handleToggleFavorite}
        onShare={handleShare}
      />

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleToggleFavorite}
        onSelectInspect={(item) => {
          setSelectedInspectName(item);
          setIsFavoritesOpen(false);
        }}
        onStartCompare={handleStartCompare}
      />

      <CompareModal
        names={comparePair}
        onClose={() => setComparePair(null)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onKeyUpdated={() => {
          showToast('Updated Atelier AI Configuration');
        }}
      />

    </div>
  );
};

export default App;