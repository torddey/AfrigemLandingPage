import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center">
            <span className={`text-2xl font-bold font-playfair ${isScrolled ? 'text-primary' : 'text-white'}`}>
              Afrigem Beauty
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a 
              href="#" 
              className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white/90 hover:text-white'
              }`}
            >
              Home
            </a>
            <a 
              href="#" 
              className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white/90 hover:text-white'
              }`}
            >
              How It Works
            </a>
            <a 
              href="#" 
              className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white/90 hover:text-white'
              }`}
            >
              About Us
            </a>
            <a 
              href="#" 
              className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-primary' : 'text-white/90 hover:text-white'
              }`}
            >
              Contact
            </a>
            <a 
              href="#" 
              className={`${
                isScrolled 
                  ? 'bg-primary text-white hover:bg-primary/90' 
                  : 'bg-white text-primary hover:bg-white/90'
              } px-5 py-2 rounded-md font-medium transition-colors`}
            >
              Sign Up
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <a 
                href="#" 
                className="font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="#" 
                className="font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#" 
                className="font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </a>
              <a 
                href="#" 
                className="font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </a>
              <a 
                href="#" 
                className="bg-primary text-white px-5 py-2 rounded-md font-medium text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;