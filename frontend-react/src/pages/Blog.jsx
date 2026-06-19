import { Calendar, User, ArrowRight } from 'lucide-react'

export default function Blog() {
  const articles = [
    {
      title: '10 Tips for Acing Your AI Interview',
      excerpt: 'Learn how to prepare for AI-powered interviews and showcase your best self.',
      author: 'Sarah Johnson',
      date: 'June 15, 2026',
      category: 'Interview Tips',
      image: 'bg-gradient-royal'
    },
    {
      title: 'The Future of Hiring: AI and Human Collaboration',
      excerpt: 'How AI is augmenting, not replacing, human decision-making in recruitment.',
      author: 'Michael Chen',
      date: 'June 10, 2026',
      category: 'Industry Insights',
      image: 'bg-gradient-purple'
    },
    {
      title: 'Building Bias-Free Interview Processes',
      excerpt: 'Strategies for creating fair and objective hiring practices with AI.',
      author: 'Emily Rodriguez',
      date: 'June 5, 2026',
      category: 'Best Practices',
      image: 'bg-gradient-royal'
    },
    {
      title: 'Resume Optimization for ATS Systems',
      excerpt: 'Expert tips on crafting resumes that pass applicant tracking systems.',
      author: 'David Kim',
      date: 'May 28, 2026',
      category: 'Career Advice',
      image: 'bg-gradient-purple'
    },
    {
      title: 'How AI Analyzes Communication Skills',
      excerpt: 'Understanding the technology behind AI assessment of soft skills.',
      author: 'Lisa Anderson',
      date: 'May 20, 2026',
      category: 'Technology',
      image: 'bg-gradient-royal'
    },
    {
      title: 'Remote Interviewing Best Practices',
      excerpt: 'Master the art of conducting and participating in remote interviews.',
      author: 'James Wilson',
      date: 'May 15, 2026',
      category: 'Remote Work',
      image: 'bg-gradient-purple'
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 fade-in">
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            Blog & Insights
          </h1>
          <p className="text-xl text-gray-400">
            Stay updated with the latest trends in AI-powered hiring,
            interview tips, and industry insights.
          </p>
        </div>

        {/* Featured Article */}
        <div className="card p-8 mb-12 bg-gradient-to-br from-royal-900/50 to-purple-900/50 slide-up">
          <div className="flex items-center space-x-2 mb-4">
            <span className="px-3 py-1 bg-gold-600/20 text-gold-400 text-sm rounded-full">
              Featured
            </span>
            <span className="text-gray-500 text-sm">{articles[0].category}</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gray-100">
            {articles[0].title}
          </h2>
          <p className="text-xl text-gray-400 mb-6">
            {articles[0].excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {articles[0].author}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {articles[0].date}
              </div>
            </div>
            <button className="btn-primary flex items-center space-x-2">
              <span>Read Article</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map((article, index) => (
            <div 
              key={index} 
              className="card card-hover slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`h-48 ${article.image} rounded-t-xl flex items-center justify-center`}>
                <span className="text-3xl font-bold text-white opacity-50">AI</span>
              </div>
              <div className="p-6">
                <span className="text-royal-400 text-sm">{article.category}</span>
                <h3 className="text-xl font-semibold mt-2 mb-3 text-gray-100">
                  {article.title}
                </h3>
                <p className="text-gray-400 mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-royal-800/30">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {article.author}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {article.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
