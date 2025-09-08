'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Don't show navigation on public form pages
  if (pathname.startsWith('/form/')) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RT</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Referral Tracker</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/dashboard" 
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith('/dashboard') 
                  ? 'text-purple-600' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Dashboard
            </Link>
            <Link 
              href="/campaigns" 
              className={`text-sm font-medium transition-colors ${
                pathname.startsWith('/campaigns') 
                  ? 'text-purple-600' 
                  : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Campaigns
            </Link>
            <Link 
              href="/analytics" 
              className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
            >
              Analytics
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/new-campaign"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
              >
                New Campaign
              </Link>
              <button className="text-gray-500 hover:text-gray-700">
                Account
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="space-y-4">
              <Link href="/dashboard" className="block text-gray-700 hover:text-purple-600">Dashboard</Link>
              <Link href="/campaigns" className="block text-gray-700 hover:text-purple-600">Campaigns</Link>
              <Link href="/analytics" className="block text-gray-700 hover:text-purple-600">Analytics</Link>
              <Link href="/dashboard/new-campaign" className="block bg-purple-600 text-white px-4 py-2 rounded-lg w-fit">
                New Campaign
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
