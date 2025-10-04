import React, { useState } from 'react';

interface InputFormProps {
  onGenerate: (culture: string, letter: string) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onGenerate, isLoading }) => {
  const [culture, setCulture] = useState<string>('Japanese');
  const [letter, setLetter] = useState<string>('A');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!culture.trim() || !letter.trim()) {
      setError('Both fields are required.');
      return;
    }
    if (letter.length !== 1 || !/^[a-zA-Z]$/.test(letter)) {
      setError('Please enter a single valid letter.');
      return;
    }
    setError(null);
    onGenerate(culture, letter);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="culture" className="block text-sm font-medium text-gray-700 mb-1">
              Culture / Origin
            </label>
            <input
              type="text"
              id="culture"
              value={culture}
              onChange={(e) => setCulture(e.target.value)}
              placeholder="e.g., Irish, Sanskrit, Elvish"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="letter" className="block text-sm font-medium text-gray-700 mb-1">
              Starting Letter
            </label>
            <input
              type="text"
              id="letter"
              value={letter}
              onChange={(e) => setLetter(e.target.value.toUpperCase())}
              maxLength={1}
              placeholder="e.g., A"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
              disabled={isLoading}
            />
          </div>
        </div>
        
        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center w-full md:w-auto px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-full hover:shadow-xl hover:scale-105 transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
             <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3.5a1.5 1.5 0 011.5 1.5v1.5a1.5 1.5 0 01-3 0V5A1.5 1.5 0 0110 3.5zM6.5 6a1.5 1.5 0 011.5-1.5h4A1.5 1.5 0 0113.5 6v4a1.5 1.5 0 01-1.5 1.5h-4A1.5 1.5 0 016.5 10V6zM4.5 9a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 010 3H6A1.5 1.5 0 014.5 9zm6 3a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 010 3h-1.5A1.5 1.5 0 0110.5 12zm-3 3.5a1.5 1.5 0 011.5-1.5h4a1.5 1.5 0 010 3h-4a1.5 1.5 0 01-1.5-1.5z" />
                </svg>
                Generate Names
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InputForm;
