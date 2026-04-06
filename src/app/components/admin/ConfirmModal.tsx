import React, { useState, useEffect } from 'react';
import { TriangleAlert, X } from 'lucide-react';
import '../../../styles/admin.css';

interface ConfirmModalProps {
  isOpen: boolean;
  type?: 'job' | 'blog' | 'error';
  variant?: 'confirm' | 'alert'; 
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
}

export default function ConfirmModal({ 
  isOpen, 
  type = 'job', 
  variant = 'confirm',
  title, 
  message: customMessage,
  onConfirm, 
  onCancel,
  confirmText
}: ConfirmModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleCancel = () => {
    setIsClosing(true);
    setTimeout(() => {
      onCancel();
    }, 200);
  };

  const handleConfirm = () => {
    onConfirm();
  };

  if (!isOpen && !isClosing) return null;

  const itemLabel = type === 'job' ? 'job post' : type === 'blog' ? 'blog post' : 'item';
  const defaultTitle = variant === 'confirm' ? `Delete this ${itemLabel}?` : 'Something went wrong';
  const defaultMessage = variant === 'confirm' 
    ? `Are you sure you want to delete "${title || 'this item'}"? This action cannot be undone and will remove it from the website immediately.`
    : customMessage || 'An unexpected error occurred. Please try again.';

  const displayTitle = title && variant === 'confirm' ? defaultTitle : (title || defaultTitle);
  const displayMessage = customMessage || defaultMessage;

  return (
    <div className={`admin-confirm-overlay ${isClosing ? 'closing' : ''}`} onClick={handleCancel}>
      <div className="admin-confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-confirm-modal-top">
          <div className={`p-2 rounded-full ${type === 'error' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
            {type === 'error' ? <TriangleAlert size={20} /> : <TriangleAlert size={20} />}
          </div>
          <h4 className="modal-title">{displayTitle}</h4>
          {variant === 'alert' && (
            <button className="ml-auto text-gray-400 hover:text-gray-600" onClick={handleCancel}>
              <X size={18} />
            </button>
          )}
        </div>
        <p className="modal-message">{displayMessage}</p>
        <div className="modal-actions">
          {variant === 'confirm' && (
            <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
          )}
          <button 
            className={variant === 'confirm' ? "btn-confirm" : "admin-btn-primary"} 
            onClick={variant === 'confirm' ? handleConfirm : handleCancel}
            style={variant === 'alert' ? { width: '100%' } : {}}
          >
            {confirmText || (variant === 'confirm' ? 'Delete Post' : 'Understood')}
          </button>
        </div>
      </div>
    </div>
  );
}
