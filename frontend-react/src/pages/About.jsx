import { Users, Target, Award, Heart } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen py-12">
      <div className="container-custom">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 fade-in">
          <h1 className="text-5xl font-bold mb-6 text-gradient">
            About AI Interview Platform
          </h1>
          <p className="text-xl text-gray-400">
            We're revolutionizing the hiring process with cutting-edge AI technology,
            making interviews smarter, faster, and more effective.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="card p-8 slide-up">
            <div className="w-16 h-16 bg-gradient-royal rounded-lg flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-100">Our Mission</h2>
            <p className="text-gray-400 text-lg">
              To empower companies and candidates with AI-driven insights that make
              the interview process more objective, efficient, and successful for everyone involved.
            </p>
          </div>

          <div className="card p-8 slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 bg-gradient-purple rounded-lg flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-100">Our Vision</h2>
            <p className="text-gray-400 text-lg">
              To become the world's most trusted AI interview platform, helping millions
              find their dream jobs and companies discover exceptional talent.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="card p-12 mb-16">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center slide-up">
              <div className="w-16 h-16 bg-gradient-royal rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Innovation</h3>
              <p className="text-gray-400">
                Continuously pushing boundaries with AI technology
              </p>
            </div>

            <div className="text-center slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-gradient-purple rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Excellence</h3>
              <p className="text-gray-400">
                Delivering the highest quality platform and support
              </p>
            </div>

            <div className="text-center slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-royal rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-100">Integrity</h3>
              <p className="text-gray-400">
                Maintaining fairness and transparency in all we do
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="card p-6 text-center slide-up">
            <div className="text-4xl font-bold text-gradient mb-2">10K+</div>
            <div className="text-gray-400">Active Users</div>
          </div>
          <div className="card p-6 text-center slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-4xl font-bold text-gradient mb-2">500+</div>
            <div className="text-gray-400">Companies</div>
          </div>
          <div className="card p-6 text-center slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-4xl font-bold text-gradient mb-2">50K+</div>
            <div className="text-gray-400">Interviews</div>
          </div>
          <div className="card p-6 text-center slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-4xl font-bold text-gradient mb-2">95%</div>
            <div className="text-gray-400">Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  )
}
