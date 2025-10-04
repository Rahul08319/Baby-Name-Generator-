import React, { useState, useCallback, useEffect } from 'react';
import { generateBabyNames } from './services/geminiService';
import { BabyName } from './types';
import InputForm from './components/InputForm';
import BabyNameCard from './components/BabyNameCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
  const [names, setNames] = useState<BabyName[]>([]);
  const [favorites, setFavorites] = useState<BabyName[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [shareNotification, setShareNotification] = useState<string | null>(null);


  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('favoriteBabyNames');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (err) {
      console.error("Failed to load favorites from localStorage", err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('favoriteBabyNames', JSON.stringify(favorites));
    } catch (err) {
      console.error("Failed to save favorites to localStorage", err);
    }
  }, [favorites]);

  const handleGenerate = useCallback(async (culture: string, letter: string) => {
    setIsLoading(true);
    setError(null);
    setNames([]);

    try {
      const generatedNames = await generateBabyNames(culture, letter);
      setNames(generatedNames);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleToggleFavorite = useCallback((babyName: BabyName) => {
    setFavorites(prevFavorites => {
      const isFavorited = prevFavorites.some(fav => fav.name === babyName.name);
      if (isFavorited) {
        return prevFavorites.filter(fav => fav.name !== babyName.name);
      } else {
        return [...prevFavorites, babyName];
      }
    });
  }, []);
  
  const handleShare = useCallback(async (babyName: BabyName) => {
    const shareText = `Check out this baby name I found: ${babyName.name}! It means "${babyName.meaning}".`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Baby Name Idea',
          text: shareText,
        });
      } catch (err) {
        console.error('Error using Web Share API:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setShareNotification('Copied to clipboard!');
        setTimeout(() => setShareNotification(null), 3000);
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
        setShareNotification('Failed to copy.');
        setTimeout(() => setShareNotification(null), 3000);
      }
    }
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-200 font-sans">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
            Baby Name Generator <span role="img" aria-label="baby">👶</span>
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Discover the perfect name for your little one.</p>
        </header>

        <main className="max-w-4xl mx-auto">
          <InputForm onGenerate={handleGenerate} isLoading={isLoading} />

          {favorites.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Your Favorite Names</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {favorites.map((name, index) => (
                  <BabyNameCard 
                    key={`${name.name}-${index}`}
                    babyName={name}
                    isFavorite={true}
                    onToggleFavorite={handleToggleFavorite}
                    onShare={handleShare}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-12">
            {isLoading && <LoadingSpinner />}
            {error && <ErrorMessage message={error} />}
            {!isLoading && !error && names.length === 0 && (
              <div className="text-center text-gray-500 bg-white/50 p-8 rounded-xl shadow-sm">
                <p className="text-xl">Your generated names will appear here.</p>
                <p>Fill out the form above to get started!</p>
              </div>
            )}
            {!isLoading && names.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {names.map((name, index) => {
                  const isFavorite = favorites.some(fav => fav.name === name.name);
                  return (
                    <BabyNameCard 
                      key={index} 
                      babyName={name}
                      isFavorite={isFavorite}
                      onToggleFavorite={handleToggleFavorite}
                      onShare={handleShare}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </main>
        
        {shareNotification && (
            <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg text-sm animate-fade-in">
                {shareNotification}
            </div>
        )}

        <footer className="text-center text-gray-500 mt-12">
            <p>Powered by Gemini API</p>
        </footer>
      </div>
    </div>
  );
};

export default App;