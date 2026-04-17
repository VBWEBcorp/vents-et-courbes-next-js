'use client';
import React, { useState, useEffect } from 'react';
import { useIsAdminPage } from '../hooks/useIsAdminPage';

const LogoLoader = () => {
  const isAdminPage = useIsAdminPage();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isAdminPage) {
      setIsVisible(false);
      return;
    }

    // Déclencher l'animation smooth à chaque actualisation
    setIsVisible(true);
    setIsAnimating(true);

    // Animation smooth : 2 secondes exactement
    const timer = setTimeout(() => {
      setIsAnimating(false);
      // Transition de sortie smooth
      setTimeout(() => {
        setIsVisible(false);
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isAdminPage]);

  if (!isVisible) return null;

  return (
    <div className={`loader-overlay ${!isAnimating ? 'loader-overlay-exit' : ''}`}>
      <div className="loader-card">
        {/* Logo avec animation smooth */}
        <div className="loader-logo-container">
          <img 
            src="https://i.ibb.co/ZzWhrH6J/logo-ventsetcourbes.png" 
            alt="Vents et Courbes"
            className="loader-logo"
          />
        </div>
        
        {/* Titre avec animation smooth */}
        <div className="loader-title">
          <h1 className="text-xl md:text-3xl">Vents & Courbes</h1>
          <p className="text-base md:text-lg">Atelier de céramique</p>
        </div>
        
        {/* Barre de progression subtile */}
        <div className="loader-progress">
          <div className="loader-progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default LogoLoader;