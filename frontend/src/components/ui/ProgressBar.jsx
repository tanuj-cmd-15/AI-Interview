import React from 'react';
import { motion } from 'framer-motion';

export const LinearProgress = ({ 
  value = 0, 
  max = 100, 
  showLabel = false,
  size = 'md',
  color = 'primary',
  className = '' 
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  const colors = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
  };

  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-dark-100 rounded-full overflow-hidden ${sizes[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full ${colors[color]} rounded-full`}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-sm text-dark-600 font-medium text-right">
          {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
};

export const CircularProgress = ({ 
  value = 0, 
  max = 100, 
  size = 120,
  strokeWidth = 8,
  showLabel = true,
  color = 'primary',
  className = '' 
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const colors = {
    primary: '#10B981',
    secondary: '#4F46E5',
    success: '#22C55E',
    warning: '#F59E0B',
    error: '#EF4444',
  };

  const getColorByPercentage = () => {
    if (percentage < 50) return colors.error;
    if (percentage < 75) return colors.warning;
    return colors.success;
  };

  const strokeColor = color === 'auto' ? getColorByPercentage() : colors[color];

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-dark-900">
            {Math.round(percentage)}
          </span>
          <span className="text-sm text-dark-500">Score</span>
        </div>
      )}
    </div>
  );
};

const ProgressBar = {
  Linear: LinearProgress,
  Circular: CircularProgress,
};

export default ProgressBar;
