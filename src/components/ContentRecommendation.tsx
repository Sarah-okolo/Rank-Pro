import { AlertCircle, FileCode } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useAiTips } from '@/store/AiTips';


function ContentRecommendation() {
  const aiTips = useAiTips((state) => state.aiTips);
  const [seoTips, setSeoTips] = useState<any>([]);
  

  useEffect(() => {
    if (aiTips) {
      console.log(aiTips);
      // Extract SEO tips from the AI response and store them in an array
      const seoTips = aiTips
      .split(/\n\d+\.\s/) // Split at numbered points
      .slice(1) // Remove the first empty item
      .map(section => {
        const parts = section.split(/:\s(.+)/); // Split at first `:` to separate title and details
        return {
          tip: parts[0].trim(), // Extract tip title
          details: parts[1]?.replace(/\(Source:\s\[\d+\]\)/g, "").trim() || "" // Extract details & remove (Source: [x])
        };
      });
      console.log(seoTips);
      setSeoTips(seoTips);
    }
  }, [aiTips]);


  return (
    <>
      <div className="neo-blur rounded-lg p-6">
          <div className="flex items-center mb-6">
            <AlertCircle className="h-6 w-6 text-yellow-500 mr-3" />
            <h3 className="text-2xl font-semibold text-accent-foreground">Optimization Tips</h3>
          </div>
          <ul className="space-y-4">
            {
              seoTips?.map((tip: any, index: number) => (
                <li key={index} className="flex space-x-3 mb-2">
                  <div className="flex-shrink-0 rounded-full p-1 bg-green-100 text-green-500 dark:bg-green-900">
                    <FileCode className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-xl brightness-75 text-left text-accent-foreground">{tip.tip}</p>
                    <p className="text-muted-foreground text-sm brightness-125 text-left">{tip.details}</p>
                  </div>
                </li>
              ))
            }
          </ul>
      </div>
    </>
  )
}

export default ContentRecommendation