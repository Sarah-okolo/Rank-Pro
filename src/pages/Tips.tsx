
import React from 'react';
import { useSeoAnalysis } from '@/hooks/useSeoAnalysis';
import Header from '@/components/Header';
import OptimizationTips from '@/components/OptimizationTips';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Button } from '@progress/kendo-react-buttons';
import { useNavigate } from 'react-router-dom';

const Tips: React.FC = () => {
  const {
    metrics,
    optimizationTips,
  } = useSeoAnalysis();

  const navigate = useNavigate();

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Header />
        
        <main className="pt-16">
          {metrics.status === 'success' ? (
            <OptimizationTips tips={optimizationTips} />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in px-6">
              <div className="neo-blur rounded-xl p-8 text-center max-w-lg">
                <h2 className="text-2xl font-bold mb-4">No Optimization Tips Yet</h2>
                <p className="text-muted-foreground mb-8">
                  You need to analyze a website first to see optimization tips. Please go to the Analyzer page to start.
                </p>
                <Button
                  primary={true}
                  onClick={() => navigate('/analyzer')}
                  className="px-6 py-3"
                >
                  Go to Analyzer
                </Button>
              </div>
            </div>
          )}
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Tips;
