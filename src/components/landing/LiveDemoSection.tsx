'use client';

import { useState } from 'react';
import DynamicForm from '@/components/DynamicForm';
import { SUPP_QUIZ_SCHEMA } from '@/lib/quiz-data';

export default function LiveDemoSection() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <section id="live-demo" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Try our platform with a real form. See how referral tracking works instantly.
          </p>
          
          {!showDemo ? (
            <button
              onClick={() => setShowDemo(true)}
              className="bg-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-purple-700 transition-colors shadow-lg"
            >
              Launch Demo Form 🚀
            </button>
          ) : (
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  ✨ Live Demo - Try sharing your referral link!
                </span>
              </div>
              
              <DynamicForm 
                campaignId="demo-campaign"
                schema={SUPP_QUIZ_SCHEMA}
              />
            </div>
          )}
        </div>

        {/* Demo Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Dynamic Forms</h3>
            <p className="text-gray-600">Create any type of form - surveys, quizzes, lead capture</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔗</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Instant Referral Links</h3>
            <p className="text-gray-600">Every submission generates a unique tracking link automatically</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Real-time Analytics</h3>
            <p className="text-gray-600">Track who's bringing the most referrals instantly</p>
          </div>
        </div>
      </div>
    </section>
  );
}
