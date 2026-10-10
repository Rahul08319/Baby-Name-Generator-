import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 rounded-3xl bg-white/60 backdrop-blur-xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.03)] animate-fade-in">
      {/* Apple-style concentric pulsing ring */}
      <div className="relative flex items-center justify-center w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-pink-200 animate-ping opacity-35" />
        <div className="w-12 h-12 rounded-full border-3 border-pink-500 border-t-transparent animate-spin shadow-sm" />
        <span className="absolute text-base">✨</span>
      </div>
      
      <h3 className="mt-5 text-lg font-bold text-gray-900 tracking-tight">
        Synthesizing Beautiful Baby Names...
      </h3>
      <p className="mt-1.5 text-xs sm:text-sm text-gray-500 max-w-sm leading-relaxed">
        Curating phonetics, linguistic heritage, astrological harmonies, and ethereal visual concepts.
      </p>
    </div>
  );
};

export default LoadingSpinner;