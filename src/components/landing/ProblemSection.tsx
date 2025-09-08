export default function ProblemSection() {
    const competitors = [
      { name: "ReferralRock", price: "$175/month", issues: ["Limited customization", "Complex setup", "No campus ambassador features"] },
      { name: "ReferralCandy", price: "$59/month + 3.5%", issues: ["E-commerce only", "Transaction fees", "Not for B2B"] },
      { name: "Extole", price: "$500+/month", issues: ["Enterprise only", "Long contracts", "Overkill for startups"] }
    ];
  
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Existing Solutions Don't Work for Startups
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Current referral tracking tools are designed for enterprises, not growing startups. 
              You shouldn't need a $175/month tool to track campus ambassadors.
            </p>
          </div>
  
          <div className="grid md:grid-cols-3 gap-8">
            {competitors.map((competitor, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border-2 border-red-100">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{competitor.name}</h3>
                  <p className="text-lg font-semibold text-red-600">{competitor.price}</p>
                </div>
                
                <ul className="space-y-2">
                  {competitor.issues.map((issue, i) => (
                    <li key={i} className="flex items-center text-gray-600">
                      <span className="text-red-500 mr-2">✗</span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
  
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mb-4">
              <strong>The result?</strong> Startups either pay too much or use spreadsheets
            </p>
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 inline-block">
              <p className="text-yellow-800 font-semibold">
                💡 There's a better way → Affordable, startup-focused referral tracking
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  