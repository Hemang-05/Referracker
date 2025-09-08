import Link from 'next/link';
import CampaignList from '@/components/CampaignList';
import ReferralLeaderboard from '@/components/analytics/ReferralLeaderboard';
import SubmissionsChart from '@/components/analytics/SubmissionsChart';
import PerformanceInsights from '@/components/analytics/PerformanceInsights';
import { getOverallAnalytics } from '@/lib/analytics';

export default async function DashboardPage() {
  // Get real analytics data
  const analytics = await getOverallAnalytics();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Track your referral campaigns and performance
              </p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Link
                href="/dashboard/new-campaign"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors inline-flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Campaign
              </Link>
            </div>
          </div>
        </div>

        {/* Real Stats - Now Dynamic! */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{analytics.activeCampaigns}</p>
                <p className="text-gray-600">Active Campaigns</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{analytics.totalSubmissions}</p>
                <p className="text-gray-600">Total Submissions</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{analytics.totalReferrals}</p>
                <p className="text-gray-600">Referrals Generated</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-900">{analytics.conversionRate}%</p>
                <p className="text-gray-600">Referral Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Leaderboard - Takes up 1 column */}
          <div className="lg:col-span-1">
            <ReferralLeaderboard topReferrers={analytics.topReferrers} />
          </div>
          
          {/* Chart - Takes up 2 columns */}
          <div className="lg:col-span-2">
            <SubmissionsChart dailySubmissions={analytics.dailySubmissions} />
          </div>
        </div>

        {/* Insights */}
        <div className="mb-8">
          <PerformanceInsights analytics={analytics} />
        </div>

        {/* Campaigns List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <CampaignList />
        </div>
      </div>
    </div>
  );
}
