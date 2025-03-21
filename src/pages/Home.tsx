
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { Anchor, BarChart2, Lightbulb, TrendingUp, Activity, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PanelBar, PanelBarItem } from '@progress/kendo-react-layout';
import { Card, CardTitle, CardBody, CardActions } from '@progress/kendo-react-layout';

const Home: React.FC = () => {
  // Sample SEO tips data
  const seoTips = [
    { id: 1, category: 'Performance', title: 'Optimize Page Speed', description: 'Fast-loading pages rank higher and provide better user experience.' },
    { id: 2, category: 'Content', title: 'Create Quality Content', description: 'Content that provides value to users is favored by search engines.' },
    { id: 3, category: 'Technical', title: 'Use Responsive Design', description: 'Mobile-friendly websites are prioritized in search results.' },
  ];

  // Premium service tiers
  const serviceTiers = [
    { 
      title: 'Basic', 
      price: '$29/mo', 
      features: ['Website analysis', 'Basic metrics', 'Weekly reports'],
      recommended: false
    },
    { 
      title: 'Pro', 
      price: '$79/mo', 
      features: ['Advanced analysis', 'Competitor tracking', 'Daily reports', 'Custom recommendations'],
      recommended: true
    },
    { 
      title: 'Enterprise', 
      price: '$199/mo', 
      features: ['Full-suite analytics', 'API access', '24/7 support', 'Custom dashboards', 'Team collaboration'],
      recommended: false
    }
  ];

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

            {/* Premium Kendo React PanelBar Component - styled with Tailwind */}
            <div className="mt-16 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-2xl font-bold mb-6 text-center">SEO Best Practices</h2>
              <div className="neo-blur rounded-xl p-6">
                <PanelBar 
                  className="bg-transparent border-none"
                  expandMode="multiple"
                >
                  <PanelBarItem 
                    title="On-Page Optimization" 
                    expanded={true}
                    className="text-white border-b border-white/10"
                  >
                    <div className="py-4 px-2">
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>Optimize meta titles and descriptions for better click-through rates</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>Use proper heading structure (H1, H2, H3) for content organization</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>Optimize images with descriptive alt text and proper sizing</span>
                        </li>
                      </ul>
                    </div>
                  </PanelBarItem>
                  <PanelBarItem 
                    title="Technical SEO" 
                    className="text-white border-b border-white/10"
                  >
                    <div className="py-4 px-2">
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>Ensure your website has a valid XML sitemap</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>Implement proper canonical tags to avoid duplicate content issues</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>Use schema markup to enhance search result appearance</span>
                        </li>
                      </ul>
                    </div>
                  </PanelBarItem>
                  <PanelBarItem 
                    title="Content Strategy" 
                    className="text-white border-b border-white/10"
                  >
                    <div className="py-4 px-2">
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>Create comprehensive, value-driven content that answers user questions</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>Maintain a consistent publishing schedule for fresh content</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                          <span>Research and target relevant keywords for your industry</span>
                        </li>
                      </ul>
                    </div>
                  </PanelBarItem>
                </PanelBar>
              </div>
            </div>

            {/* Premium Kendo React Card Components - styled with Tailwind */}
            <div className="mt-16 animate-fade-up" style={{ animationDelay: '0.6s' }}>
              <h2 className="text-2xl font-bold mb-6 text-center">Choose Your Plan</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {serviceTiers.map((tier, index) => (
                  <Card 
                    key={index} 
                    className={`neo-blur rounded-xl overflow-hidden border border-white/10 ${tier.recommended ? 'ring-2 ring-primary' : ''}`}
                  >
                    {tier.recommended && (
                      <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                        Recommended
                      </div>
                    )}
                    <CardTitle className="p-6 text-center">
                      <h3 className="text-xl font-bold">{tier.title}</h3>
                      <div className="text-3xl font-bold mt-2 bg-gradient-primary bg-clip-text text-transparent">
                        {tier.price}
                      </div>
                    </CardTitle>
                    <CardBody>
                      <ul className="space-y-3 mb-6">
                        {tier.features.map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <CheckCircle className="h-5 w-5 text-primary mr-2" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardBody>
                    <CardActions className="p-6 pt-0">
                      <Button
                        className="w-full"
                        variant={tier.recommended ? "default" : "outline"}
                      >
                        Get Started
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </div>
            </div>

            {/* Expert SEO Tips Section */}
            <div className="mt-16 animate-fade-up" style={{ animationDelay: '0.8s' }}>
              <h2 className="text-2xl font-bold mb-6 text-center">Expert SEO Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {seoTips.map((tip) => (
                  <div key={tip.id} className="neo-blur rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      {tip.category === 'Performance' && <TrendingUp className="h-6 w-6 text-primary mr-2" />}
                      {tip.category === 'Content' && <Lightbulb className="h-6 w-6 text-primary mr-2" />}
                      {tip.category === 'Technical' && <Activity className="h-6 w-6 text-primary mr-2" />}
                      <span className="text-sm font-medium text-primary">{tip.category}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                    <p className="text-muted-foreground">{tip.description}</p>
                    <Button
                      variant="ghost"
                      className="mt-4 text-primary hover:text-primary/80"
                    >
                      Learn More
                    </Button>
                  </div>
                ))}
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
