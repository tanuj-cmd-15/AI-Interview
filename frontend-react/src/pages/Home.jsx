import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Sparkles, Users, TrendingUp, Shield } from 'lucide-react'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container-custom py-20 fade-in">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6">
            <span className="text-gradient">AI-Powered</span>
            <br />
            Interview Platform
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Transform your hiring process with intelligent interview assessment,
            real-time feedback, and comprehensive analytics.
          </p>

          <div className="flex justify-center gap-4">
            {user ? (
              <Link
                to={user.role === 'STUDENT' ? '/student/dashboard' : '/hr/dashboard'}
                className="btn-primary text-lg px-8 py-4"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-primary text-lg px-8 py-4">
                  Get Started
                </Link>
                <Link to="/login" className="btn-outline text-lg px-8 py-4">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-custom py-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-gradient">
          Key Features
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card-hover p-6 slide-up">
            <div className="w-12 h-12 bg-gradient-royal rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-100">
              AI-Powered Analysis
            </h3>
            <p className="text-gray-400">
              Advanced algorithms analyze responses and provide detailed feedback
            </p>
          </div>

          <div className="card-hover p-6 slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="w-12 h-12 bg-gradient-purple rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-100">
              Multi-Role Support
            </h3>
            <p className="text-gray-400">
              Separate dashboards for students and HR professionals
            </p>
          </div>

          <div className="card-hover p-6 slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="w-12 h-12 bg-gradient-royal rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-100">
              Performance Tracking
            </h3>
            <p className="text-gray-400">
              Comprehensive analytics and progress monitoring
            </p>
          </div>

          <div className="card-hover p-6 slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="w-12 h-12 bg-gradient-purple rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-100">
              Secure & Private
            </h3>
            <p className="text-gray-400">
              Enterprise-grade security with encrypted data storage
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom py-20">
        <div className="card p-12 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gradient">
            Ready to Transform Your Interviews?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of companies already using our platform
          </p>
          {!user && (
            <Link to="/register" className="btn-primary text-lg px-8 py-4 inline-block">
              Start Free Trial
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}
