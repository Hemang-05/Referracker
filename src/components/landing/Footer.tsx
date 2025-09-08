export default function Footer() {
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <h3 className="text-xl font-bold mb-4">Referral Tracker</h3>
              <p className="text-gray-400 mb-4">
                Affordable referral tracking for growing startups and enterprises.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-white">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-white">GitHub</a>
              </div>
            </div>
  
            {/* Product */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">API Docs</a></li>
                <li><a href="#" className="hover:text-white">Integrations</a></li>
              </ul>
            </div>
  
            {/* Use Cases */}
            <div>
              <h4 className="font-semibold mb-4">Use Cases</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Campus Ambassadors</a></li>
                <li><a href="#" className="hover:text-white">Sales Teams</a></li>
                <li><a href="#" className="hover:text-white">Affiliate Programs</a></li>
                <li><a href="#" className="hover:text-white">Lead Generation</a></li>
              </ul>
            </div>
  
            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
              </ul>
            </div>
          </div>
  
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Referral Tracker. Built for startups that want to grow smarter.</p>
          </div>
        </div>
      </footer>
    );
  }
  