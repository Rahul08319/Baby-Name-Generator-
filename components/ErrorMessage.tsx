import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="p-5 rounded-3xl bg-rose-50/90 border border-rose-200/80 text-rose-900 shadow-sm backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in" role="alert">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-rose-100 text-rose-600 font-bold text-sm shrink-0">
          ⚠️
        </div>
        <div>
          <h4 className="text-sm font-bold tracking-tight">
            Generation Notice
          </h4>
          <p className="text-xs text-rose-700/90 mt-0.5 leading-relaxed">
            {message}
          </p>
        </div>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-all active:scale-95 shrink-0"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
