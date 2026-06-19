import { Briefcase, MapPin, Clock, ChevronRight } from 'lucide-react'

export default function Careers() {
  const openings = [
    {
      title: 'Senior Full Stack Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Build and scale our AI-powered interview platform with React, Node.js, and Python.'
    },
    {
      title: 'Machine Learning Engineer',
      department: 'AI/ML',
      location: 'Remote',
      type: 'Full-time',
      description: 'Develop and improve our AI models for interview assessment and natural language processing.'
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Create beautiful, intuitive user experiences for our interview platform.'
    },
    {
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Austin, TX',
      type: 'Full-time',
      description: 'Manage infrastructure, CI/CD pipelines, and ensure platform reliability and scalability.'
    },
    {
      title: 'Customer Success Manager',
      department: 'Customer Success',
      location: 'Remote',
      type: 'Full-time',
      description: 'Help our customers succeed with the platform and drive product adoption.'
    },
    {
      title: 'Technical Writer',
      department: 'Documentation',
      location: 'Remote',
      type: 'Contract',
      description: 'Create comprehensive documentation, tutorials, and guides for our platform.'
    }
  ]

  const benefits = [
    'Competitive salary and equity',
    'Health, dental, and vision insurance',
    'Flexible work arrangements',
    '401(k) matching',
    'Professional development budget',
    'Unlimited PTO',
    'Remote work options',
    'Latest tech equipment'
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 fade-in">
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            Join Our Team
          </h1>
          <p className="text-xl text-gray-400">
            Help us revolutionize the hiring process with AI. We're building something special,
            and we want talented people like you to be part of it.
          </p>
        </div>

        {/* Benefits */}
        <div className="card p-12 mb-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gradient">
            Why Work With Us?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-3 slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ChevronRight className="w-5 h-5 text-royal-400 flex-shrink-0" />
                <span className="text-gray-300">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Job Openings */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient">
            Open Positions
          </h2>
          <div className="space-y-6">
            {openings.map((job, index) => (
              <div 
                key={index} 
                className="card p-6 card-hover slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-2xl font-semibold text-gray-100">
                        {job.title}
                      </h3>
                      <span className="ml-4 px-3 py-1 bg-royal-900/50 text-royal-400 text-sm rounded-full">
                        {job.department}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.type}
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {job.department}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <button className="btn-primary whitespace-nowrap">
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="card p-12 text-center mt-16 bg-gradient-to-br from-royal-900/50 to-purple-900/50">
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Don't See the Right Role?
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <button className="btn-primary text-lg px-8 py-4">
            Send Your Resume
          </button>
        </div>
      </div>
    </div>
  )
}
