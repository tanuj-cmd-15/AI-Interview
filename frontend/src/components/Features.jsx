import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Video, 
  FileCheck, 
  TrendingUp, 
  Clock, 
  Shield,
  Zap,
  Users,
  Award,
  Target
} from 'lucide-react';
import Card from './ui/Card';

const Features = () => {
  const mainFeatures = [
    {
      title: 'AI-Powered HR Interview',
      description: 'Practice with intelligent AI that analyzes your answers and provides actionable feedback in real-time',
      icon: Brain,
      gradient: 'from-primary-500 to-primary-600',
    },
    {
      title: 'Live Video Analysis',
      description: 'Advanced emotion detection tracks your confidence, body language, and communication skills',
      icon: Video,
      gradient: 'from-accent-500 to-accent-600',
    },
    {
      title: 'Resume ATS Scoring',
      description: 'Get instant ATS compatibility scores with detailed suggestions to optimize your resume',
      icon: FileCheck,
      gradient: 'from-success to-green-600',
    },
    {
      title: 'Performance Analytics',
      description: 'Track your improvement over time with detailed metrics and personalized recommendations',
      icon: TrendingUp,
      gradient: 'from-info to-cyan-600',
    },
  ];

  const benefits = [
    {
      icon: Clock,
      title: 'Practice Anytime',
      description: '24/7 availability with unlimited practice sessions',
    },
    {
      icon: Shield,
      title: 'Private & Secure',
      description: 'Your data is encrypted and never shared',
    },
    {
      icon: Zap,
      title: 'Instant Feedback',
      description: 'Get real-time analysis and improvement tips',
    },
    {
      icon: Target,
      title: 'Personalized',
      description: 'Tailored questions based on your role and industry',
    },
  ];

  const stats = [
    { value: '50K+', label: 'Active Users', icon: Users },
    { value: '95%', label: 'Success Rate', icon: Award },
    { value: '10M+', label: 'Practice Sessions', icon: Target },
    { value: '24/7', label: 'AI Availability', icon: Clock },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="features" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-full mb-4">
            <Zap className="text-primary-600" size={16} />
            <span className="text-sm font-semibold text-primary-700">Platform Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Ace Your Interview
            </span>
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Practice with cutting-edge AI technology designed to help you succeed in every interview
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {mainFeatures.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card hover className="h-full p-6 group">
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-soft p-8 md:p-12 mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-neutral-900 mb-4">Why Choose InterviewPro?</h3>
            <p className="text-neutral-600 text-lg">Built for job seekers who want to stand out</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="text-primary-600" size={24} />
                </div>
                <h4 className="font-semibold text-neutral-900 mb-2">{benefit.title}</h4>
                <p className="text-sm text-neutral-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-6">
              <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-neutral-900 mb-1">{stat.value}</div>
              <div className="text-sm text-neutral-600">{stat.label}</div>
            </Card>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-gradient-to-br from-primary-600 to-accent-600 rounded-3xl p-12 text-center text-white shadow-intense"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Land Your Dream Job?
          </h3>
          <p className="text-xl text-primary-50 mb-8 max-w-2xl mx-auto">
            Join thousands of successful job seekers who practiced with InterviewPro
          </p>
          <button
            onClick={() => window.location.href = '/hr'}
            className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-neutral-50 transition-colors shadow-soft"
          >
            Start Practicing Now - It's Free
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
