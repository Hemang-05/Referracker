'use client';

import { useEffect, useState } from 'react';
import { Campaign } from '@/lib/types';
import { database } from '@/lib/database';

interface CampaignListProps {
  organizationId?: string;
}

export default function CampaignList({ organizationId }: CampaignListProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        setLoading(true);
        const data = await database.getCampaigns(organizationId);
        setCampaigns(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load campaigns');
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, [organizationId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        <span className="ml-2 text-gray-600">Loading campaigns...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <p className="text-gray-600 mb-4">No campaigns found</p>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
          Create Your First Campaign
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Your Campaigns</h2>
      
      <div className="grid gap-4">
        {campaigns.map((campaign) => (
          <div 
            key={campaign.id} 
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {campaign.title}
                </h3>
                <p className="text-gray-600 mt-1">
                  {campaign.description || 'No description'}
                </p>
              </div>
              
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                campaign.type === 'SURVEY' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {campaign.type}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Created: {new Date(campaign.created_at).toLocaleDateString()}</span>
              <span className={`font-medium ${
                campaign.is_active ? 'text-green-600' : 'text-red-600'
              }`}>
                {campaign.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="mt-4 flex space-x-3">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm">
                View Form
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm">
                Analytics
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 text-sm">
                Share Link
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
