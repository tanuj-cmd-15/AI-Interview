import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '49',
      description: 'Perfect for small teams getting started',
      features: [
        'Up to 50 interviews/month',
        'Basic AI assessment',
        'Resume parsing',
        'Email support',
        '5 custom questions',
        'Basic analytics'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '149',
      description: 'For growing companies with serious hiring needs',
      features: [
        'Up to 200 interviews/month',
        'Advanced AI assessment',
        'Resume parsing & analysis',
        'Priority support',
        'Unlimited custom questions',
        'Advanced analytics',
        'Team collaboration',
        'API access'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations with custom requirements',
      features: [
        'Unlimited interviews',
        'Enterprise AI features',
        'Custom integrations',
        'Dedicated support',
        'White-label option',
        'Advanced security',
        'Custom training',
        'SLA guarantee'
      ],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 fade-in">
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-400">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`card p-8 slide-up relative ${
                plan.popular ? 'ring-2 ring-royal-500 shadow-royal-lg' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-royal px-4 py-1 rounded-full text-sm font-semibold text-white shadow-royal">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-100 mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center mb-2">
                  {plan.price !== 'Custom' && (
                    <span className="text-gray-400 text-xl mr-1">$</span>
                  )}
                  <span className="text-5xl font-bold text-gradient">{plan.price}</span>
                  {plan.price !== 'Custom' && (
                    <span className="text-gray-400 ml-2">/month</span>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-5 h-5 text-royal-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/register"
                className={`block w-full text-center py-3 rounded-lg transition-all ${
                  plan.popular
                    ? 'btn-primary'
                    : 'btn-outline'
                }`}
              >
                {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="card p-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gradient">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                Can I change plans later?
              </h3>
              <p className="text-gray-400">
                Yes! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-400">
                All plans include a 14-day free trial with full access to features. No credit card required.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-100 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-400">
                We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and bank transfers for Enterprise plans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
