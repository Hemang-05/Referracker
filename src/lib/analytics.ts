import { supabase } from './supabase';

export interface AnalyticsData {
  totalSubmissions: number;
  totalReferrals: number;
  conversionRate: number;
  averageScore: number;
  topReferrers: Array<{
    name: string;
    referrals: number;
    conversionRate: number;
  }>;
  dailySubmissions: Array<{
    date: string;
    count: number;
  }>;
  scoreDistribution: Array<{
    score: number;
    count: number;
  }>;
}

export async function getCampaignAnalytics(campaignId: string): Promise<AnalyticsData> {
  try {
    // Get all submissions for this campaign
    const { data: submissions, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('campaign_id', campaignId);

    if (error) throw error;

    const totalSubmissions = submissions?.length || 0;
    
    // Calculate referrals (submissions with referrer_code)
    const referrals = submissions?.filter(s => s.referrer_code) || [];
    const totalReferrals = referrals.length;
    
    // Calculate conversion rate
    const conversionRate = totalSubmissions > 0 ? Math.round((totalReferrals / totalSubmissions) * 100) : 0;
    
    // Calculate average score
    const averageScore = totalSubmissions > 0 
      ? Math.round((submissions?.reduce((sum, s) => sum + (s.score || 0), 0) || 0) / totalSubmissions * 10) / 10
      : 0;

    // Calculate top referrers
    const referrerStats: Record<string, { count: number; total: number }> = {};
    
    referrals.forEach(submission => {
      const referrer = submission.referrer_code || submission.referrer_name || 'Unknown';
      if (!referrerStats[referrer]) {
        referrerStats[referrer] = { count: 0, total: 0 };
      }
      referrerStats[referrer].count++;
    });

    // Get total clicks per referrer (for conversion rate calculation)
    submissions?.forEach(submission => {
      const referrer = submission.referrer_code || submission.referrer_name;
      if (referrer && referrerStats[referrer]) {
        referrerStats[referrer].total++;
      }
    });

    const topReferrers = Object.entries(referrerStats)
      .map(([name, stats]) => ({
        name,
        referrals: stats.count,
        conversionRate: Math.round((stats.count / Math.max(stats.total, stats.count)) * 100)
      }))
      .sort((a, b) => b.referrals - a.referrals)
      .slice(0, 10);

    // Calculate daily submissions (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const dailySubmissions = last7Days.map(date => {
      const count = submissions?.filter(s => 
        s.submitted_at && s.submitted_at.startsWith(date)
      ).length || 0;
      return { date, count };
    });

    // Calculate score distribution
    const scoreDistribution: Record<number, number> = {};
    submissions?.forEach(s => {
      const score = s.score || 0;
      scoreDistribution[score] = (scoreDistribution[score] || 0) + 1;
    });

    const scoreDistributionArray = Object.entries(scoreDistribution)
      .map(([score, count]) => ({ score: parseInt(score), count }))
      .sort((a, b) => a.score - b.score);

    return {
      totalSubmissions,
      totalReferrals,
      conversionRate,
      averageScore,
      topReferrers,
      dailySubmissions,
      scoreDistribution: scoreDistributionArray
    };

  } catch (error) {
    console.error('Analytics error:', error);
    // Return mock data on error
    return {
      totalSubmissions: 0,
      totalReferrals: 0,
      conversionRate: 0,
      averageScore: 0,
      topReferrers: [],
      dailySubmissions: [],
      scoreDistribution: []
    };
  }
}

export async function getOverallAnalytics(): Promise<AnalyticsData & { activeCampaigns: number }> {
    try {
      // Get all campaigns - FIXED: This now gets real count
      const { data: campaigns } = await supabase
        .from('campaigns')
        .select('id')
        .eq('is_active', true);
  
      const activeCampaigns = campaigns?.length || 0;
  
      // Rest of the function stays the same...
      const { data: submissions } = await supabase
        .from('submissions')
        .select('*');
  
      const totalSubmissions = submissions?.length || 0;
      const referrals = submissions?.filter(s => s.referrer_code) || [];
      const totalReferrals = referrals.length;
      const conversionRate = totalSubmissions > 0 ? Math.round((totalReferrals / totalSubmissions) * 100) : 0;
      
      // Calculate top referrers from all submissions
      const referrerStats: Record<string, { count: number }> = {};
      referrals.forEach(submission => {
        const referrer = submission.referrer_code || submission.referrer_name || 'Unknown';
        if (!referrerStats[referrer]) {
          referrerStats[referrer] = { count: 0 };
        }
        referrerStats[referrer].count++;
      });
  
      const topReferrers = Object.entries(referrerStats)
        .map(([name, stats]) => ({
            name,
            referrals: stats.count,
            conversionRate: 75 // Placeholder - calculating real conversion rate requires more data
        }))
        .sort((a, b) => b.referrals - a.referrals) // ✅ Fixed: both are 'referrals'
        .slice(0, 10);
            const averageScore = totalSubmissions > 0 
                ? Math.round((submissions?.reduce((sum, s) => sum + (s.score || 0), 0) || 0) / totalSubmissions * 10) / 10
                : 0;
        
      return {
        activeCampaigns, // Now shows real count
        totalSubmissions,
        totalReferrals,
        conversionRate,
        averageScore,
        topReferrers,
        dailySubmissions: [], // Simplified for now
        scoreDistribution: []
      };
  
    } catch (error) {
      console.error('Overall analytics error:', error);
      return {
        activeCampaigns: 0, // Fixed fallback
        totalSubmissions: 0,
        totalReferrals: 0,
        conversionRate: 0,
        averageScore: 0,
        topReferrers: [],
        dailySubmissions: [],
        scoreDistribution: []
      };
    }
  }
