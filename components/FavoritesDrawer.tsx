import React, { useState } from 'react';
import { BabyName } from '../types';
import { audioService } from '../services/audioService';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: BabyName[];
  onRemoveFavorite: (babyName: BabyName) => void;
  onSelectInspect: (babyName: BabyName) => void;
  onStartCompare: (name1: BabyName, name2: BabyName) => void;
}

const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onSelectInspect,
  onStartCompare,
}) => {
  const [selectedForCompare, setSelectedForCompare] = useState<BabyName[]>([]);
  const [copiedAll, setCopiedAll] = useState(false);

  if (!isOpen) return null;

  const toggleCompareSelection = (name: BabyName) => {
    audioService.playTapSound();
    if (selectedForCompare.some(item => item.name === name.name)) {
      setSelectedForCompare(prev => prev.filter(item => item.name !== name.name));
    } else {
      if (selectedForCompare.length < 2) {
        setSelectedForCompare(prev => [...prev, name]);
      } else {
        setSelectedForCompare([selectedForCompare[1], name]);
      }
    }
  };

  const handleTriggerCompare = () => {
    if (selectedForCompare.length === 2) {
      onStartCompare(selectedForCompare[0], selectedForCompare[1]);
      onClose();
    }
  };

  const handleExportAll = () => {
    audioService.playSuccessChime();
    const listText = favorites
      .map((f, i) => `${i + 1}. ${f.name} (${f.origin}, ${f.gender}) — "${f.meaning}"`)
      .join('\n');
    navigator.clipboard.writeText(`🍼 Our Favorite Baby Names:\n\n${listText}`);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Blurred Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white/95 backdrop-blur-2xl border-l border-black/10 shadow-[0_0_50px_rgba(0,0,0,0.15)] flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-black/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">❤️</span>
              <div>
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                  Your Cherished Names
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  {favorites.length} {favorites.length === 1 ? 'name' : 'names'} saved locally
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 text-gray-600 transition-all active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Compare Prompt Bar */}
          {favorites.length >= 2 && (
            <div className="px-6 py-2.5 bg-indigo-50/80 border-b border-indigo-100 flex items-center justify-between text-xs">
              <span className="text-indigo-900 font-semibold">
                Compare Mode: Select 2 names ({selectedForCompare.length}/2)
              </span>
              {selectedForCompare.length === 2 && (
                <button
                  onClick={handleTriggerCompare}
                  className="px-2.5 py-1 rounded-full bg-indigo-600 text-white font-bold shadow-xs hover:bg-indigo-700 transition-all active:scale-95"
                >
                  Compare Now &rarr;
                </button>
              )}
            </div>
          )}

          {/* List Content */}
          <div className="p-6 flex-1 overflow-y-auto space-y-3">
            {favorites.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-full bg-pink-50 flex items-center justify-center text-2xl mb-3 text-pink-400">
                  🤍
                </div>
                <h4 className="text-base font-bold text-gray-800">
                  No Favorites Saved Yet
                </h4>
                <p className="text-xs text-gray-500 mt-1 max-w-xs">
                  Tap the heart icon on any baby name card to pin your favorite inspirations here.
                </p>
              </div>
            ) : (
              favorites.map((fav) => {
                const isSelectedForComp = selectedForCompare.some(c => c.name === fav.name);
                return (
                  <div
                    key={fav.name}
                    className={`group relative p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                      isSelectedForComp
                        ? 'bg-indigo-50/90 border-indigo-300 ring-2 ring-indigo-500/20'
                        : 'bg-white border-black/5 hover:border-black/10 shadow-xs'
                    }`}
                  >
                    <div
                      className="flex items-center gap-3 cursor-pointer flex-1"
                      onClick={() => onSelectInspect(fav)}
                    >
                      <img
                        src={fav.imageUrl}
                        alt={fav.name}
                        className="w-12 h-12 rounded-xl object-cover shadow-xs"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-base font-bold text-gray-900 group-hover:text-pink-600 transition-colors">
                            {fav.name}
                          </h4>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                            {fav.origin}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                          {fav.meaning}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {/* Compare toggle button */}
                      {favorites.length >= 2 && (
                        <button
                          onClick={() => toggleCompareSelection(fav)}
                          title="Select for Comparison"
                          className={`p-1.5 rounded-lg text-xs font-semibold transition-all ${
                            isSelectedForComp
                              ? 'bg-indigo-600 text-white'
                              : 'bg-black/5 hover:bg-black/10 text-gray-500'
                          }`}
                        >
                          ⚖️
                        </button>
                      )}

                      {/* Remove button */}
                      <button
                        onClick={() => {
                          audioService.playTapSound();
                          onRemoveFavorite(fav);
                        }}
                        title="Remove from favorites"
                        className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Controls */}
          {favorites.length > 0 && (
            <div className="p-6 border-t border-black/5 bg-gray-50/50 flex flex-col gap-2">
              <button
                onClick={handleExportAll}
                className="w-full py-3 rounded-2xl bg-gray-900 text-white font-bold text-xs shadow-sm hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{copiedAll ? '✨ Copied All to Clipboard!' : '📋 Export & Copy Favorites List'}</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default FavoritesDrawer;
