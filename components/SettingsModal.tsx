import React, { useState, useEffect } from 'react';
import { audioService } from '../services/audioService';
import { CURRENT_YEAR } from '../services/curatedNames';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyUpdated: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onKeyUpdated,
}) => {
  const [apiKey, setApiKey] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('lumina_custom_api_key') || '';
      setApiKey(stored);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    audioService.playSuccessChime();
    if (apiKey.trim()) {
      localStorage.setItem('lumina_custom_api_key', apiKey.trim());
    } else {
      localStorage.removeItem('lumina_custom_api_key');
    }
    setSavedSuccess(true);
    onKeyUpdated();
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    audioService.playTapSound();
    localStorage.removeItem('lumina_custom_api_key');
    setApiKey('');
    onKeyUpdated();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/40 backdrop-blur-md animate-fade-in">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.25)] border border-black/10 overflow-hidden z-10 p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-indigo-500 text-white flex items-center justify-center text-lg shadow-sm">
              ⚙️
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                Atelier Settings
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                API Configuration &amp; Trend Engine
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

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Gemini API Key (Optional)
            </label>
            <p className="text-xs text-gray-500 mb-2 leading-relaxed">
              If left empty, Lumina seamlessly uses the built-in intelligent cultural engine with zero latency. Add your Gemini API key to enable live Gemini 2.5 Flash &amp; Imagen generation!
            </p>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-4 py-2.5 rounded-2xl bg-black/[0.03] border border-black/10 focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/15 text-gray-900 text-sm font-mono transition-all outline-none"
            />
          </div>

          {savedSuccess && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold text-center animate-fade-in">
              ✨ Settings successfully saved!
            </div>
          )}

          {/* Engine Status Callout */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-indigo-900">
              <span>Active Engine</span>
              <span>{apiKey.trim() ? 'Gemini 2.5 Flash + Imagen' : 'Curated Apple Atelier'}</span>
            </div>
            <p className="text-[11px] text-indigo-700/80 leading-relaxed">
              Automated Yearly Forecasting: Active for {CURRENT_YEAR} and {CURRENT_YEAR + 1}. Trends automatically recalculate each calendar year with zero maintenance required.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            {apiKey && (
              <button
                type="button"
                onClick={handleClear}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700"
              >
                Clear Key
              </button>
            )}
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full text-xs font-semibold text-gray-600 hover:bg-black/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-gray-900 hover:bg-black text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

export default SettingsModal;
