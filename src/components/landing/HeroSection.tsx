'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function HeroSection() {
  const [email, setEmail] = useState('');

  const handleEarlyAccess = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save email to database for lead generation
    alert(`Thanks! We'll contact you at ${email}`);
    setEmail('');
  };

  return (
    <section className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Attention-grabbing headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Referral Tracking for{' '}
            <span className="text-yellow-400">$19/month</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 opacity-90 max-w-4xl mx-auto">
            Stop paying <span className="line-through text-red-300">$175/month</span> for basic referral tracking
          </p>
          
          <p className="text-lg mb-8 opacity-80 max-w-3xl mx-auto">
            Get enterprise-grade referral & affiliate management at startup pricing. 
            Perfect for campus ambassadors, sales teams, and affiliate programs.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">90%</div>
              <div className="opacity-80">Cost Savings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">5 min</div>
              <div className="opacity-80">Setup Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">∞</div>
              <div className="opacity-80">Custom Forms</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              onClick={() => document.getElementById('live-demo')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-yellow-400 text-purple-900 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-colors shadow-lg"
            >
              Try Live Demo →
            </button>

            {/* Add this new button */}
            <Link
                href="/dashboard"
                className="bg-transparent border-2 border-white text-white px-6 py-4 rounded-lg hover:bg-white hover:text-purple-900 transition-colors font-semibold"
            >
                Go to Dashboard
            </Link>
            
            <form onSubmit={handleEarlyAccess} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-2 rounded-lg text-gray-900 border-2 border-transparent focus:border-yellow-400 outline-none"
              />
              <button 
                type="submit"
                className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-purple-900 transition-colors"
              >
                Get Early Access
              </button>
            </form>
          </div>

          {/* Social Proof */}
          <p className="text-sm opacity-70">
            Join 50+ startups already tracking referrals smarter
          </p>
        </div>
      </div>
    </section>
  );
}
