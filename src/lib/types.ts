// Database table types (matching your Supabase schema)
export interface Organization {
    id: string;
    name: string;
    slug: string;
    owner_email?: string;
    created_at: string;
  }
  
  export interface Campaign {
    id: string;
    organization_id: string;
    title: string;
    description?: string;
    type: 'SURVEY' | 'AFFILIATE';
    form_schema: FormSchema;
    target_url?: string;
    is_active: boolean;
    created_at: string;
  }
  
  export interface Submission {
    id: string;
    campaign_id: string;
    answers: Record<string, any>; // Flexible JSON answers
    referrer_code?: string;
    referrer_name?: string;
    score: number;
    submitted_at: string;
  }
  
  // Form structure types (for your quiz questions)
  export interface FormSchema {
    questions: Question[];
    settings?: {
      requireReferral?: boolean;
      passingScore?: number;
      showResults?: boolean;
    };
  }
  
  export interface Question {
    id: string;
    text: string;
    type: 'single' | 'multiple' | 'text' | 'image';
    options?: QuestionOption[];
    required?: boolean;
    order?: number;
  }
  
  export interface QuestionOption {
    value: string;
    label: string;
    isCorrect?: boolean;
    image?: string;
  }
  
  // API Response types
  export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
  }
  
  // Form submission type (what gets sent to API)
  export interface FormSubmission {
    campaignId: string;
    answers: Record<string, any>;
    referrerCode?: string;
    referrerName?: string;
  }
  