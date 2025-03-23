import React, { useEffect } from 'react';
import { useSeoAnalysis } from '@/hooks/useSeoAnalysis';
import Header from '@/components/Header';
import SeoAnalyzer from '@/components/SeoAnalyzer';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Loader } from '@progress/kendo-react-indicators';
import { Scan, BarChart4, Link } from 'lucide-react';
import MetricsPanel from '@/components/MetricsPanel';
import OptimizationTips from '@/components/OptimizationTips';
import { useAiTips } from '@/store/AiTips';


const Analyzer: React.FC = () => {
  const {
    url,
    setUrl,
    isAnalyzing,
    metrics,
    analyzeWebsite,
    activeTabId,
    setActiveTabId,
    optimizationTips
  } = useSeoAnalysis();

  const aiTips = useAiTips((state) => state.aiTips);


  useEffect(() => {
    if (metrics.status === 'success') {
      document.getElementById('metrics').scrollIntoView(
        { behavior: 'smooth', block: 'start' }
      );
    }
  }, [metrics]);



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
            <div className="flex flex-col items-center justify-center min-h-[20vh] mb-40 animate-fade-in">
              <Loader size="large" type="pulsing" themeColor="info" />
              <p className="mt-6 text-xl font-medium">Analyzing your website...</p>
              <p className="text-muted-foreground mt-2">This may take a few moments</p>
            </div>
          )}
          
          {metrics.status === 'success' && (
            <div className="max-w-6xl mx-auto px-6">
              <div className="neo-blur rounded-xl p-2 text-center" id='metrics'>
                <MetricsPanel 
                  metrics={metrics} 
                  activeTabId={activeTabId}
                  setActiveTabId={setActiveTabId}
                />
              </div>
            </div>
          )}

          <div id='optimization' className="max-w-6xl mx-auto px-6 pt-28 hidden">
            { metrics.status==='success' && !aiTips && (
              <div className="flex flex-col items-center justify-center min-h-[20vh] mb-40 animate-fade-in">
                <Loader size="large" type="pulsing" themeColor="info" />
                <p className="mt-6 text-xl font-medium">Generating optimization tips...</p>
                <p className="text-muted-foreground mt-2">This may take a few moments</p>
              </div>
            )}
            { aiTips && (
              <div className="neo-blur rounded-xl p-2 text-center">
                <OptimizationTips tips={optimizationTips} />
              </div>
            )}
          </div>

        <div className="mt-20 px-5 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-center animate-fade-up" style={{ animationDelay: '0.6s' }}>
          <div className="neo-blur p-6 rounded-lg">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Scan className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Deep Analysis</h3>
            <p className="text-muted-foreground text-sm">Comprehensive scanning of all your website SEO factors</p>
          </div>
          
          <div className="neo-blur p-6 rounded-lg">
            <div className="rounded-full bg-secondary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <BarChart4 className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Detailed Metrics</h3>
            <p className="text-muted-foreground text-sm">Get actionable metrics to understand your site's performance</p>
          </div>
          
          <div className="neo-blur p-6 rounded-lg">
            <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Link className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Optimization Tips</h3>
            <p className="text-muted-foreground text-sm">Receive tailored recommendations to boost your rankings</p>
          </div>
        </div>
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Analyzer;
