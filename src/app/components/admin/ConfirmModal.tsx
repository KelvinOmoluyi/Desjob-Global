import React, { useState, useEffect } from 'react';
import { TriangleAlert } from 'lucide-react';
import '../../../styles/admin.css';

interface ConfirmModalProps {
  isOpen: boolean;
  type: 'job' | 'blog';
  title?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ isOpen, type, title, onConfirm, onCancel }: ConfirmModalProps) {
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
    }, 200); // Match CSS fade-out transition
  };

  const handleConfirm = () => {
    onConfirm();
  };

  if (!isOpen && !isClosing) return null;

  const itemLabel = type === 'job' ? 'job post' : 'blog post';
  const defaultTitle = `Delete this ${itemLabel}?`;
  const message = `Are you sure you want to delete "${title || 'this item'}"? This action cannot be undone and will remove it from the website immediately.`;

  return (
    <div className={`admin-confirm-overlay ${isClosing ? 'closing' : ''}`} onClick={handleCancel}>
      <div className="admin-confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-confirm-modal-top">
          <div className="p-2 rounded-full bg-red-50 text-red-600">
            <TriangleAlert size={20} />
          </div>
          <h4 className="modal-title">{defaultTitle}</h4>
        </div>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
          <button className="btn-confirm" onClick={handleConfirm}>Delete Post</button>
        </div>
      </div>
    </div>
  );
}
