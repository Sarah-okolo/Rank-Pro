
import { useState } from 'react';
import { toast } from 'sonner';

export interface SeoMetrics {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  pageSpeed: number;
  mobileCompatibility: number;
  wordCount: number;
  titleLength: number;
  metaDescriptionLength: number;
  h1Count: number;
  imageAltTags: number;
  brokenLinks: number;
  status: 'idle' | 'loading' | 'success' | 'error';
}

export interface OptimizationTip {
  category: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  impact: number; // 1-100
}

const initialMetrics: SeoMetrics = {
  performance: 0,
  accessibility: 0,
  bestPractices: 0,
  seo: 0,
  pageSpeed: 0,
  mobileCompatibility: 0,
  wordCount: 0,
  titleLength: 0,
  metaDescriptionLength: 0,
  h1Count: 0,
  imageAltTags: 0,
  brokenLinks: 0,
  status: 'idle',
};

const mockOptimizationTips: OptimizationTip[] = [
  {
    category: 'Meta Tags',
    title: 'Optimize meta description',
    description: 'Your meta description should be between 120-158 characters and include your target keywords.',
    priority: 'high',
    impact: 85,
  },
  {
    category: 'Content',
    title: 'Add more content to your page',
    description: 'Pages with 1000+ words tend to rank better in search results.',
    priority: 'medium',
    impact: 75,
  },
  {
    category: 'Performance',
    title: 'Optimize images',
    description: 'Compress images to reduce page load time without sacrificing quality.',
    priority: 'high',
    impact: 90,
  },
  {
    category: 'Links',
    title: 'Fix broken links',
    description: 'Broken links create a poor user experience and can negatively impact SEO.',
    priority: 'high',
    impact: 95,
  },
  {
    category: 'Mobile',
    title: 'Improve mobile responsiveness',
    description: 'Ensure your website is fully responsive on all mobile devices.',
    priority: 'high',
    impact: 88,
  },
  {
    category: 'Structure',
    title: 'Use proper header hierarchy',
    description: 'Implement a logical H1-H6 structure to help search engines understand your content.',
    priority: 'medium',
    impact: 70,
  },
  {
    category: 'Technical',
    title: 'Implement schema markup',
    description: 'Add structured data to help search engines better understand your content.',
    priority: 'medium',
    impact: 65,
  },
  {
    category: 'Security',
    title: 'Switch to HTTPS',
    description: 'Secure your website with SSL to improve trust and rankings.',
    priority: 'high',
    impact: 92,
  },
];

export const useSeoAnalysis = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [metrics, setMetrics] = useState<SeoMetrics>(initialMetrics);
  const [optimizationTips, setOptimizationTips] = useState<OptimizationTip[]>([]);
  const [activeTabId, setActiveTabId] = useState(0);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const analyzeWebsite = async (url: string) => {
    if (!isValidUrl(url)) {
      toast.error('Please enter a valid URL');
      return;
    }

    setIsAnalyzing(true);
    setMetrics({ ...initialMetrics, status: 'loading' });
    
    // Simulating API call with timeout
    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Mock data for demonstration purposes
      const mockMetrics: SeoMetrics = {
        performance: Math.floor(Math.random() * 40) + 60, // 60-100
        accessibility: Math.floor(Math.random() * 30) + 70, // 70-100
        bestPractices: Math.floor(Math.random() * 35) + 65, // 65-100
        seo: Math.floor(Math.random() * 25) + 75, // 75-100
        pageSpeed: Math.floor(Math.random() * 4) + 2, // 2-6 seconds
        mobileCompatibility: Math.floor(Math.random() * 20) + 80, // 80-100
        wordCount: Math.floor(Math.random() * 1500) + 500, // 500-2000
        titleLength: Math.floor(Math.random() * 40) + 30, // 30-70
        metaDescriptionLength: Math.floor(Math.random() * 80) + 80, // 80-160
        h1Count: Math.floor(Math.random() * 3) + 1, // 1-4
        imageAltTags: Math.floor(Math.random() * 60) + 40, // 40-100%
        brokenLinks: Math.floor(Math.random() * 5), // 0-5
        status: 'success',
      };
      
      setMetrics(mockMetrics);
      
      // Filter optimization tips based on metrics
      const filteredTips = mockOptimizationTips.filter(tip => {
        if (tip.category === 'Meta Tags' && mockMetrics.metaDescriptionLength < 120) return true;
        if (tip.category === 'Content' && mockMetrics.wordCount < 1000) return true;
        if (tip.category === 'Performance' && mockMetrics.pageSpeed > 3) return true;
        if (tip.category === 'Links' && mockMetrics.brokenLinks > 0) return true;
        if (tip.category === 'Mobile' && mockMetrics.mobileCompatibility < 90) return true;
        if (tip.category === 'Structure' && mockMetrics.h1Count !== 1) return true;
        if (tip.category === 'Technical') return Math.random() > 0.5;
        if (tip.category === 'Security') return Math.random() > 0.7;
        return false;
      });
      
      setOptimizationTips(filteredTips);
      toast.success('Analysis complete!');
    } catch (error) {
      console.error('Analysis error:', error);
      setMetrics({ ...initialMetrics, status: 'error' });
      toast.error('Failed to analyze website. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    url,
    setUrl,
    isAnalyzing,
    metrics,
    optimizationTips,
    analyzeWebsite,
    activeTabId,
    setActiveTabId,
  };
};
