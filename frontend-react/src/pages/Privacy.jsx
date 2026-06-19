import { Shield, Lock, Eye, FileText } from 'lucide-react'

export default function Privacy() {
  const sections = [
    {
      icon: Shield,
      title: 'Information We Collect',
      content: [
        'Personal information (name, email, phone number) provided during registration',
        'Resume data uploaded by students',
        'Interview responses and performance data',
        'Usage data and analytics',
        'Device and browser information'
      ]
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: [
        'To provide and maintain our service',
        'To analyze interview performance using AI',
        'To improve our platform and features',
        'To communicate with you about updates',
        'To ensure security and prevent fraud'
      ]
    },
    {
      icon: Eye,
      title: 'Data Sharing',
      content: [
        'We do not sell your personal information',
        'Interview data is shared only with authorized HR personnel',
        'We may share data with service providers under strict agreements',
        'We comply with legal requirements when necessary',
        'Anonymous analytics may be used for research'
      ]
    },
    {
      icon: FileText,
      title: 'Your Rights',
      content: [
        'Access your personal data at any time',
        'Request correction of inaccurate data',
        'Delete your account and associated data',
        'Export your data in a portable format',
        'Opt-out of marketing communications'
      ]
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 fade-in">
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-400">
            Your privacy is important to us. This policy explains how we collect,
            use, and protect your personal information.
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

        {/* Additional Information */}
        <div className="card p-12 mt-12 bg-gradient-to-br from-royal-900/50 to-purple-900/50">
          <h2 className="text-3xl font-bold mb-6 text-gradient text-center">
            Data Security
          </h2>
          <p className="text-gray-400 text-lg mb-6 max-w-3xl mx-auto">
            We implement industry-standard security measures including:
          </p>
          <ul className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <li className="flex items-center text-gray-300">
              <span className="text-royal-400 mr-3">✓</span>
              End-to-end encryption for data transmission
            </li>
            <li className="flex items-center text-gray-300">
              <span className="text-royal-400 mr-3">✓</span>
              Secure data storage with regular backups
            </li>
            <li className="flex items-center text-gray-300">
              <span className="text-royal-400 mr-3">✓</span>
              Regular security audits and penetration testing
            </li>
            <li className="flex items-center text-gray-300">
              <span className="text-royal-400 mr-3">✓</span>
              Compliance with GDPR and SOC2 standards
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center mt-12 card p-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-100">
            Questions About Our Privacy Policy?
          </h3>
          <p className="text-gray-400 mb-6">
            If you have any questions or concerns about our privacy practices, please contact us.
          </p>
          <a href="mailto:privacy@aiinterview.com" className="btn-primary inline-block">
            Contact Privacy Team
          </a>
        </div>
      </div>
    </div>
  )
}
