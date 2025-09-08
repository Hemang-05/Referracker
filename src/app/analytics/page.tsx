import { database } from '@/lib/database';
import { getCampaignAnalytics } from '@/lib/analytics';
import ReferralLeaderboard from '@/components/analytics/ReferralLeaderboard';
import SubmissionsChart from '@/components/analytics/SubmissionsChart';
import PerformanceInsights from '@/components/analytics/PerformanceInsights';

export default async function AnalyticsPage() {
  const campaigns = await database.getCampaigns();
  
  // Get analytics for all campaigns
  const campaignAnalytics = await Promise.all(
    campaigns.map(async (campaign) => {
      try {
        const analytics = await getCampaignAnalytics(campaign.id);
        return { campaign, analytics };
      } catch (error) {
        return { 
          campaign, 
          analytics: { 
            totalSubmissions: 0, 
            totalReferrals: 0, 
            conversionRate: 0, 
            averageScore: 0,
            topReferrers: [],
            dailySubmissions: [],
            scoreDistribution: []
          } 
        };
      }
    })
  );

  // Aggregate overall analytics
  const overallAnalytics = campaignAnalytics.reduce((acc, { analytics }) => ({
    totalSubmissions: acc.totalSubmissions + analytics.totalSubmissions,
    totalReferrals: acc.totalReferrals + analytics.totalReferrals,
    conversionRate: 0, // Will calculate below
    averageScore: 0, // Will calculate below
    topReferrers: [...acc.topReferrers, ...analytics.topReferrers],
    dailySubmissions: [], // Complex aggregation, simplified for now
    scoreDistribution: []
  }), {
    totalSubmissions: 0,
    totalReferrals: 0,
    conversionRate: 0,
    averageScore: 0,
    topReferrers: [] as any[],
    dailySubmissions: [] as any[],
    scoreDistribution: [] as any[]
  });

  // Calculate overall conversion rate
  overallAnalytics.conversionRate = overallAnalytics.totalSubmissions > 0 
    ? Math.round((overallAnalytics.totalReferrals / overallAnalytics.totalSubmissions) * 100) 
    : 0;

  // Aggregate top referrers across all campaigns
  const referrerTotals: Record<string, number> = {};
  overallAnalytics.topReferrers.forEach(referrer => {
    referrerTotals[referrer.name] = (referrerTotals[referrer.name] || 0) + referrer.referrals;
  });

  const aggregatedTopReferrers = Object.entries(referrerTotals)
    .map(([name, referrals]) => ({ name, referrals, conversionRate: 0 }))
    .sort((a, b) => b.referrals - a.referrals)
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="mt-1 text-sm text-gray-500">
            Deep insights into your referral campaign performance
          </p>
        </div>

        {campaigns.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No analytics data yet</h3>
            <p className="text-gray-600 mb-6">Create a campaign and start collecting submissions to see analytics</p>
          </div>
        ) : (
          <>
            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{campaigns.length}</div>
                <div className="text-gray-600">Active Campaigns</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{overallAnalytics.totalSubmissions}</div>
                <div className="text-gray-600">Total Submissions</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-purple-600">{overallAnalytics.totalReferrals}</div>
                <div className="text-gray-600">Total Referrals</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="text-2xl font-bold text-green-600">{overallAnalytics.conversionRate}%</div>
                <div className="text-gray-600">Overall Rate</div>
              </div>
            </div>

            {/* Analytics Components */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <ReferralLeaderboard topReferrers={aggregatedTopReferrers} />
              <PerformanceInsights analytics={overallAnalytics} />
            </div>

            {/* Campaign Breakdown */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance</h3>
              
              <div className="space-y-4">
                {campaignAnalytics.map(({ campaign, analytics }) => (
                  <div key={campaign.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{campaign.title}</h4>
                      <p className="text-sm text-gray-600">{campaign.type}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="text-lg font-bold text-gray-900">{analytics.totalSubmissions}</div>
                        <div className="text-xs text-gray-600">Submissions</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-purple-600">{analytics.totalReferrals}</div>
                        <div className="text-xs text-gray-600">Referrals</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-600">{analytics.conversionRate}%</div>
                        <div className="text-xs text-gray-600">Rate</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
