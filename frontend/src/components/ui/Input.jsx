import React, { useState } from 'react';

const Input = ({ 
  label, 
  error, 
  helperText,
  type = 'text',
  className = '',
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(props.value || props.defaultValue);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(e.target.value);
  };

  return (
    <div className={`relative mb-4 ${className}`}>
      <input 
        type={type}
        className={`
          peer w-full px-4 py-3 pt-6 rounded-lg border-2 
          bg-white
          focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
          transition-all duration-200
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-dark-200 hover:border-dark-300'}
        `}
        placeholder=" "
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {label && (
        <label 
          className={`
            absolute left-4 transition-all duration-200 pointer-events-none
            ${isFocused || hasValue || props.value
              ? 'top-1.5 text-xs text-dark-600 font-medium'
              : 'top-3.5 text-base text-dark-400'
            }
            ${error ? 'text-red-500' : ''}
          `}
        >
          {label}
        </label>
      )}
      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-dark-400 text-sm mt-1">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
