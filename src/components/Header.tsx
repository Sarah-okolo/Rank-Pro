
import React from 'react';
import ThemeToggle from './ThemeToggle';
import { Search, BarChart, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header 
      className="neo-blur px-4 h-16 fixed top-0 left-0 right-0 z-50 animate-fade-in flex items-center justify-between"
    >
      <div className="flex items-center space-x-2 py-2">
        <Search className="h-6 w-6 text-primary" />
        <h1 className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
          WebRank Wizard
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
      
      <ThemeToggle />
    </header>
  );
};

export default Header;
