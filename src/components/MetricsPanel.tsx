
import React from 'react';
import { SeoMetrics } from '@/hooks/useSeoAnalysis';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import { Chart, ChartSeries, ChartSeriesItem, ChartValueAxis, ChartValueAxisItem, ChartCategoryAxis, ChartCategoryAxisItem } from '@progress/kendo-react-charts';
import { ProgressBar } from '@progress/kendo-react-progressbars';
import AnimatedCounter from './AnimatedCounter';
import { Clock, Activity, BarChart, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { anchorIcon } from '@progress/kendo-svg-icons';
import { Button } from '@progress/kendo-react-buttons';
import { Badge } from '@/components/ui/badge';
import '@progress/kendo-theme-default/dist/all.css';
import { it } from 'node:test';


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
    { metric: 'Title', value: metrics.hasTitle, target: 'Valid' },
    { metric: 'Meta Description', value: metrics.metaDescriptionLength, target: '1' },
    { metric: 'H1 Tags', value: metrics.h1Count, target: '1' },
    { metric: 'Image Alt Tags', value: `${metrics.imageAltTags}%`, target: '100%' },
    { metric: 'Broken Links', value: metrics.brokenLinks, target: '0' },
  ];

  const getColorForScore = (score: number) => {
    if (score >= 90) return '#10b981'; // green
    if (score >= 70) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  const showTips = () => {
    const tipsBlock = document.getElementById('optimization');
    tipsBlock.style.display='block';
    tipsBlock.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
  };

  function getPageSpeedPercentage(pageSpeed: any) {
    return Math.max(0, Math.min(100, 100 - (pageSpeed * 10)));
  }

  return (
    <section id="metrics" className="min-h-screen px-6 pb-16 pt-14 mt-6">
      <div className="flex flex-wrap justify-end gap-4 mb-14 animate-fade-up">
        <Link to="/analyzer">
          <Button  className="inline-flex items-center px-6 py-3 rounded-lg bg-orange-500 text-black hover:bg-orange-500/80 transition-colors" svgIcon={anchorIcon} onClick={showTips}>
            Get optimization tips
          </Button>
        </Link>
      </div>
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
          <TabStrip
            selected={activeTabId}
            onSelect={handleTabSelect}
            animation={true}
          >
            <TabStripTab title="Overview">
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
                        value={getPageSpeedPercentage(metrics.pageSpeed)} 
                        style={{ height: "8px" }}
                        progressStyle={{ 
                          backgroundColor: getColorForScore(getPageSpeedPercentage(metrics.pageSpeed)),
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
                          // color={overviewData.map(item => getColorForScore(item.value))}
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
            </TabStripTab>
            
            <TabStripTab title="Content Analysis">
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
                        if (item.metric === 'Title') {
                            if (item.value === item.target) {
                              status = 'success';
                              statusText = 'Good';
                            }
                          } else if (item.metric === 'Meta Description') {
                            const value = Number(item.value);
                            if (value >= 120 && value <= 158) {
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
              </div>
            </TabStripTab>
            
            <TabStripTab title="Technical SEO">
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
                          value={getPageSpeedPercentage(metrics.pageSpeed)} 
                          style={{ height: "8px" }}
                          progressStyle={{ 
                            backgroundColor: getColorForScore(getPageSpeedPercentage(metrics.pageSpeed)),
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
                        {metrics.security ? (
                            <Badge variant="default">HTTPS Enabled</Badge>
                          ) : (
                            <Badge variant="destructive">HTTP Enabled</Badge>
                          )
                        }
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Mobile Responsiveness</span>
                        <Badge variant={metrics.mobileCompatibility >= 90 ? "default" : "secondary"}>
                          {metrics.mobileCompatibility >= 90 ? 'Responsive' : 'Needs Improvement'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Content Security Policy</span>
                        { metrics.contentSecurityPolicy ? (
                            <Badge variant="default">Present</Badge>
                          ) : (
                            <Badge variant="destructive">Absent</Badge>
                          )
                        }
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Robots.txt</span>
                        { metrics.robots ? (
                            <Badge variant="default">Properly Configured</Badge>
                          ) : (
                            <Badge variant="destructive">Not Found</Badge>
                          )
                        }
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
                          {metrics.h1Count === 1 ? (
                            <span className="text-green-500">✓</span>
                          ) : (
                            <span className="text-yellow-500">⚠</span>
                          )}
                        </li>
                        <li className="flex justify-between">
                          <span>Image Alt Tags</span>
                          {metrics.imageAltTags >= 90 ? (
                            <span className="text-green-500">✓</span>
                          ) : (
                            <span className="text-yellow-500">⚠</span>
                          )}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Technical Factors</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>Mobile Friendly</span>
                          {metrics.mobileCompatibility >= 90 ? (
                            <span className="text-green-500">✓</span>
                          ) : (
                            <span className="text-yellow-500">⚠</span>
                          )}
                        </li>
                        <li className="flex justify-between">
                          <span>Page Speed</span>
                          <span className={metrics.pageSpeed <= 3 ? "text-green-500" : "text-yellow-500"}>
                            {metrics.pageSpeed <= 3 ? "✓" : "⚠"}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span>HTTPS</span>
                          {metrics.security ? (
                            <span className="text-green-500">✓</span>
                          ) : (
                            <span className="text-yellow-500">⚠</span>
                          )}
                        </li>
                        <li className="flex justify-between">
                          <span>Performance</span>
                          {metrics.performance >= 90 ? (
                            <span className="text-green-500">✓</span>
                          ) : (
                            <span className="text-yellow-500">⚠</span>
                          )}
                        </li>
                        <li className="flex justify-between">
                          <span>Accessibility</span>
                          {metrics.accessibility >= 90 ? (
                            <span className="text-green-500">✓</span>
                          ) : (
                            <span className="text-yellow-500">⚠</span>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </TabStripTab>
          </TabStrip>
        </div>
      </div>
    </section>
  );
};

export default MetricsPanel;
