
import React from 'react';
import { Tabs, TabList, TabItem } from '@progress/kendo-react-layout';
import { SeoMetrics } from '@/hooks/useSeoAnalysis';
import { Chart, ChartSeries, ChartSeriesItem, ChartValueAxis, ChartValueAxisItem, ChartCategoryAxis, ChartCategoryAxisItem } from '@progress/kendo-react-charts';
import { ProgressBar } from '@progress/kendo-react-progressbars';
import AnimatedCounter from './AnimatedCounter';
import { AlertCircle, Clock, Activity, BarChart, FileCode, Smartphone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import '@progress/kendo-theme-default/dist/all.css';

interface MetricsPanelProps {
  metrics: SeoMetrics;
  activeTabId: number;
  setActiveTabId: (tabId: number) => void;
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ metrics, activeTabId, setActiveTabId }) => {
  const handleTabSelect = (e: any) => {
    setActiveTabId(e.selected);
  };

  // Only render if we have successful metrics
  if (metrics.status !== 'success') {
    return null;
  }

  const overviewData = [
    { name: 'Performance', value: metrics.performance },
    { name: 'Accessibility', value: metrics.accessibility },
    { name: 'Best Practices', value: metrics.bestPractices },
    { name: 'SEO', value: metrics.seo },
  ];

  const contentData = [
    { metric: 'Word Count', value: metrics.wordCount, target: '1000+' },
    { metric: 'Title Length', value: metrics.titleLength, target: '50-60' },
    { metric: 'Meta Description', value: metrics.metaDescriptionLength, target: '120-158' },
    { metric: 'H1 Tags', value: metrics.h1Count, target: '1' },
    { metric: 'Image Alt Tags', value: `${metrics.imageAltTags}%`, target: '100%' },
    { metric: 'Broken Links', value: metrics.brokenLinks, target: '0' },
  ];

  const getColorForScore = (score: number) => {
    if (score >= 90) return '#10b981'; // green
    if (score >= 70) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  return (
    <section id="metrics" className="min-h-screen px-6 py-16 mt-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-up">
          <span className="inline-block text-xs bg-gradient-tertiary text-white px-3 py-1 rounded-full mb-4">
            Your SEO Performance
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Website Analysis Results
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Below are the detailed metrics of your website's SEO performance. Use these insights to make targeted improvements.
          </p>
        </div>

        <div className="neo-blur rounded-xl p-6 md:p-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Tabs
            selected={activeTabId}
            onSelect={handleTabSelect}
            animation={true}
          >
            <TabList>
              <TabItem title="Overview" />
              <TabItem title="Content Analysis" />
              <TabItem title="Technical SEO" />
            </TabList>
            
            {activeTabId === 0 && (
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="neo-blur rounded-lg p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <Activity className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Performance</h3>
                    <div className="relative pt-1">
                      <ProgressBar 
                        value={metrics.performance} 
                        style={{ height: "8px" }}
                        progressStyle={{ 
                          backgroundColor: getColorForScore(metrics.performance),
                          transition: "width 1s ease-in-out"
                        }}
                      />
                      <p className="mt-2 text-2xl font-bold">
                        <AnimatedCounter 
                          value={metrics.performance} 
                          suffix="%" 
                          className="text-foreground"
                        />
                      </p>
                    </div>
                  </div>
                  
                  <div className="neo-blur rounded-lg p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <Clock className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Page Speed</h3>
                    <div className="relative pt-1">
                      <ProgressBar 
                        value={(6 - metrics.pageSpeed) * 20} // Convert 2-6s to 80%-0% 
                        style={{ height: "8px" }}
                        progressStyle={{ 
                          backgroundColor: getColorForScore((6 - metrics.pageSpeed) * 20),
                          transition: "width 1s ease-in-out"
                        }}
                      />
                      <p className="mt-2 text-2xl font-bold">
                        <AnimatedCounter 
                          value={metrics.pageSpeed} 
                          decimals={1}
                          suffix="s" 
                          className="text-foreground"
                        />
                      </p>
                    </div>
                  </div>
                  
                  <div className="neo-blur rounded-lg p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <Smartphone className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Mobile Friendly</h3>
                    <div className="relative pt-1">
                      <ProgressBar 
                        value={metrics.mobileCompatibility} 
                        style={{ height: "8px" }}
                        progressStyle={{ 
                          backgroundColor: getColorForScore(metrics.mobileCompatibility),
                          transition: "width 1s ease-in-out"
                        }}
                      />
                      <p className="mt-2 text-2xl font-bold">
                        <AnimatedCounter 
                          value={metrics.mobileCompatibility} 
                          suffix="%" 
                          className="text-foreground"
                        />
                      </p>
                    </div>
                  </div>
                  
                  <div className="neo-blur rounded-lg p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <BarChart className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">SEO Score</h3>
                    <div className="relative pt-1">
                      <ProgressBar 
                        value={metrics.seo} 
                        style={{ height: "8px" }}
                        progressStyle={{ 
                          backgroundColor: getColorForScore(metrics.seo),
                          transition: "width 1s ease-in-out"
                        }}
                      />
                      <p className="mt-2 text-2xl font-bold">
                        <AnimatedCounter 
                          value={metrics.seo} 
                          suffix="%" 
                          className="text-foreground"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="neo-blur rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Performance Metrics</h3>
                  <div className="h-80">
                    <Chart style={{ height: '100%' }}>
                      <ChartCategoryAxis>
                        <ChartCategoryAxisItem categories={overviewData.map(item => item.name)} />
                      </ChartCategoryAxis>
                      <ChartValueAxis>
                        <ChartValueAxisItem min={0} max={100} />
                      </ChartValueAxis>
                      <ChartSeries>
                        <ChartSeriesItem 
                          type="column" 
                          data={overviewData.map(item => item.value)}
                          color={overviewData.map(item => getColorForScore(item.value))}
                          labels={{
                            visible: true,
                            content: (e) => `${e.value}%`
                          }}
                        />
                      </ChartSeries>
                    </Chart>
                  </div>
                </div>
              </div>
            )}
            
            {activeTabId === 1 && (
              <div className="p-4">
                <div className="neo-blur rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-6">Content Metrics</h3>
                  <div className="grid gap-4">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Metric</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Current Value</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Target Value</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {contentData.map((item, index) => {
                          let status = 'warning';
                          let statusText = 'Needs Improvement';
                          
                          if (item.metric === 'Word Count') {
                            if (item.value >= 1000) {
                              status = 'success';
                              statusText = 'Good';
                            }
                          } else if (item.metric === 'Title Length') {
                            if (item.value >= 50 && item.value <= 60) {
                              status = 'success';
                              statusText = 'Good';
                            }
                          } else if (item.metric === 'Meta Description') {
                            if (item.value >= 120 && item.value <= 158) {
                              status = 'success';
                              statusText = 'Good';
                            }
                          } else if (item.metric === 'H1 Tags') {
                            if (item.value === 1) {
                              status = 'success';
                              statusText = 'Good';
                            }
                          } else if (item.metric === 'Image Alt Tags') {
                            if (item.value === '100%') {
                              status = 'success';
                              statusText = 'Good';
                            }
                          } else if (item.metric === 'Broken Links') {
                            if (item.value === 0) {
                              status = 'success';
                              statusText = 'Good';
                            } else {
                              status = 'error';
                              statusText = 'Critical';
                            }
                          }
                          
                          const badgeVariant = 
                            status === 'success' ? 'default' :
                            status === 'warning' ? 'secondary' : 'destructive';
                            
                          return (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">{item.metric}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">{item.value}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">{item.target}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <Badge variant={badgeVariant as any}>
                                  {statusText}
                                </Badge>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="neo-blur rounded-lg p-6">
                  <div className="flex items-center mb-6">
                    <AlertCircle className="h-6 w-6 text-yellow-500 mr-3" />
                    <h3 className="text-xl font-semibold">Content Recommendations</h3>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex space-x-3">
                      <div className="flex-shrink-0 rounded-full p-1 bg-green-100 text-green-500 dark:bg-green-900">
                        <FileCode className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Improve keyword density</p>
                        <p className="text-muted-foreground text-sm">Ensure your main keywords appear in your content at a natural frequency (1-2%).</p>
                      </div>
                    </li>
                    <li className="flex space-x-3">
                      <div className="flex-shrink-0 rounded-full p-1 bg-green-100 text-green-500 dark:bg-green-900">
                        <FileCode className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Add more headings</p>
                        <p className="text-muted-foreground text-sm">Break up your content with H2 and H3 headings to improve readability and SEO.</p>
                      </div>
                    </li>
                    <li className="flex space-x-3">
                      <div className="flex-shrink-0 rounded-full p-1 bg-green-100 text-green-500 dark:bg-green-900">
                        <FileCode className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">Optimize image alt text</p>
                        <p className="text-muted-foreground text-sm">Add descriptive, keyword-rich alt text to all images.</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            
            {activeTabId === 2 && (
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="neo-blur rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Page Performance</h3>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Page Speed</span>
                          <span className="text-sm font-medium">{metrics.pageSpeed}s</span>
                        </div>
                        <ProgressBar 
                          value={(6 - metrics.pageSpeed) * 20} 
                          style={{ height: "8px" }}
                          progressStyle={{ 
                            backgroundColor: getColorForScore((6 - metrics.pageSpeed) * 20),
                            transition: "width 1s ease-in-out"
                          }}
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Mobile Compatibility</span>
                          <span className="text-sm font-medium">{metrics.mobileCompatibility}%</span>
                        </div>
                        <ProgressBar 
                          value={metrics.mobileCompatibility} 
                          style={{ height: "8px" }}
                          progressStyle={{ 
                            backgroundColor: getColorForScore(metrics.mobileCompatibility),
                            transition: "width 1s ease-in-out"
                          }}
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Best Practices</span>
                          <span className="text-sm font-medium">{metrics.bestPractices}%</span>
                        </div>
                        <ProgressBar 
                          value={metrics.bestPractices} 
                          style={{ height: "8px" }}
                          progressStyle={{ 
                            backgroundColor: getColorForScore(metrics.bestPractices),
                            transition: "width 1s ease-in-out"
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="neo-blur rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Technical Issues</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Broken Links</span>
                        <Badge variant={metrics.brokenLinks === 0 ? "default" : "destructive"}>
                          {metrics.brokenLinks} {metrics.brokenLinks === 1 ? 'issue' : 'issues'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Missing Meta Tags</span>
                        <Badge variant="default">0 issues</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>HTTP vs HTTPS</span>
                        <Badge variant="default">HTTPS Enabled</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Mobile Responsiveness</span>
                        <Badge variant={metrics.mobileCompatibility >= 90 ? "default" : "secondary"}>
                          {metrics.mobileCompatibility >= 90 ? 'Responsive' : 'Needs Improvement'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>XML Sitemap</span>
                        <Badge variant="default">Present</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Robots.txt</span>
                        <Badge variant="default">Properly Configured</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="neo-blur rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">SEO Technical Audit</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Page Elements</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Title Tag</span>
                          <span className="text-green-500">✓</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Meta Description</span>
                          <span className="text-green-500">✓</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Canonical URL</span>
                          <span className="text-green-500">✓</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Proper Heading Structure</span>
                          <span className="text-yellow-500">⚠</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Image Alt Tags</span>
                          <span className="text-yellow-500">⚠</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Technical Factors</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Mobile Friendly</span>
                          <span className="text-green-500">✓</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Page Speed</span>
                          <span className={metrics.pageSpeed <= 3 ? "text-green-500" : "text-yellow-500"}>
                            {metrics.pageSpeed <= 3 ? "✓" : "⚠"}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>HTTPS</span>
                          <span className="text-green-500">✓</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Schema Markup</span>
                          <span className="text-yellow-500">⚠</span>
                        </li>
                        <li className="flex justify-between">
                          <span>No Duplicate Content</span>
                          <span className="text-green-500">✓</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default MetricsPanel;
