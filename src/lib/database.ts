import { supabase } from './supabase';
import { Campaign, Organization, Submission } from './types';

// Database query functions (reusable across components)
export const database = {
  // Get all organizations
  async getOrganizations(): Promise<Organization[]> {
    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(`Failed to fetch organizations: ${error.message}`);
    return data || [];
  },

  // Get campaigns for an organization
  async getCampaigns(organizationId?: string): Promise<Campaign[]> {
    let query = supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (organizationId) {
      query = query.eq('organization_id', organizationId);
    }
    
    const { data, error } = await query;
    
    if (error) throw new Error(`Failed to fetch campaigns: ${error.message}`);
    return data || [];
  },

  // Get single campaign by ID
  async getCampaign(campaignId: string): Promise<Campaign | null> {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('id', campaignId)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = not found
      throw new Error(`Failed to fetch campaign: ${error.message}`);
    }
    
    return data;
  },

  // Get submissions for a campaign
  async getSubmissions(campaignId: string): Promise<Submission[]> {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('submitted_at', { ascending: false });
    
    if (error) throw new Error(`Failed to fetch submissions: ${error.message}`);
    return data || [];
  },

  // Submit form response
 // Add this to the database object
async submitForm(submission: Omit<Submission, 'id' | 'submitted_at'>): Promise<Submission> {
    // Handle demo submissions
    if (submission.campaign_id === 'demo-campaign') {
      console.log('Demo submission (not saved to database):', submission);
      // Return mock response for demo
      return {
        id: 'demo-id',
        ...submission,
        submitted_at: new Date().toISOString()
      } as Submission;
    }
  
    // Real submissions
    const { data, error } = await supabase
      .from('submissions')
      .insert([submission])
      .select()
      .single();
    
    if (error) throw new Error(`Failed to submit form: ${error.message}`);
    return data;
  }
  
};
