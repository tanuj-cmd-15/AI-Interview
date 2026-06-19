import { Mail, Phone, MessageCircle, HelpCircle, Book, Video } from 'lucide-react'

export default function Support() {
  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'Click on the "Get Started" button and fill in your details. You can register as either a Student or HR professional.'
    },
    {
      question: 'Is there a free trial available?',
      answer: 'Yes! We offer a 14-day free trial with full access to all features. No credit card required.'
    },
    {
      question: 'How does the AI assessment work?',
      answer: 'Our AI analyzes responses using natural language processing, evaluating content, communication skills, and relevance to the role.'
    },
    {
      question: 'Can I customize interview questions?',
      answer: 'Absolutely! HR users can create custom question banks tailored to specific roles and requirements.'
    },
    {
      question: 'What file formats are supported for resumes?',
      answer: 'We support PDF, DOCX, and DOC formats. Our AI can parse and analyze all standard resume layouts.'
    },
    {
      question: 'How secure is my data?',
      answer: 'We use bank-level encryption and are compliant with GDPR and SOC2 standards. Your data is always secure.'
    }
  ]

  const resources = [
    {
      icon: Book,
      title: 'Documentation',
      description: 'Comprehensive guides and API documentation',
      link: '#'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      link: '#'
    },
    {
      icon: MessageCircle,
      title: 'Community Forum',
      description: 'Connect with other users',
      link: '#'
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 fade-in">
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            Support Center
          </h1>
          <p className="text-xl text-gray-400">
            Get help, find answers, and connect with our support team.
            We're here to help you succeed.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="card p-8 text-center card-hover slide-up">
            <div className="w-16 h-16 bg-gradient-royal rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-100">Email Support</h3>
            <p className="text-gray-400 mb-4">Get help via email</p>
            <a href="mailto:support@aiinterview.com" className="text-royal-400 hover:text-royal-300">
              support@aiinterview.com
            </a>
          </div>

          <div className="card p-8 text-center card-hover slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 bg-gradient-purple rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-100">Phone Support</h3>
            <p className="text-gray-400 mb-4">Mon-Sat, 10 AM - 6 PM</p>
            <a href="tel:+1234567890" className="text-royal-400 hover:text-royal-300">
              +1 (234) 567-890
            </a>
          </div>

          <div className="card p-8 text-center card-hover slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-gradient-royal rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-100">Live Chat</h3>
            <p className="text-gray-400 mb-4">Chat with our team</p>
            <button className="text-royal-400 hover:text-royal-300">
              Start Chat
            </button>
          </div>
        </div>

        {/* Resources */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gradient">
            Help Resources
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <div 
                key={index} 
                className="card p-8 card-hover slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-royal rounded-lg flex items-center justify-center mb-4">
                  <resource.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-100">
                  {resource.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {resource.description}
                </p>
                <a href={resource.link} className="text-royal-400 hover:text-royal-300 flex items-center">
                  Learn more →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="card p-12">
          <div className="flex items-center justify-center mb-8">
            <HelpCircle className="w-8 h-8 text-royal-400 mr-3" />
            <h2 className="text-3xl font-bold text-gradient">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-6 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border-b border-royal-800/30 pb-6 last:border-0 slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-100">
                  {faq.question}
                </h3>
                <p className="text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
