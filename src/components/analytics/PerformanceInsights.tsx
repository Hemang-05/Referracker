interface PerformanceInsightsProps {
    analytics: {
      totalSubmissions: number;
      totalReferrals: number;
      conversionRate: number;
      averageScore: number;
      topReferrers: Array<{ name: string; referrals: number }>;
    };
  }
  
  export default function PerformanceInsights({ analytics }: PerformanceInsightsProps) {
    const generateInsights = () => {
      const insights = [];
      
      if (analytics.totalSubmissions === 0) {
        insights.push({
          type: 'info',
          title: 'Get Started',
          message: 'Share your campaign link to start collecting submissions and referrals!'
        });
        return insights;
      }
  
      // Conversion rate insights
      if (analytics.conversionRate > 40) {
        insights.push({
          type: 'success',
          title: 'Excellent Referral Rate!',
          message: `${analytics.conversionRate}% of your submissions came from referrals. Your content is highly shareable!`
        });
      } else if (analytics.conversionRate > 20) {
        insights.push({
          type: 'info',
          title: 'Good Referral Performance',
          message: `${analytics.conversionRate}% referral rate is solid. Consider incentives to boost sharing.`
        });
      } else {
        insights.push({
          type: 'warning',
          title: 'Referral Opportunity',
          message: `Only ${analytics.conversionRate}% of submissions are referrals. Add sharing incentives or make your content more engaging.`
        });
      }
  
      // Top performer insight
      if (analytics.topReferrers.length > 0) {
        const topReferrer = analytics.topReferrers[0];
        insights.push({
          type: 'success',
          title: 'Top Performer',
          message: `${topReferrer.name} is crushing it with ${topReferrer.referrals} referrals! Consider featuring them as a success story.`
        });
      }
  
      // Score insights
      if (analytics.averageScore > 8) {
        insights.push({
          type: 'success',
          title: 'High Engagement',
          message: `Average score of ${analytics.averageScore} shows your audience is highly engaged!`
        });
      }
  
      // Volume insights
      if (analytics.totalSubmissions > 100) {
        insights.push({
          type: 'success',
          title: 'Growing Community',
          message: `${analytics.totalSubmissions} submissions! You're building a strong community.`
        });
      }
  
      return insights;
    };
  
    const insights = generateInsights();
  
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          💡 Performance Insights
        </h3>
        
        <div className="space-y-4">
          {insights.map((insight, index) => {
            const bgColor = {
              success: 'bg-green-50 border-green-200',
              info: 'bg-blue-50 border-blue-200',
              warning: 'bg-yellow-50 border-yellow-200'
            }[insight.type];
            
            const textColor = {
              success: 'text-green-800',
              info: 'text-blue-800',
              warning: 'text-yellow-800'
            }[insight.type];
            
            const icon = {
              success: '🎉',
              info: '💡',
              warning: '⚠️'
            }[insight.type];
            
            return (
              <div key={index} className={`p-4 border rounded-lg ${bgColor}`}>
                <div className="flex items-start space-x-3">
                  <span className="text-lg">{icon}</span>
                  <div>
                    <p className={`font-medium ${textColor}`}>{insight.title}</p>
                    <p className={`text-sm mt-1 ${textColor}`}>{insight.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  