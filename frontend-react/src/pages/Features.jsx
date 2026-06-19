import { 
  Sparkles, Brain, TrendingUp, Shield, Clock, Users, 
  FileText, CheckCircle, MessageSquare, BarChart 
} from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Assessment',
      description: 'Advanced machine learning algorithms analyze candidate responses in real-time, providing intelligent insights and scoring.',
      gradient: 'bg-gradient-royal'
    },
    {
      icon: FileText,
      title: 'Resume Parsing',
      description: 'Automatically extract and analyze resume information with our intelligent ATS system that understands context.',
      gradient: 'bg-gradient-purple'
    },
    {
      icon: TrendingUp,
      title: 'Performance Analytics',
      description: 'Comprehensive dashboards with detailed analytics, progress tracking, and performance metrics.',
      gradient: 'bg-gradient-royal'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption, secure data storage, and compliance with industry standards (GDPR, SOC2).',
      gradient: 'bg-gradient-purple'
    },
    {
      icon: Clock,
      title: 'Time-Saving Automation',
      description: 'Reduce hiring time by 70% with automated interview scheduling, assessment, and candidate ranking.',
      gradient: 'bg-gradient-royal'
    },
    {
      icon: Users,
      title: 'Multi-Role Support',
      description: 'Separate dashboards and workflows for students, HR professionals, and administrators.',
      gradient: 'bg-gradient-purple'
    },
    {
      icon: MessageSquare,
      title: 'Natural Language Processing',
      description: 'Understand context, sentiment, and intent in candidate responses with advanced NLP.',
      gradient: 'bg-gradient-royal'
    },
    {
      icon: BarChart,
      title: 'Custom Question Banks',
      description: 'Create, manage, and organize custom interview questions tailored to your needs.',
      gradient: 'bg-gradient-purple'
    },
    {
      icon: CheckCircle,
      title: 'Bias Reduction',
      description: 'AI-driven objective assessment helps reduce unconscious bias in the hiring process.',
      gradient: 'bg-gradient-royal'
    },
    {
      icon: Sparkles,
      title: 'Smart Recommendations',
      description: 'Get intelligent suggestions for interview questions based on job roles and candidate profiles.',
      gradient: 'bg-gradient-purple'
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 fade-in">
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            Powerful Features for Modern Hiring
          </h1>
          <p className="text-xl text-gray-400">
            Everything you need to conduct professional, AI-powered interviews
            and make better hiring decisions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card p-8 card-hover slide-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`w-16 h-16 ${feature.gradient} rounded-lg flex items-center justify-center mb-6 shadow-royal`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-100">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="card p-12 text-center bg-gradient-to-br from-royal-900/50 to-purple-900/50">
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Start your free trial today and discover how AI can transform your interview process.
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
