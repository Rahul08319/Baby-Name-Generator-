import React from 'react';
import { CURRENT_YEAR } from '../services/curatedNames';

interface NavbarProps {
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenSettings: () => void;
  isSoundOn: boolean;
  onToggleSound: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  favoritesCount,
  onOpenFavorites,
  onOpenSettings,
  isSoundOn,
  onToggleSound,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 backdrop-blur-2xl bg-white/70 border-b border-black/5 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-400 to-indigo-500 shadow-[0_4px_16px_rgba(244,63,94,0.35)] text-white font-bold text-lg">
            <span>✨</span>
            <span className="absolute -inset-0.5 rounded-2xl bg-white/20 blur-sm pointer-events-none" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-gray-900 font-sans">
                Lumina
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-100/80 text-pink-700 border border-pink-200/60 shadow-xs">
                {CURRENT_YEAR} Edition
              </span>
            </div>
            <p className="text-[11px] text-gray-500 tracking-wide font-medium hidden sm:block">
              Apple-Inspired Baby Name Atelier
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Sound Toggle Button */}
          <button
            onClick={onToggleSound}
            aria-label={isSoundOn ? "Mute interface audio" : "Enable interface audio"}
            title={isSoundOn ? "Interface Audio On" : "Interface Audio Muted"}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 active:scale-95 text-gray-700 transition-all duration-200"
          >
            {isSoundOn ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-pink-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            )}
          </button>

          {/* Favorites Drawer Toggle */}
          <button
            onClick={onOpenFavorites}
            className="relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-pink-500/10 hover:bg-pink-500/15 border border-pink-500/20 text-pink-700 font-medium text-sm transition-all duration-200 active:scale-95 shadow-xs"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 fill-pink-500 text-pink-500" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="hidden xs:inline">Favorites</span>
            <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-full bg-pink-500 text-white shadow-xs">
              {favoritesCount}
            </span>
          </button>

          {/* Settings / API Key Button */}
          <button
            onClick={onOpenSettings}
            title="Atelier Settings & API Config"
            aria-label="Settings"
            className="flex items-center justify-center w-9 h-9 rounded-full bg-black/5 hover:bg-black/10 active:scale-95 text-gray-700 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
