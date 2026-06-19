import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  hover = false, 
  className = '',
  padding = 'default',
  gradient = false,
  ...props 
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  return (
    <motion.div
      initial={hover ? { y: 0 } : undefined}
      whileHover={hover ? { 
        y: -4, 
        boxShadow: '0 20px 50px -15px rgba(37, 99, 235, 0.15)' 
      } : undefined}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`
        bg-white rounded-2xl 
        ${gradient ? 'border border-neutral-200' : 'shadow-soft'}
        ${paddingClasses[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
