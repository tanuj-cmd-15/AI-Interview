import { UserPlus, FileText, MessageSquare, BarChart, CheckCircle } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Sign Up',
      description: 'Create your account as a student or HR professional. Set up your profile in minutes.',
      gradient: 'bg-gradient-royal'
    },
    {
      icon: FileText,
      title: 'Upload Resume',
      description: 'Students upload resumes. Our AI analyzes and extracts key information automatically.',
      gradient: 'bg-gradient-purple'
    },
    {
      icon: MessageSquare,
      title: 'Start Interview',
      description: 'Take AI-powered interviews with intelligent questions tailored to your profile.',
      gradient: 'bg-gradient-royal'
    },
    {
      icon: BarChart,
      title: 'Get Analysis',
      description: 'Receive detailed feedback and performance metrics instantly after completion.',
      gradient: 'bg-gradient-purple'
    },
    {
      icon: CheckCircle,
      title: 'Make Decisions',
      description: 'HR reviews candidate analytics and makes informed hiring decisions.',
      gradient: 'bg-gradient-royal'
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 fade-in">
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            How It Works
          </h1>
          <p className="text-xl text-gray-400">
            Our AI-powered platform makes hiring simple and effective.
            Here's how you can get started in just a few steps.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col md:flex-row items-center mb-12 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Step Number and Icon */}
              <div className="flex-shrink-0 mb-6 md:mb-0">
                <div className="relative">
                  <div className={`w-24 h-24 ${step.gradient} rounded-full flex items-center justify-center shadow-royal`}>
                    <step.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-royal-950 border-4 border-royal-600 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-royal-400">{index + 1}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 md:ml-12 card p-8 w-full">
                <h3 className="text-3xl font-bold mb-4 text-gray-100">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-400">
                  {step.description}
                </p>
              </div>

              {/* Connector Line (not on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute left-12 w-0.5 h-24 bg-gradient-to-b from-royal-600 to-purple-600 ml-12" 
                     style={{ marginTop: '120px' }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Features Highlight */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="card p-8 text-center slide-up">
            <div className="text-4xl font-bold text-gradient mb-2">5 min</div>
            <div className="text-gray-400">Average Setup Time</div>
          </div>
          <div className="card p-8 text-center slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-4xl font-bold text-gradient mb-2">70%</div>
            <div className="text-gray-400">Time Saved in Hiring</div>
          </div>
          <div className="card p-8 text-center slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl font-bold text-gradient mb-2">24/7</div>
            <div className="text-gray-400">Platform Availability</div>
          </div>
        </div>

        {/* CTA */}
        <div className="card p-12 text-center mt-16 bg-gradient-to-br from-royal-900/50 to-purple-900/50">
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of companies using our platform to make better hiring decisions.
          </p>
          <div className="flex justify-center gap-4">
            <a href="/register" className="btn-primary text-lg px-8 py-4">
              Start Free Trial
            </a>
            <a href="/pricing" className="btn-outline text-lg px-8 py-4">
              View Pricing
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
