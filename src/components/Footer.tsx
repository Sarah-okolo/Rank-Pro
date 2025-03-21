
import React from 'react';
import { Anchor, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="neo-blur border-t border-border/50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Anchor className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
                OceanRank Pro
              </h3>
            </div>
            <p className="text-muted-foreground max-w-md mb-4">
              Powerful SEO analysis and optimization tools to improve your website's visibility and ranking in search engines.
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
          
          <div>
            <h4 className="text-lg font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  SEO Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-border/30">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} OceanRank Pro. All rights reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            aria-label="Scroll to top"
          >
            <span>Back to top</span>
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
