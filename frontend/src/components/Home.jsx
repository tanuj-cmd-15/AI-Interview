import React from 'react';
import Navbar from './Navbar';
import Sider from './Sider';
import Footer from './Footer';
import Features from './Features';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Sider />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;
