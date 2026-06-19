import React, { useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { context } from '../context/Context';
import Navbar from './Navbar';
import Footer from './Footer';
import Button from './ui/Button';

const ResumeResult = () => {
  const { htmlContent } = useContext(context);
  const navigate = useNavigate();

  useEffect(() => {
    // Execute any embedded JavaScript in the HTML content
    const scriptElements = document.querySelectorAll('script');
    scriptElements.forEach(script => {
      const newScript = document.createElement('script');
      newScript.innerHTML = script.innerHTML;
      document.body.appendChild(newScript);
    });
  }, [htmlContent]);

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([htmlContent.html], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'resume-analysis-report.html';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Resume Analysis Report',
          text: 'Check out my resume analysis report!',
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header Actions */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-between gap-4 mb-8"
          >
            <Button
              variant="outline"
              onClick={() => navigate('/resume')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Analyze Another Resume
            </Button>
            
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={handleDownload}
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download Report
              </Button>
              
              {navigator.share && (
                <Button
                  variant="accent"
                  onClick={handleShare}
                  className="flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              )}
            </div>
          </motion.div>

          {/* Results Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div 
              className="resume-result-content p-8"
              dangerouslySetInnerHTML={{ __html: htmlContent.html }} 
            />
          </motion.div>

          {/* Additional Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="text-gray-600 mb-4">
              Want to improve your interview skills too?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="primary"
                onClick={() => navigate('/hr')}
              >
                Try HR Interview
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate('/technical')}
              >
                Try Technical Interview
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ResumeResult;
