import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-gray-700">Generating beautiful names and artistic visuals...</p>
    </div>
  );
};

export default LoadingSpinner;