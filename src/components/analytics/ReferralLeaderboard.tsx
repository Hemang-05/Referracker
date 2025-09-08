interface ReferralLeaderboardProps {
    topReferrers: Array<{
      name: string;
      referrals: number;
      conversionRate: number;
    }>;
  }
  
  export default function ReferralLeaderboard({ topReferrers }: ReferralLeaderboardProps) {
    if (topReferrers.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Referrers</h3>
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">🏆</div>
            <p className="text-gray-500">No referrals yet</p>
            <p className="text-sm text-gray-400">Share your campaign link to get started!</p>
          </div>
        </div>
      );
    }
  
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Top Referrers</h3>
          <span className="text-sm text-gray-500">{topReferrers.length} active referrers</span>
        </div>
  
        <div className="space-y-4">
          {topReferrers.map((referrer, index) => {
            const isTop3 = index < 3;
            const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}`;
            
            return (
              <div 
                key={referrer.name}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  isTop3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{medal}</span>
                  <div>
                    <p className="font-medium text-gray-900">{referrer.name}</p>
                    <p className="text-sm text-gray-500">
                      {referrer.conversionRate}% conversion rate
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-xl font-bold text-purple-600">{referrer.referrals}</p>
                  <p className="text-sm text-gray-500">referrals</p>
                </div>
              </div>
            );
          })}
        </div>
  
        {topReferrers.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              🔥 Top performer: <strong>{topReferrers[0]?.name}</strong> with {topReferrers[0]?.referrals} referrals!
            </p>
          </div>
        )}
      </div>
    );
  }
  