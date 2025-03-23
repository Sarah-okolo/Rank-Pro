
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { Anchor, BarChart2, Lightbulb } from 'lucide-react';
import { Button } from '@progress/kendo-react-buttons';
import { anchorIcon } from '@progress/kendo-svg-icons';


const Home: React.FC = () => {

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Header />
        
        <main className="pt-28">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="text-center mb-16 animate-fade-up">
              <h1 className="text-4xl md:text-6xl font-bold mb-10">
                Welcome to <span className="bg-gradient-primary bg-clip-text text-transparent">Rank Pro</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                Your complete toolbox for analyzing, and improving your website's SEO performance.
              </p>
              <div className="flex flex-wrap justify-center gap-4 my-20">
                <Link to="/analyzer">
                  <Button  className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors" svgIcon={anchorIcon}>
                    Analyze Your Site
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-up my-32" style={{ animationDelay: '0.2s' }}>
              <div className="neo-blur rounded-xl p-6 text-center">
                <div className="bg-primary/10 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <Anchor className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Analyze</h3>
                <p className="text-muted-foreground">
                  Get a comprehensive analysis of your website's SEO health with our powerful analyzer.
                </p>
              </div>
              
              <div className="neo-blur rounded-xl p-6 text-center">
                <div className="bg-primary/10 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <BarChart2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Track Metrics</h3>
                <p className="text-muted-foreground">
                  Monitor key SEO metrics to understand your website's performance and identify areas for improvement.
                </p>
              </div>
              
              <div className="neo-blur rounded-xl p-6 text-center">
                <div className="bg-primary/10 w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <Lightbulb className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Optimize</h3>
                <p className="text-muted-foreground">
                  Get actionable tips and recommendations to improve your website's search engine ranking.
                </p>
              </div>
            </div>
           </div>
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Home;
