import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-container">
      <AlertCircle size={48} className="error-icon" />
      <p className="error-message">{message || 'حدث خطأ في تحميل البيانات'}</p>
      {onRetry && (
        <button className="retry-btn" onClick={onRetry}>
          <RefreshCw size={16} /> إعادة المحاولة
        </button>
      )}
      <style>{`
        .error-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px;
          background: rgba(239,68,68,0.1);
          border-radius: 20px;
          margin: 40px;
        }
        .error-icon { color: #ef4444; margin-bottom: 16px; }
        .error-message { color: #f87171; margin-bottom: 20px; font-size: 14px; }
        .retry-btn {
          background: rgba(245,158,11,0.2);
          border: none;
          padding: 10px 24px;
          border-radius: 12px;
          color: #f59e0b;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
      `}</style>
    </div>
  );
};

export default ErrorMessage;