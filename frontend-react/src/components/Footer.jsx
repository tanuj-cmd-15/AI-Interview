import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-royal-950 via-purple-950 to-royal-950 border-t border-royal-800/30 mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-royal rounded-lg flex items-center justify-center shadow-royal">
                <span className="text-xl font-bold text-white">AI</span>
              </div>
              <span className="text-xl font-bold text-gradient">Interview</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Premium AI-powered interview platform with intelligent assessment. 
              Crafted for your career journey.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-9 h-9 rounded-full bg-royal-900/50 flex items-center justify-center hover:bg-royal-700 transition-colors">
                <Facebook className="w-4 h-4 text-royal-300" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-royal-900/50 flex items-center justify-center hover:bg-royal-700 transition-colors">
                <Twitter className="w-4 h-4 text-royal-300" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-royal-900/50 flex items-center justify-center hover:bg-royal-700 transition-colors">
                <Linkedin className="w-4 h-4 text-royal-300" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-royal-900/50 flex items-center justify-center hover:bg-royal-700 transition-colors">
                <Instagram className="w-4 h-4 text-royal-300" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-royal-900/50 flex items-center justify-center hover:bg-royal-700 transition-colors">
                <Youtube className="w-4 h-4 text-royal-300" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-royal-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-royal-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-400 hover:text-royal-400 transition-colors text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-royal-400 transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-royal-400 transition-colors text-sm">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/how-it-works" className="text-gray-400 hover:text-royal-400 transition-colors text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-royal-400 transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-royal-400 transition-colors text-sm">
                  Support
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-royal-400 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-royal-400 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-gray-100 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-royal-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  Tech Campus, Innovation Street, Silicon Valley, CA 94025
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-royal-400 flex-shrink-0" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-royal-400 transition-colors text-sm">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-royal-400 flex-shrink-0" />
                <a href="mailto:support@aiinterview.com" className="text-gray-400 hover:text-royal-400 transition-colors text-sm">
                  support@aiinterview.com
                </a>
              </li>
              <li className="text-gray-400 text-sm">
                Mon - Sat: 10:00 AM - 6:00 PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-royal-800/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © 2026 AI Interview Platform. All rights reserved.
            </p>
            
            {/* Payment Methods */}
            <div className="flex items-center space-x-3">
              <span className="text-gray-500 text-xs mr-2">We Accept:</span>
              <div className="flex items-center space-x-2 bg-royal-900/30 px-4 py-2 rounded-lg">
                <span className="text-xs font-semibold text-gray-400">VISA</span>
                <span className="text-xs font-semibold text-gray-400">Mastercard</span>
                <span className="text-xs font-semibold text-gray-400">PayPal</span>
                <span className="text-xs font-semibold text-gray-400">Stripe</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/privacy" className="text-gray-500 hover:text-royal-400 transition-colors text-xs">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-500 hover:text-royal-400 transition-colors text-xs">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="text-gray-500 hover:text-royal-400 transition-colors text-xs">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
