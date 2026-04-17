'use client';
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface EspaceAdherentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EspaceAdherentModal: React.FC<EspaceAdherentModalProps> = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Check if password is correct
    if (password === 'VENTS2026') {
      // Redirect to Google Sheets
      window.open('https://docs.google.com/spreadsheets/d/1WNFlCtouHyeqTsZbVyukuzmvXTqWPMJf-0-pu4JXn9g/edit?usp=sharing', '_blank');
      // Reset form and close modal
      setPassword('');
      setIsLoading(false);
      onClose();
    } else {
      // Show error message
      setError('Mot de passe incorrect');
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-sm md:max-w-md relative shadow-2xl modal-enter">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 md:top-4 right-3 md:right-4 text-gray-400 hover:text-gray-600 p-1 smooth-hover"
        >
          <X className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
        </button>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold text-primary-400 mb-3 md:mb-4 slide-up">
          Espace adhérent
        </h2>

        {/* Subtitle */}
        <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed font-normal text-sm md:text-base slide-up-delay">
          Entrez le mot de passe pour accéder à l'espace adhérent.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 slide-up-delay-2">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Password Input */}
          <div>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-400 focus:border-transparent text-gray-700 placeholder-gray-400 font-normal text-base smooth-hover"
              required
              disabled={isLoading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-400 hover:bg-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-normal text-base md:text-base btn-animate transition-colors"
          >
            {isLoading ? 'Vérification...' : 'Accéder'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EspaceAdherentModal;