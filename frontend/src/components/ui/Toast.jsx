import React from 'react';
import { Toaster } from 'react-hot-toast';

// Configured toast wrapper with brand colors
export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#fff',
          color: '#0F172A',
          padding: '16px',
          borderRadius: '12px',
          boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          fontSize: '14px',
          fontWeight: '500',
        },
        success: {
          iconTheme: {
            primary: '#10B981',
            secondary: '#fff',
          },
          style: {
            border: '2px solid #10B981',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#fff',
          },
          style: {
            border: '2px solid #EF4444',
          },
        },
        loading: {
          iconTheme: {
            primary: '#4F46E5',
            secondary: '#fff',
          },
        },
      }}
    />
  );
};

export default ToastProvider;
