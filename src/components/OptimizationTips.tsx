import React from 'react';
import { Card, CardBody, CardTitle } from '@progress/kendo-react-layout';
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
import { ProgressBar } from '@progress/kendo-react-progressbars';
import { OptimizationTip } from '@/hooks/useSeoAnalysis';
import { ArrowUp, Zap, FileCog, Wifi, FileEdit, ListChecks, ArrowUpRight } from 'lucide-react';
import ContentRecommendation from './ContentRecommendation';

interface OptimizationTipsProps {
  tips: OptimizationTip[];
}

const OptimizationTips: React.FC<OptimizationTipsProps> = ({ tips }) => {
  if (!tips.length) {
    return null;
  }

  // Group tips by category
  const tipsByCategory = tips.reduce((acc, tip) => {
    if (!acc[tip.category]) {
      acc[tip.category] = [];
    }
    acc[tip.category].push(tip);
    return acc;
  }, {} as Record<string, OptimizationTip[]>);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Meta Tags': return <FileCog className="h-5 w-5" />;
      case 'Content': return <FileEdit className="h-5 w-5" />;
      case 'Performance': return <Zap className="h-5 w-5" />;
      case 'Links': return <ArrowUpRight className="h-5 w-5" />;
      case 'Mobile': return <Wifi className="h-5 w-5" />;
      case 'Structure': return <ListChecks className="h-5 w-5" />;
      case 'Technical': return <FileCog className="h-5 w-5" />;
      case 'Security': return <Wifi className="h-5 w-5" />;
      default: return <ArrowUp className="h-5 w-5" />;
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getImpactBarColor = (impact: number) => {
    if (impact >= 80) return '#ef4444'; // red for high impact
    if (impact >= 60) return '#f59e0b'; // amber for medium impact
    return '#10b981'; // green for low impact
  };

  return (
    <section id="tips" className="min-h-screen px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <span className="inline-block text-xs bg-gradient-secondary text-white px-3 py-1 rounded-full mb-4">
            Actionable Insights
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            SEO Optimization Recommendations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Based on our analysis, here are personalized recommendations to improve your website's search engine ranking.
          </p>
        </div>

          <Card className="bg-transparent border-0 shadow-none mb-8 neo-blur rounded-xl p-6 md:p-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <CardTitle className="text-xl font-semibold mb-6 brightness-200">High Priority Actions</CardTitle>
            <CardBody>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tips
                  .filter(tip => tip.priority === 'high')
                  .map((tip, index) => (
                    <Card key={index} className="neo-blur rounded-lg p-6 flex flex-col h-full">
                      <div className="flex items-center mb-4">
                        <div className="rounded-full p-2 bg-primary/90 mr-3">
                          {getCategoryIcon(tip.category)}
                        </div>
                        <span className={`text-xs font-medium uppercase px-2 py-0.5 rounded-full ${getPriorityColor(tip.priority)}`}>
                          {tip.priority}
                        </span>
                      </div>
                      <CardTitle className="text-lg font-medium mb-2 brightness-200">{tip.title}</CardTitle>
                      <CardBody>
                        <p className="text-muted-foreground text-sm mb-4 flex-grow">{tip.description}</p>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Impact</span>
                            <span>{tip.impact}%</span>
                          </div>
                          <ProgressBar 
                            value={tip.impact} 
                            style={{ height: "6px" }}
                            progressStyle={{ 
                              backgroundColor: getImpactBarColor(tip.impact),
                              transition: "width 1s ease-in-out"
                            }}
                          />
                        </div>
                      </CardBody>
                    </Card>
                  ))}
              </div>
            </CardBody>
          </Card>

        <Card className="neo-blur rounded-xl p-6 md:p-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <CardTitle className="text-xl font-semibold mb-6 brightness-200">All Recommendations by Category</CardTitle>
          <CardBody>
          <PanelBar>
            {Object.entries(tipsByCategory).map(([category, categoryTips], index) => (
              <PanelBarItem 
                key={index} 
                title={
                  <div className="flex items-center py-2">
                    <div className="rounded-full p-1 bg-primary/10 mr-3">
                      {getCategoryIcon(category)}
                    </div>
                    <span>{category}</span>
                    <span className="ml-auto text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                      {categoryTips.length} {categoryTips.length === 1 ? 'tip' : 'tips'}
                    </span>
                  </div>
                }
              >
                <div className="space-y-4 p-4">
                  {categoryTips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="neo-blur rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{tip.title}</h4>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getPriorityColor(tip.priority)}`}>
                          {tip.priority}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{tip.description}</p>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Impact</span>
                          <span>{tip.impact}%</span>
                        </div>
                        <ProgressBar 
                          value={tip.impact} 
                          style={{ height: "6px" }}
                          progressStyle={{ 
                            backgroundColor: getImpactBarColor(tip.impact),
                            transition: "width 1s ease-in-out"
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </PanelBarItem>
            ))}
          </PanelBar>
          
          <div className="mt-8 p-6 neo-blur rounded-lg">
            <div className="flex items-center mb-4">
              <Zap className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-xl font-semibold text-accent-foreground">Want to go further?</h3>
            </div>
            <p className="mb-4 text-muted-foreground">
              Implementing these recommendations will significantly improve your website's SEO performance. 
              For more advanced strategies and personalized guidance, consider:
            </p>
            
            <ContentRecommendation />
          </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};

export default OptimizationTips;
