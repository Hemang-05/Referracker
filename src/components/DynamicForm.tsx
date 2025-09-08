'use client';

import { useState, useEffect } from 'react';
import { FormSchema, Question, FormSubmission } from '@/lib/types';
import { database } from '@/lib/database';

interface DynamicFormProps {
  campaignId: string;
  schema: FormSchema;
  onSubmit?: (submission: FormSubmission) => void;
  className?: string;
}

export default function DynamicForm({ campaignId, schema, onSubmit, className }: DynamicFormProps) {
  // Form state management
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [referralLink, setReferralLink] = useState<string>('');
  const [score, setScore] = useState(0);
  
  // Referral tracking
  const [referrerCode, setReferrerCode] = useState<string | null>(null);

  // Get referral code from URL on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get('ref');
      if (ref) {
        setReferrerCode(ref);
        console.log('Referral code detected:', ref);
      }
    }
  }, []);

  // Sort questions by order
  const sortedQuestions = [...schema.questions].sort((a, b) => (a.order || 0) - (b.order || 0));
  const currentQuestion = sortedQuestions[currentStep];
  const isLastStep = currentStep === sortedQuestions.length - 1;

  // Handle answer changes
  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Calculate quiz score
  const calculateScore = (answers: Record<string, any>): number => {
    let correct = 0;
    
    schema.questions.forEach(question => {
      if (question.type === 'single' && question.options) {
        const userAnswer = answers[question.id];
        const correctOption = question.options.find(opt => opt.isCorrect);
        if (correctOption && userAnswer === correctOption.value) {
          correct++;
        }
      }
    });

    return correct;
  };

  // Generate referral link after submission
  const generateReferralLink = (userName: string): string => {
    const cleanName = userName.replace(/\s+/g, '');
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';
    return `${baseUrl}/form/${campaignId}?ref=${cleanName}`;
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Calculate score for quiz questions
      const finalScore = calculateScore(answers);
      setScore(finalScore);

      // Extract user name for referral link
 
      const userName = answers.name || answers.personal_info || 'Anonymous';

      
      // Prepare submission data
      const submission: Omit<FormSubmission, 'campaignId'> & { campaignId: string } = {
        campaignId,
        answers,
        referrerCode: referrerCode || undefined,
        referrerName: referrerCode || undefined
      };

      // Submit to database
      await database.submitForm({
        campaign_id: campaignId,
        answers,
        referrer_code: referrerCode || undefined,
        referrer_name: referrerCode || undefined,
        score: finalScore
      });

      // Generate referral link for this user
      const newReferralLink = generateReferralLink(userName);
      setReferralLink(newReferralLink);

      // Mark as complete
      setIsComplete(true);
      
      // Call parent callback if provided
      if (onSubmit) {
        onSubmit(submission);
      }

      console.log('Form submitted successfully!', { score: finalScore, referralLink: newReferralLink });

    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle next step
  const handleNext = () => {
    if (isLastStep) {
      handleSubmit();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Check if current step can proceed
  const canProceed = () => {
    if (!currentQuestion) return false;
    
    const answer = answers[currentQuestion.id];
    
    if (currentQuestion.required && (!answer || answer === '')) {
      return false;
    }
    
    return true;
  };

  // Render completion screen
  if (isComplete) {
    return (
      <div className={`max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg ${className}`}>
        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Form Submitted!</h2>
            {schema.settings?.showResults && (
              <p className="text-gray-600">
                You scored {score} out of {schema.questions.filter(q => q.options?.some(opt => opt.isCorrect)).length} correct answers!
              </p>
            )}
          </div>

          {referralLink && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-purple-800 mb-2">Your Referral Link:</h3>
              <div className="bg-white border rounded-lg p-3 mb-3">
                <code className="text-sm text-purple-600 break-all">{referralLink}</code>
              </div>
              <button 
                onClick={() => navigator.clipboard.writeText(referralLink)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm"
              >
                Copy Link
              </button>
              <p className="text-sm text-purple-600 mt-2">
                Share this link and earn rewards for every person who submits the form!
              </p>
            </div>
          )}

          <div className="text-sm text-gray-500">
            <p>Follow us on social media for updates</p>
          </div>
        </div>
      </div>
    );
  }

  // Render current question
  return (
    <div className={`max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg ${className}`}>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentStep + 1} of {sortedQuestions.length}</span>
          <span>{Math.round(((currentStep + 1) / sortedQuestions.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / sortedQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question content */}
      {currentQuestion && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQuestion.text}
          </h2>

          {/* Single choice questions */}
          {currentQuestion.type === 'single' && currentQuestion.options && (
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option, index) => (
                <label 
                  key={index}
                  className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-purple-50 hover:border-purple-300 transition-colors"
                >
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={option.value}
                    checked={answers[currentQuestion.id] === option.value}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <span className="ml-3 text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          )}

          {/* Text input questions */}
          {currentQuestion.type === 'text' && (
            <div className="mb-8">
              <input
                type="text"
                placeholder="Your name"
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between">
            <button 
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <button 
              onClick={handleNext}
              disabled={!canProceed() || isSubmitting}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : isLastStep ? (
                'Submit'
              ) : (
                'Next'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Referral indicator */}
      {referrerCode && (
        <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">
            📢 Referred by: <strong>{referrerCode}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
