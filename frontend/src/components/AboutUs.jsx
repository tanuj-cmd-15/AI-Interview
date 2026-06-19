import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award, 
  TrendingUp,
  CheckCircle,
  Zap,
  Shield,
  Globe
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import Card from './ui/Card';
import Button from './ui/Button';

const AboutUs = () => {
  const stats = [
    { value: '50K+', label: 'Active Users', icon: Users },
    { value: '10M+', label: 'Interview Sessions', icon: TrendingUp },
    { value: '95%', label: 'Success Rate', icon: Award },
    { value: '24/7', label: 'AI Support', icon: Shield }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Innovation First',
      description: 'Leveraging cutting-edge AI technology to revolutionize the interview process'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your data is encrypted and protected with enterprise-grade security'
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making professional interview preparation available to everyone, everywhere'
    },
    {
      icon: Zap,
      title: 'Continuous Improvement',
      description: 'Constantly evolving our AI models based on user feedback and success metrics'
    }
  ];

  const timeline = [
    {
      year: '2024',
      title: 'Platform Launch',
      description: 'Introduced AI-powered interview platform with emotion detection'
    },
    {
      year: '2025',
      title: 'Major Expansion',
      description: 'Reached 50,000+ users and expanded to technical interviews'
    },
    {
      year: '2026',
      title: 'Innovation Award',
      description: 'Recognized as leading AI interview preparation platform'
    }
  ];

  const team = [
    {
      name: 'AI Engineering',
      role: 'Core Development',
      description: 'Building next-generation interview intelligence'
    },
    {
      name: 'Data Science',
      role: 'ML & Analytics',
      description: 'Training models on millions of interview patterns'
    },
    {
      name: 'UX Research',
      role: 'User Experience',
      description: 'Designing intuitive interview experiences'
    }
  ];

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-magenta-500 to-purple-600 pt-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-magenta-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Empowering Your Interview Success
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              We're on a mission to make professional interview preparation accessible through AI-powered technology
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-magenta-500 mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Mission */}
            <Card className="text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To democratize interview preparation by providing AI-powered tools that help candidates perform their best and land their dream jobs.
              </p>
            </Card>

            {/* Vision */}
            <Card className="text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-magenta-100 mb-6">
                <Eye className="w-8 h-8 text-magenta-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To become the world's most trusted AI interview platform, transforming how people prepare for and succeed in their careers.
              </p>
            </Card>

            {/* Values */}
            <Card className="text-center p-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-6">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-600 leading-relaxed">
                Innovation, accessibility, privacy, and continuous improvement drive everything we do for our users.
              </p>
            </Card>
          </div>

          {/* Detailed Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What We Stand For</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-6 h-full hover:shadow-xl transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-magenta-500 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                          <p className="text-gray-600">{value.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline/Journey */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Our Journey</h2>
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex items-start gap-8"
              >
                <div className="flex-shrink-0 w-24 text-right">
                  <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-magenta-500 text-white font-bold">
                    {item.year}
                  </div>
                </div>
                <div className="flex-1 pb-8 border-l-2 border-gray-200 pl-8 relative">
                  <div className="absolute left-0 top-3 w-4 h-4 rounded-full bg-blue-500 -translate-x-[9px]"></div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A passionate group of engineers, researchers, and designers working to revolutionize interview preparation
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center p-8 h-full">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-magenta-500 mx-auto mb-6 flex items-center justify-center">
                    <Users className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-magenta-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Interview Experience?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of successful candidates who've improved their interview skills with our AI platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="accent" size="lg">
                Get Started Free
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 border-white text-white hover:bg-white/20">
                Watch Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUs;
