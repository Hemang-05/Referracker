'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCampaignAnalytics } from '@/lib/analytics';

interface Campaign {
  id: string;
  title: string;
  description?: string;
  type: string;
  created_at: string;
}

export default function CampaignCardClient({ campaign }: { campaign: Campaign }) {
  const [analytics, setAnalytics] = useState({ 
    totalSubmissions: 0, 
    totalReferrals: 0, 
    conversionRate: 0 
  });

  // Load analytics when component mounts
  useEffect(() => {
    async function loadAnalytics() {
      try {
        const data = await getCampaignAnalytics(campaign.id);
        setAnalytics(data);
      } catch (error) {
        console.error('Failed to load analytics:', error);
      }
    }
    loadAnalytics();
  }, [campaign.id]);

  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';
  const campaignUrl = `${baseUrl}/form/${campaign.id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(campaignUrl);
    alert('Campaign link copied to clipboard!');
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {campaign.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {campaign.description || 'No description'}
          </p>
        </div>
        
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          campaign.type === 'SURVEY' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {campaign.type}
        </span>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-center">
          <p className="text-lg font-bold text-gray-900">{analytics.totalSubmissions}</p>
          <p className="text-xs text-gray-600">Submissions</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-purple-600">{analytics.totalReferrals}</p>
          <p className="text-xs text-gray-600">Referrals</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-green-600">{analytics.conversionRate}%</p>
          <p className="text-xs text-gray-600">Rate</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <Link
          href={`/form/${campaign.id}`}
          target="_blank"
          className="flex-1 bg-purple-600 text-white text-center py-2 px-3 rounded-lg hover:bg-purple-700 transition-colors text-sm"
        >
          View Form
        </Link>
        <button 
          onClick={handleCopyLink}
          className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors text-sm"
        >
          Copy Link
        </button>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        Created: {new Date(campaign.created_at).toLocaleDateString()}
      </div>
    </div>
  );
}
