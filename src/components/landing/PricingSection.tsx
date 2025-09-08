export default function PricingSection() {
    const plans = [
      {
        name: "Starter",
        price: "Free",
        period: "forever",
        description: "Perfect for testing the waters",
        features: [
          "1 active campaign",
          "100 submissions/month",
          "Basic analytics",
          "Email support"
        ],
        cta: "Start Free",
        popular: false
      },
      {
        name: "Growth", 
        price: "$19",
        period: "/month",
        description: "Everything startups need",
        features: [
          "Unlimited campaigns",
          "5,000 submissions/month", 
          "Advanced analytics",
          "Custom branding",
          "API access",
          "Priority support"
        ],
        cta: "Start Growing",
        popular: true
      },
      {
        name: "Enterprise",
        price: "Custom", 
        period: "pricing",
        description: "For larger organizations",
        features: [
          "Everything in Growth",
          "Unlimited submissions",
          "White-label solution",
          "Dedicated support",
          "Custom integrations",
          "SLA guarantee"
        ],
        cta: "Contact Sales",
        popular: false
      }
    ];
  
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Start free, scale when you're ready. No hidden fees, no surprises.
            </p>
            
            {/* Savings callout */}
            <div className="bg-green-100 border border-green-300 rounded-lg p-4 inline-block mb-8">
              <p className="text-green-800">
                <strong>💰 Save $1,872/year</strong> vs ReferralRock ($175/month)
              </p>
            </div>
          </div>
  
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`bg-white rounded-xl shadow-lg p-8 border-2 ${
                  plan.popular ? 'border-purple-500 transform scale-105' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="bg-purple-500 text-white text-center py-2 px-4 rounded-lg text-sm font-semibold mb-4">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                  <p className="text-gray-600">{plan.description}</p>
                </div>
  
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
  
                <button className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  plan.popular 
                    ? 'bg-purple-600 text-white hover:bg-purple-700' 
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  