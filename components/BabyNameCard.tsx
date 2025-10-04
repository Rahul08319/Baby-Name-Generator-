import React from 'react';
import { BabyName } from '../types';

interface BabyNameCardProps {
  babyName: BabyName;
  isFavorite: boolean;
  onToggleFavorite: (babyName: BabyName) => void;
  onShare: (babyName: BabyName) => void;
}

const BabyNameCard: React.FC<BabyNameCardProps> = ({ babyName, isFavorite, onToggleFavorite, onShare }) => {
  const { name, meaning, imageUrl } = babyName;

  return (
    <div className="relative bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden group">
      <div className="absolute top-3 right-3 z-10 flex gap-2">
        <button
          onClick={() => onShare(babyName)}
          className="p-2 bg-white/50 rounded-full text-gray-600 hover:bg-white/80 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
          aria-label={`Share the name ${name}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12s-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
        </button>
        <button
          onClick={() => onToggleFavorite(babyName)}
          className="p-2 bg-white/50 rounded-full text-pink-500 hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-pink-400 transition-colors"
          aria-label={isFavorite ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      <img 
        src={imageUrl} 
        alt={`Artistic representation for the name ${name}`}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        aria-hidden="true"
      />
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 text-pink-500">{name}</h3>
        <p className="text-gray-600 mt-2">{meaning}</p>
      </div>
    </div>
  );
};

export default BabyNameCard;