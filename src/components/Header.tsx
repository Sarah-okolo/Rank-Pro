import { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import { Anchor, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';


const Header: React.FC = () => {
  return (
    <header 
      className="neo-blur px-7 h-16 fixed top-0 left-0 right-0 z-50 animate-fade-in flex items-center justify-between w-[97%] md:w-[80%] mx-auto mt-4 rounded-3xl"
    >
      <Link to="/" className="flex items-center space-x-2 py-2">
        <Anchor className="h-6 w-6 text-primary" />
        <h1 className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent">
          Rank Pro
        </h1>
      </Link>
      
      <div className="flex items-center">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
