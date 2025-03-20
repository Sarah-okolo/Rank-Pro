
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@progress/kendo-react-buttons';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-5 w-5 text-secondary" />
      <Button
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
        className="k-button k-button-md k-rounded-md bg-transparent border-0 hover:bg-transparent focus:shadow-none p-1"
      >
        <div className={`w-10 h-5 rounded-full bg-muted relative ${theme === 'dark' ? 'bg-primary/30' : 'bg-muted'}`}>
          <div 
            className={`absolute w-4 h-4 rounded-full bg-primary top-0.5 transition-transform duration-200 ${
              theme === 'dark' ? 'transform translate-x-5' : 'translate-x-0.5'
            }`} 
          />
        </div>
      </Button>
      <Moon className="h-5 w-5 text-foreground" />
    </div>
  );
};

export default ThemeToggle;
