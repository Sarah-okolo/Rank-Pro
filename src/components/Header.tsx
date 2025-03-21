
import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { Anchor, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@progress/kendo-react-buttons';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className="neo-blur px-4 h-16 fixed top-0 left-0 right-0 z-50 animate-fade-in flex items-center justify-between"
    >
      <div className="flex items-center space-x-2 py-2">
        <Anchor className="h-6 w-6 text-primary" />
        <h1 className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
          OceanRank Pro
        </h1>
      </div>
      
      <nav className="hidden md:flex items-center space-x-6">
        <Link to="/" className="text-sm hover:text-primary transition-colors">
          Home
        </Link>
        <Link to="/analyzer" className="text-sm hover:text-primary transition-colors">
          Analyzer
        </Link>
        <Link to="/metrics" className="text-sm hover:text-primary transition-colors">
          Metrics
        </Link>
        <Link to="/tips" className="text-sm hover:text-primary transition-colors">
          Optimization
        </Link>
      </nav>
      
      <div className="flex items-center">
        <ThemeToggle />
        <Button
          icon={mobileMenuOpen ? X : Menu}
          fillMode="flat"
          className="md:hidden ml-2"
          onClick={toggleMobileMenu}
        />
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 neo-blur md:hidden py-4 px-4 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="text-sm hover:text-primary transition-colors py-2 px-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/analyzer" 
              className="text-sm hover:text-primary transition-colors py-2 px-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Analyzer
            </Link>
            <Link 
              to="/metrics" 
              className="text-sm hover:text-primary transition-colors py-2 px-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Metrics
            </Link>
            <Link 
              to="/tips" 
              className="text-sm hover:text-primary transition-colors py-2 px-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              Optimization
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
