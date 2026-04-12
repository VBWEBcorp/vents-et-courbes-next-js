import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import EspaceAdherentModal from './EspaceAdherentModal';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-4 left-4 right-4 z-50 fade-in">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 px-4 md:px-6 py-3 md:py-4 max-w-7xl mx-auto smooth-hover">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" onClick={closeMobileMenu} className="smooth-hover">
                <img 
                  src="https://i.ibb.co/ZzWhrH6J/logo-ventsetcourbes.png" 
                  alt="Vents et Courbes"
                  className="h-10 md:h-12 w-auto pulse-soft"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link to="/cours" className="text-custom-dark hover:text-primary-400 font-normal relative group smooth-hover">
                <span className="relative z-10">Loisirs</span>
                <div className="absolute inset-0 bg-primary-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
              <Link to="/stages" className="text-custom-dark hover:text-primary-400 font-normal relative group smooth-hover">
                <span className="relative z-10">Stages</span>
                <div className="absolute inset-0 bg-primary-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
              <Link to="/formation-pro" className="text-custom-dark hover:text-primary-400 font-normal relative group smooth-hover">
                <span className="relative z-10">Formation Pro</span>
                <div className="absolute inset-0 bg-primary-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
              <Link to="/atelier-partage" className="text-custom-dark hover:text-primary-400 font-normal relative group smooth-hover">
                <span className="relative z-10">Atelier Partage</span>
                <div className="absolute inset-0 bg-primary-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
              <Link to="/a-propos" className="text-custom-dark hover:text-primary-400 font-normal relative group smooth-hover">
                <span className="relative z-10">À propos</span>
                <div className="absolute inset-0 bg-primary-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
              <Link to="/blog" className="text-custom-dark hover:text-primary-400 font-normal relative group smooth-hover">
                <span className="relative z-10">Blog</span>
                <div className="absolute inset-0 bg-primary-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
              <Link to="/contact" className="text-custom-dark hover:text-primary-400 font-normal relative group smooth-hover">
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-primary-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </Link>
            </nav>

            {/* Desktop CTA Button */}
            <button 
              onClick={() => setIsModalOpen(true)}
              className="hidden md:block bg-primary-400 hover:bg-primary-500 text-white px-4 lg:px-6 py-2 rounded-full font-normal text-sm lg:text-base btn-animate"
            >
              Espace adhérent
            </button>

            {/* Mobile menu button */}
            <div className="flex items-center space-x-3 md:hidden">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-primary-400 hover:bg-primary-500 text-white px-3 py-1.5 rounded-full font-normal text-sm btn-animate"
              >
                Espace
              </button>
              <button 
                onClick={toggleMobileMenu}
                className="p-2 text-custom-dark hover:text-primary-400 hover:bg-primary-400/10 rounded-full smooth-hover"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 bounce-in" strokeWidth={2} />
                ) : (
                  <Menu className="w-6 h-6 bounce-in" strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 mx-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 md:hidden modal-enter">
            <nav className="px-6 py-6 space-y-4">
              <Link 
                to="/cours" 
                onClick={closeMobileMenu}
                className="block text-custom-dark hover:text-primary-400 font-normal py-3 text-lg hover:bg-primary-400/10 rounded-lg px-3 smooth-hover"
              >
                Loisirs
              </Link>
              <Link 
                to="/stages" 
                onClick={closeMobileMenu}
                className="block text-custom-dark hover:text-primary-400 font-normal py-3 text-lg hover:bg-primary-400/10 rounded-lg px-3 smooth-hover"
              >
                Stages
              </Link>
              <Link
                to="/formation-pro"
                onClick={closeMobileMenu}
                className="block text-custom-dark hover:text-primary-400 font-normal py-3 text-lg hover:bg-primary-400/10 rounded-lg px-3 smooth-hover"
              >
                Formation Pro
              </Link>
              <Link
                to="/atelier-partage"
                onClick={closeMobileMenu}
                className="block text-custom-dark hover:text-primary-400 font-normal py-3 text-lg hover:bg-primary-400/10 rounded-lg px-3 smooth-hover"
              >
                Atelier Partage
              </Link>
              <Link
                to="/a-propos" 
                onClick={closeMobileMenu}
                className="block text-custom-dark hover:text-primary-400 font-normal py-3 text-lg hover:bg-primary-400/10 rounded-lg px-3 smooth-hover"
              >
                À propos
              </Link>
              <Link 
                to="/blog" 
                onClick={closeMobileMenu}
                className="block text-custom-dark hover:text-primary-400 font-normal py-3 text-lg hover:bg-primary-400/10 rounded-lg px-3 smooth-hover"
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                onClick={closeMobileMenu}
                className="block text-custom-dark hover:text-primary-400 font-normal py-3 text-lg hover:bg-primary-400/10 rounded-lg px-3 smooth-hover"
              >
                Contact
              </Link>
            </nav>
          </div>
        )}
      </header>

      <EspaceAdherentModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Header;