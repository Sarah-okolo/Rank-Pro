
import React from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { Input } from '@progress/kendo-react-inputs';
import { Scan } from 'lucide-react';
import { Loader } from '@progress/kendo-react-indicators';
import { FloatingLabel} from '@progress/kendo-react-labels';


interface AnalyzerProps {
  url: string;
  setUrl: (url: string) => void;
  onAnalyze: (url: string) => void;
  isAnalyzing: boolean;
}

const SeoAnalyzer: React.FC<AnalyzerProps> = ({ url, setUrl, onAnalyze, isAnalyzing }) => {
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(url);
  };


  return (
    <section id="analyzer" className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-12 md:py-20">
      <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <span className="inline-block text-xs bg-gradient-primary text-white px-3 py-1 rounded-full mb-4">
          Boost Your Website Visibility
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight grid gap-0">
          <span className="bg-gradient-primary bg-clip-text text-transparent">Analyze Your Website</span>
          <br />
          <span className='text-3xl md:text-4xl lg:text-5xl relative bottom-6'>For Detailed Insights</span>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
          Enter a website URL below to get a comprehensive analysis on the website's SEO performance.
        </p>
      </div>

      <div className="w-full max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.4s' }}>
        <div className="neo-blur rounded-xl p-8 md:px-20">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <FloatingLabel label={'Website URL'} editorId='url' editorValue={url} className='w-full text-[#0EA5E9] font-semibold scale-110'>
                <Input id='url' name="url" value={url} onChange={(e) => setUrl(e.value)} disabled={isAnalyzing}
                className="w-full h-12 border text-sm border-slate-300 dark:border-slate-700" placeholder="https://example.com"/>
              </FloatingLabel>
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
                    <Loader size="medium" type="pulsing" />
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
          </form>
        </div>
      </div>
    </section>
  );
};

export default SeoAnalyzer;
