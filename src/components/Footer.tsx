import React from 'react';
import { Anchor, ArrowUp } from 'lucide-react';
import { FloatingActionButton } from '@progress/kendo-react-buttons';
import {
  clipboardIcon,
  clipboardTextIcon,
  clipboardHtmlIcon,
  clipboardMarkdownIcon,
  boldIcon,
  italicIcon,
  underlineIcon,
  cutIcon,
  copyIcon,
  alignLeftIcon,
  alignRightIcon,
  alignCenterIcon,
  alignJustifyIcon,
  checkIcon,
  arrowUpIcon,
  anchorIcon,
  userIcon
} from '@progress/kendo-svg-icons';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="neo-blur border-t border-border/50 py-12 px-6 mt-28">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 items-center">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Anchor className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
                Rank Pro
              </h3>
            </div>
            <p className="text-muted-foreground max-w-md mb-4">
              SEO analysis and optimization tool to improve your website's visibility and ranking in search engines.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#analyzer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  SEO Analyzer
                </a>
              </li>
              <li>
                <a href="#metrics" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  SEO Metrics
                </a>
              </li>
              <li>
                <a href="#tips" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Optimization Tips
                </a>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-border/30">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Rank Pro. All rights reserved.
          </p>
          <FloatingActionButton 
            svgIcon={arrowUpIcon} 
            text="Back to top" 
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
          </FloatingActionButton>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
