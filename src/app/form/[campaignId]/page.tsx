import { notFound } from 'next/navigation';
import { database } from '@/lib/database';
import DynamicForm from '@/components/DynamicForm';
import { SUPP_QUIZ_SCHEMA } from '@/lib/quiz-data';

interface FormPageProps {
  params: Promise<{
    campaignId: string;
  }>;
}

export default async function FormPage({ params }: FormPageProps) {
  // ✅ AWAIT params before accessing properties
  const { campaignId } = await params;
  
  // Fetch campaign data
  const campaign = await database.getCampaign(campaignId);
  
  if (!campaign || !campaign.is_active) {
    notFound();
  }

  // For now, use the hardcoded quiz schema
  const schema = SUPP_QUIZ_SCHEMA;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center text-white mb-8">
          <h1 className="text-4xl font-bold mb-2">{campaign.title}</h1>
          <p className="text-lg opacity-90">
            {campaign.description || 'Complete this form to join our community'}
          </p>
        </div>

        {/* Form */}
        <DynamicForm 
          campaignId={campaignId}
          schema={schema}
        />
      </div>
    </div>
  );
}
