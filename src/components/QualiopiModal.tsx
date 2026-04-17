'use client';
import React from 'react';
import { X, Award } from 'lucide-react';

interface QualiopiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QualiopiModal: React.FC<QualiopiModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl w-full max-w-md relative shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors p-1 z-10"
        >
          <X className="w-6 h-6" strokeWidth={1.5} />
        </button>

        {/* Header noir avec étoile */}
        <div className="bg-black text-white p-6 text-center relative">
          <div className="flex items-center justify-center mb-2">
            <Award className="w-8 h-8 mr-3" strokeWidth={1.5} />
            <h2 className="text-xl font-bold">Satisfaction Qualiopi</h2>
          </div>
          <div className="absolute top-4 right-16 text-white text-sm">↑</div>
        </div>

        {/* Contenu gris */}
        <div className="bg-gray-200 p-6">
          <div className="mb-4">
            <h3 className="text-gray-900 font-bold text-base mb-2">
              Formations courtes et longues
            </h3>
            <p className="text-gray-900 font-bold text-base mb-4">
              durées 2023/24 : <span className="text-blue-600">9,6/10</span>
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-blue-600 font-bold text-lg mr-2">9,6/10</span>
              <span className="text-gray-900 font-medium">Satisfaction à chaud</span>
            </div>
            <div className="flex items-center">
              <span className="text-blue-600 font-bold text-lg mr-2">9,6/10</span>
              <span className="text-gray-900 font-medium">Satisfaction à froid</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white p-4 text-center">
          <button
            onClick={onClose}
            className="bg-primary-400 hover:bg-primary-500 text-white px-6 py-2 rounded-full font-medium transition-colors"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default QualiopiModal;