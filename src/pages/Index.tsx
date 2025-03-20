
import React from 'react';
import { useSeoAnalysis } from '@/hooks/useSeoAnalysis';
import Header from '@/components/Header';
import SeoAnalyzer from '@/components/SeoAnalyzer';
import MetricsPanel from '@/components/MetricsPanel';
import OptimizationTips from '@/components/OptimizationTips';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Loader } from '@progress/kendo-react-indicators';
import '@progress/kendo-theme-default/dist/all.css';

const Index: React.FC = () => {
  const {
    url,
    setUrl,
    isAnalyzing,
    metrics,
    optimizationTips,
    analyzeWebsite,
    activeTabId,
    setActiveTabId,
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
            <>
              <MetricsPanel 
                metrics={metrics} 
                activeTabId={activeTabId}
                setActiveTabId={setActiveTabId}
              />
              
              <OptimizationTips tips={optimizationTips} />
            </>
          )}
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
