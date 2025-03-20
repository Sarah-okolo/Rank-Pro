
import React from 'react';
import { useSeoAnalysis } from '@/hooks/useSeoAnalysis';
import Header from '@/components/Header';
import SeoAnalyzer from '@/components/SeoAnalyzer';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Loader } from '@progress/kendo-react-indicators';

const Analyzer: React.FC = () => {
  const {
    url,
    setUrl,
    isAnalyzing,
    metrics,
    analyzeWebsite
  } = useSeoAnalysis();

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Header />
        
        <main className="pt-16">
          <SeoAnalyzer 
            url={url} 
            setUrl={setUrl} 
            onAnalyze={analyzeWebsite}
            isAnalyzing={isAnalyzing} 
          />
          
          {metrics.status === 'loading' && (
            <div className="flex flex-col items-center justify-center min-h-[50vh] animate-fade-in">
              <Loader size="large" type="pulsing" themeColor="primary" />
              <p className="mt-6 text-xl font-medium">Analyzing your website...</p>
              <p className="text-muted-foreground mt-2">This may take a few moments</p>
            </div>
          )}
          
          {metrics.status === 'success' && (
            <div className="max-w-6xl mx-auto px-6 py-8">
              <div className="neo-blur rounded-xl p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">Analysis Complete!</h2>
                <p className="text-lg mb-6">Your website has been analyzed. View the results in the Metrics and Optimization sections.</p>
              </div>
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Analyzer;
