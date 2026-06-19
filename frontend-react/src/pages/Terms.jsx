import { FileText, Scale, AlertCircle, Shield } from 'lucide-react'

export default function Terms() {
  const sections = [
    {
      icon: FileText,
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using AI Interview Platform, you accept and agree to be bound by these Terms of Service',
        'If you do not agree to these terms, please do not use our service',
        'We reserve the right to modify these terms at any time',
        'Continued use after changes constitutes acceptance of new terms'
      ]
    },
    {
      icon: Scale,
      title: 'User Responsibilities',
      content: [
        'You must provide accurate and complete information',
        'You are responsible for maintaining account security',
        'You must not misuse or abuse the platform',
        'You must not attempt to access unauthorized areas',
        'You agree to comply with all applicable laws'
      ]
    },
    {
      icon: Shield,
      title: 'Intellectual Property',
      content: [
        'All platform content is owned by AI Interview Platform',
        'You retain ownership of your submitted content',
        'You grant us license to use your content for service provision',
        'You may not reproduce or distribute our content without permission'
      ]
    },
    {
      icon: AlertCircle,
      title: 'Limitation of Liability',
      content: [
        'Service is provided "as is" without warranties',
        'We are not liable for indirect or consequential damages',
        'Maximum liability is limited to amount paid in last 12 months',
        'We do not guarantee uninterrupted service',
        'You use the service at your own risk'
      ]
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 fade-in">
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-400">
            Please read these terms carefully before using our platform.
            By using our service, you agree to these terms and conditions.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: June 18, 2026
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className="card p-8 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-royal rounded-lg flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4 text-gray-100">
                    {section.title}
                  </h2>
                  <ul className="space-y-3">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="flex items-start text-gray-400">
                        <span className="text-royal-400 mr-3">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Sections */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="card p-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-100">Payment Terms</h3>
            <ul className="space-y-2 text-gray-400">
              <li>• Subscription fees are billed in advance</li>
              <li>• All payments are non-refundable</li>
              <li>• Prices may change with 30 days notice</li>
              <li>• You may cancel your subscription anytime</li>
            </ul>
          </div>
          <div className="card p-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-100">Termination</h3>
            <ul className="space-y-2 text-gray-400">
              <li>• Either party may terminate at any time</li>
              <li>• We may suspend access for violations</li>
              <li>• Data may be deleted after termination</li>
              <li>• Paid fees are not refunded upon termination</li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center mt-12 card p-8 bg-gradient-to-br from-royal-900/50 to-purple-900/50">
          <h3 className="text-2xl font-bold mb-4 text-gray-100">
            Questions About Our Terms?
          </h3>
          <p className="text-gray-400 mb-6">
            If you have any questions about these Terms of Service, please contact our legal team.
          </p>
          <a href="mailto:legal@aiinterview.com" className="btn-primary inline-block">
            Contact Legal Team
          </a>
        </div>
      </div>
    </div>
  )
}
