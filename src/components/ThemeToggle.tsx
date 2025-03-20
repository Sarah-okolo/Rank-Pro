
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { Switch } from '@progress/kendo-react-inputs';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="flex items-center space-x-2">
      <Sun className="h-5 w-5 text-secondary" />
      <Switch 
        onChange={toggleTheme}
        checked={theme === 'dark'}
        className="k-custom-switch"
        aria-label="Toggle dark mode"
      />
      <Moon className="h-5 w-5 text-foreground" />
    </div>
  );
};

export default ThemeToggle;
