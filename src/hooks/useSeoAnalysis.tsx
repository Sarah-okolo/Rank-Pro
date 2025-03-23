
import { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { useAiTips } from '@/store/AiTips';


export interface SeoMetrics {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  pageSpeed: number;
  mobileCompatibility: number;
  hasTitle: string;
  metaDescriptionLength: number;
  h1Count: number;
  imageAltTags: number;
  brokenLinks: number;
  security: number;
  robots: number;
  contentSecurityPolicy: number;
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
  hasTitle: 'Missing',
  metaDescriptionLength: 0,
  h1Count: 0,
  imageAltTags: 0,
  brokenLinks: 0,
  security: 0,
  robots: 0,
  contentSecurityPolicy: 0,
  status: 'idle',
};

const OptimizationTips: OptimizationTip[] = [
  {
    category: 'Meta Tags',
    title: 'Optimize meta description',
    description: 'Your meta description should be between 120-158 characters and include your target keywords.',
    priority: 'high',
    impact: 85,
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

  const setAiTips = useAiTips((state) => state.setAiTips);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  


// Function to analyze the website URL and fetch SEO metrics
  const analyzeWebsite = async (url: string) => {
    if (!isValidUrl(url)) {
      toast.error('Please enter a valid URL');
      return;
    }

    setIsAnalyzing(true);
    setMetrics({ ...initialMetrics, status: 'loading' });
    
    
    try {
      const API_KEY = import.meta.env.VITE_GPSI_AUTHKEY;
      const Gres = await axios.get(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&category=performance&category=accessibility&category=seo&category=best-practices&key=${API_KEY}`)

      console.log(Gres.data.lighthouseResult);
      const data = Gres.data.lighthouseResult;

      // SEO metrics
      const Metrics: SeoMetrics = {
        performance: Math.round(data?.categories?.performance?.score * 100) || 0, // 0-100 
        accessibility: Math.round(data?.categories?.accessibility?.score * 100) || 0, // 0-100 
        bestPractices: Math.round(data?.categories["best-practices"]?.score * 100) || 0, // 0-100 
        seo: Math.round(data.categories.seo.score * 100) || 0, // 0-100
        pageSpeed: parseFloat((data.audits["speed-index"].numericValue / 1000).toFixed(1)) || 0, // seconds
        mobileCompatibility: data.audits.viewport.score * 100, // 80-100
        hasTitle: data.audits["document-title"].score ? "Valid" : "Missing", 
        metaDescriptionLength: (data.audits["meta-description"].score ? 1 : 0),
        h1Count: Math.round(data.audits["heading-order"].score) || 0,
        imageAltTags: Math.round(data.audits["image-alt"].score * 100) || 0, // 0-100
        brokenLinks: data.audits["http-status-code"].numericValue === 200 ? 0 : 1,
        security: data.audits["is-on-https"].score * 100 || 0, 
        robots: data.audits["robots-txt"].score * 100 || 0,
        contentSecurityPolicy: data.audits["csp-xss"].score * 100 || 0,
        status: 'success',
      };
      
      setMetrics(Metrics);

      // convert metrics object to string
      const metricsString = Object.entries(Metrics)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ");

      // Call OpenAI API to generate optimization tips based on gotten metrics
      const OpenApioptions = {
        method: 'POST',
        url: 'https://open-ai21.p.rapidapi.com/conversationllama',
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_OPENAI_APIKEY,
          'x-rapidapi-host': 'open-ai21.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        data: {
          messages: [
            {
              role: 'user',
              content: `Based on the following metrics, ${metricsString}, in a numbered list(e.g 1. 2. 3.), provide tips to improve this website's SEO`
            }
          ],
          web_access: true
        }
      };

      const response = await axios.request(OpenApioptions);
      setAiTips(response.data.result);
      console.log(response.data.result);
    
      
      // Filter optimization tips based on metrics
      const filteredTips = OptimizationTips.filter(tip => {
        if (tip.category === 'Meta Tags' && Metrics.metaDescriptionLength < 120) return true;
        if (tip.category === 'Performance' && Metrics.pageSpeed > 3) return true;
        if (tip.category === 'Links' && Metrics.brokenLinks > 0) return true;
        if (tip.category === 'Mobile' && Metrics.mobileCompatibility < 90) return true;
        if (tip.category === 'Structure' && Metrics.h1Count !== 1) return true;
        if (tip.category === 'Technical' && Metrics.seo < 60) return true;
        if (tip.category === 'Security' && Metrics.security < 50) return true;
        return false;
      });
      
      setOptimizationTips(filteredTips);
      toast.success('Analysis complete!');
    } 
    catch (error) {
      console.error('Analysis error:', error);
      setMetrics({ ...initialMetrics, status: 'error' });
      toast.error('Failed to analyze website. Please try again.');
    } 
    finally {
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
