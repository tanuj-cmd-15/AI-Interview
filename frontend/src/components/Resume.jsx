import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Briefcase, CheckCircle, AlertCircle } from 'lucide-react';
import { context } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Card from './ui/Card';
import Button from './ui/Button';
import toast from 'react-hot-toast';

const Resume = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { htmlContent, setHtmlContent } = useContext(context);
  const [jobRole, setJobRole] = useState('');
  const [subRole, setSubRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.name.split('.').pop().toLowerCase() === 'pdf') {
        setFile(droppedFile);
        toast.success('Resume uploaded successfully!');
      } else {
        toast.error('Please upload a PDF file only');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const extension = selectedFile.name.split('.').pop().toLowerCase();
      
      if (extension === 'pdf') {
        setFile(selectedFile);
        toast.success('Resume uploaded successfully!');
      } else {
        toast.error('PDF files supported only');
        setFile(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      toast.error('Please upload your resume');
      return;
    }
    
    if (!subRole) {
      toast.error('Please select a job role and specialization');
      return;
    }

    setIsLoading(true);
    const loadingToast = toast.loading('Analyzing your resume...');

    const formData = new FormData();
    formData.append('role', subRole);
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:5000/upload', {
        method: 'post',
        body: formData
      });

      if (res.ok) {
        const result = await res.text();
        const data = { html: result };
        localStorage.setItem('resumeresult', JSON.stringify(data));
        setHtmlContent(result);
        
        toast.success('Analysis complete!', { id: loadingToast });
        setTimeout(() => {
          window.location.href = '/resume/result';
        }, 500);
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      toast.error('Failed to analyze resume. Please try again.', { id: loadingToast });
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    'ATS-optimized analysis',
    'Skills gap identification',
    'Keyword matching',
    'Formatting recommendations',
    'Industry-specific insights',
    'Actionable improvements'
  ];

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-magenta-500 mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI-Powered Resume Analysis
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get instant feedback on your resume with our advanced ATS analysis system
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Your Resume</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* File Upload Area */}
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                      dragActive 
                        ? 'border-blue-500 bg-blue-50' 
                        : file 
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 hover:border-blue-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      id="fileselect"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf"
                      className="hidden"
                    />
                    
                    {file ? (
                      <div className="space-y-3">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                        <label
                          htmlFor="fileselect"
                          className="inline-block text-sm text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
                        >
                          Change File
                        </label>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                        <div>
                          <label
                            htmlFor="fileselect"
                            className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
                          >
                            Click to upload
                          </label>
                          <span className="text-gray-600"> or drag and drop</span>
                        </div>
                        <p className="text-xs text-gray-500">PDF files only (Max 5MB)</p>
                      </div>
                    )}
                  </div>

                  {/* Job Role Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Category
                    </label>
                    <select
                      value={jobRole}
                      onChange={(e) => {
                        setJobRole(e.target.value);
                        setSubRole(''); // Reset sub-role when category changes
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Job Category</option>
                      <option value="webdev">Web Development</option>
                      <option value="mobile">Mobile Development</option>
                      <option value="data">Data Science</option>
                      <option value="devops">DevOps</option>
                    </select>
                  </div>

                  {/* Sub Role Selection */}
                  {jobRole && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Specialization
                      </label>
                      <select
                        value={subRole}
                        onChange={(e) => setSubRole(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      >
                        <option value="">Select Specialization</option>
                        {jobRole === 'webdev' && (
                          <>
                            <option value="mern">MERN Stack</option>
                            <option value="mean">MEAN Stack</option>
                            <option value="fullstack">Full Stack</option>
                            <option value="frontend">Frontend Developer</option>
                            <option value="backend">Backend Developer</option>
                          </>
                        )}
                        {jobRole === 'mobile' && (
                          <>
                            <option value="react-native">React Native</option>
                            <option value="flutter">Flutter</option>
                            <option value="ios">iOS Developer</option>
                            <option value="android">Android Developer</option>
                          </>
                        )}
                        {jobRole === 'data' && (
                          <>
                            <option value="ml">Machine Learning</option>
                            <option value="ai">AI Engineer</option>
                            <option value="data-analyst">Data Analyst</option>
                            <option value="data-engineer">Data Engineer</option>
                          </>
                        )}
                        {jobRole === 'devops' && (
                          <>
                            <option value="cloud">Cloud Engineer</option>
                            <option value="sre">SRE</option>
                            <option value="infrastructure">Infrastructure</option>
                          </>
                        )}
                      </select>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isLoading || !file || !subRole}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Analyzing Resume...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        Analyze Resume
                      </div>
                    )}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <Card className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What You'll Get</h3>
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-blue-50 to-magenta-50 border-blue-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Pro Tip</h4>
                    <p className="text-sm text-gray-700">
                      Make sure your resume is in PDF format and includes relevant keywords for the position you're targeting. Our AI analyzes format, content, and ATS compatibility.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-1">95%</div>
                  <p className="text-sm text-gray-600">
                    Average ATS compatibility improvement after using our recommendations
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* How It Works */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '1',
                  title: 'Upload Resume',
                  description: 'Upload your PDF resume and select your target role'
                },
                {
                  step: '2',
                  title: 'AI Analysis',
                  description: 'Our AI scans and analyzes your resume against ATS standards'
                },
                {
                  step: '3',
                  title: 'Get Insights',
                  description: 'Receive detailed feedback and actionable recommendations'
                }
              ].map((item, index) => (
                <Card key={index} className="text-center p-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-magenta-500 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Resume;
