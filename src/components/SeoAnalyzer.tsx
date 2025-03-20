
import React from 'react';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { Button } from '@progress/kendo-react-buttons';
import { Link, Scan, BarChart4 } from 'lucide-react';
import { useSeoAnalysis } from '@/hooks/useSeoAnalysis';
import { Loader } from '@progress/kendo-react-indicators';

interface AnalyzerProps {
  url: string;
  setUrl: (url: string) => void;
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
}

const SeoAnalyzer: React.FC<AnalyzerProps> = ({ url, setUrl, onAnalyze, isAnalyzing }) => {
  const handleSubmit = (dataItem: { url: string }) => {
    onAnalyze(dataItem.url);
  };

  return (
    <section id="analyzer" className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-12 md:py-20">
      <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <span className="inline-block text-xs bg-gradient-primary text-white px-3 py-1 rounded-full mb-4">
          Boost Your Website Visibility
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
          <span className="bg-gradient-primary bg-clip-text text-transparent">Optimize Your SEO</span>
          <br />
          <span>For Maximum Impact</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
          Enter your website URL below to get a comprehensive SEO analysis with actionable tips to improve your site's visibility.
        </p>
      </div>

      <div className="w-full max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.4s' }}>
        <div className="neo-blur rounded-xl p-8">
          <Form
            onSubmit={handleSubmit}
            initialValues={{ url }}
            render={(formRenderProps) => (
              <FormElement>
                <div className="mb-6">
                  <Field
                    id="url"
                    name="url"
                    component={Input}
                    label="Website URL"
                    placeholder="https://example.com"
                    value={url}
                    onChange={(e) => setUrl(e.value)}
                    disabled={isAnalyzing}
                    className="w-full k-input-md"
                  />
                </div>
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={isAnalyzing}
                    className="k-button k-button-md k-rounded-md bg-gradient-primary hover:opacity-90 text-white px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70"
                    style={{ border: 'none' }}
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center">
                        <Loader size="small" type="pulsing" />
                        <span className="ml-2">Analyzing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Scan className="mr-2 h-5 w-5" />
                        <span>Analyze Website</span>
                      </div>
                    )}
                  </Button>
                </div>
              </FormElement>
            )}
          />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center animate-fade-up" style={{ animationDelay: '0.6s' }}>
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
      </div>
    </section>
  );
};

export default SeoAnalyzer;
