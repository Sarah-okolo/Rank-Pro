
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { Anchor, BarChart2, Lightbulb } from 'lucide-react';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';

// Sample featured websites data
const featuredWebsites = [
  { id: 1, name: 'Travel Blog', url: 'travelblog.com', score: 95, category: 'Travel' },
  { id: 2, name: 'Tech News', url: 'technews.io', score: 89, category: 'Technology' },
  { id: 3, name: 'Food Recipes', url: 'recipes.net', score: 92, category: 'Food' },
  { id: 4, name: 'Fitness Guide', url: 'fitnessguide.org', score: 87, category: 'Health' },
];

const Home: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Header />
        
        <main className="pt-20">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="text-center mb-16 animate-fade-up">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Welcome to <span className="bg-gradient-primary bg-clip-text text-transparent">OceanRank Pro</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Your complete toolbox for analyzing, monitoring, and improving your website's SEO performance.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/analyzer" className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
                  <Anchor className="mr-2 h-5 w-5" />
                  Analyze Your Site
                </Link>
                <Link to="/metrics" className="inline-flex items-center px-6 py-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors">
                  <BarChart2 className="mr-2 h-5 w-5" />
                  View Metrics
                </Link>
                <Link to="/tips" className="inline-flex items-center px-6 py-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors">
                  <Lightbulb className="mr-2 h-5 w-5" />
                  Get Optimization Tips
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
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

            {/* Premium Kendo React Grid Component */}
            <div className="mt-16 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-2xl font-bold mb-6 text-center">Featured High-Ranking Websites</h2>
              <div className="neo-blur rounded-xl p-6">
                <Grid
                  data={featuredWebsites}
                  style={{ height: '300px' }}
                >
                  <GridColumn field="name" title="Website Name" />
                  <GridColumn field="url" title="URL" />
                  <GridColumn field="score" title="SEO Score" />
                  <GridColumn field="category" title="Category" />
                  <GridColumn 
                    title="Actions" 
                    cell={(props) => (
                      <td>
                        <Button 
                          themeColor="primary" 
                          fillMode="solid"
                          onClick={() => console.log(`Analyze ${props.dataItem.name}`)}
                        >
                          Analyze
                        </Button>
                      </td>
                    )}
                  />
                </Grid>
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
