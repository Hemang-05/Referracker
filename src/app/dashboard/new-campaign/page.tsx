'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewCampaignPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'SURVEY' as 'SURVEY' | 'AFFILIATE'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Create campaign in database
    console.log('Creating campaign:', formData);
    
    // For now, simulate success and redirect
    alert('Campaign created! (This will save to database in the next step)');
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Campaign</h1>
          <p className="mt-1 text-sm text-gray-500">
            Set up a new referral tracking campaign for your team
          </p>
        </div>

        {/* Form */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Campaign Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                placeholder="e.g. Campus Ambassador Quiz, Lead Generation Form"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                placeholder="Brief description of what this campaign is for..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Campaign Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Type
              </label>
              <div className="space-y-3">
                <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="radio"
                    name="type"
                    value="SURVEY"
                    checked={formData.type === 'SURVEY'}
                    onChange={(e) => setFormData(prev => ({...prev, type: e.target.value as 'SURVEY'}))}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Survey/Quiz Campaign</div>
                    <div className="text-sm text-gray-500">
                      Create forms, quizzes, or surveys. Perfect for campus ambassadors, lead generation, and engagement.
                    </div>
                  </div>
                </label>

                <label className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer opacity-50">
                  <input
                    type="radio"
                    name="type"
                    value="AFFILIATE"
                    disabled
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium text-gray-900">Affiliate Campaign <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full ml-2">Coming Soon</span></div>
                    <div className="text-sm text-gray-500">
                      Track revenue conversions and commissions. Perfect for affiliate programs and sales teams.
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Create Campaign
              </button>
            </div>
          </form>
        </div>

        {/* Next Steps Preview */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
          <ol className="text-sm text-blue-800 space-y-1 ml-4">
            <li>1. We'll create your campaign</li>
            <li>2. You can customize your form questions</li>
            <li>3. Get your shareable campaign link</li>
            <li>4. Start tracking referrals immediately!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
