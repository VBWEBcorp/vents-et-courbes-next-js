'use client';
import React, { useState, useEffect } from 'react';
import { X, Shield, Eye, Target } from 'lucide-react';
import { useIsAdminPage } from '../hooks/useIsAdminPage';

const CookiePopup = () => {
  const isAdminPage = useIsAdminPage();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Pour les tests, toujours afficher le popup (à supprimer en production)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
    
    // Code de production (décommenté quand les tests sont OK) :
    // const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    // if (!cookiesAccepted) {
    //   const timer = setTimeout(() => {
    //     setIsVisible(true);
    //   }, 2000);
    //   return () => clearTimeout(timer);
    // }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    handleClose();
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (isAdminPage || !isVisible) return null;

  return (
    <div className={`fixed bottom-4 left-4 z-[9999] max-w-xs ${isClosing ? 'cookie-exit' : 'cookie-enter'}`}>
      {/* Main Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header avec fermeture */}
        <div className="relative bg-primary-400 px-4 py-3">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-white hover:text-gray-200 p-1 rounded-full hover:bg-black/10 transition-all"
          >
            <X className="w-3 h-3" strokeWidth={2} />
          </button>
          
          <h3 className="text-white font-bold text-sm text-center pr-6">
            Cookies
          </h3>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Icons Row */}
          <div className="flex justify-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center">
              <img 
                src="https://i.ibb.co/8DmCzvRd/icon1.png" 
                alt="Sécurité" 
                className="w-4 h-4"
              />
            </div>
            <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center">
              <img 
                src="https://i.ibb.co/3msXV6F9/icon2.png" 
                alt="Analyse" 
                className="w-4 h-4"
              />
            </div>
            <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center">
              <img 
                src="https://i.ibb.co/yBnD8xXK/icon3.png" 
                alt="Performance" 
                className="w-4 h-4"
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-xs leading-relaxed mb-4 text-center">
            Nous utilisons des cookies pour améliorer votre expérience.
          </p>

          {/* Buttons */}
          <div className="space-y-2">
            <button
              onClick={handleAccept}
              className="w-full bg-primary-400 hover:bg-primary-500 text-white py-2 px-4 rounded-lg font-medium text-xs transition-colors"
            >
              Accepter
            </button>
            
            <button
              onClick={handleClose}
              className="w-full text-gray-600 hover:text-gray-800 py-2 px-4 rounded-lg text-xs font-medium hover:bg-gray-100 transition-colors"
            >
              Refuser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePopup;