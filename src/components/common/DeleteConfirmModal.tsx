// src/components/common/DeleteConfirmModal.tsx
import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';
import Alert from './Alert';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  message: string;
  itemName?: string;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  itemName
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await onConfirm();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
    >
      <div className="space-y-4">
        {error && (
          <Alert type="error" dismissible onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <div className="flex flex-col items-center text-center py-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {message}
          </h3>
          
          {itemName && (
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">{itemName}</span>
            </p>
          )}
          
          <p className="text-sm text-gray-500">
            Esta acción no se puede deshacer.
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            fullWidth
          >
            Cancelar
          </Button>
          <Button
            onClick={handleConfirm}
            loading={loading}
            fullWidth
            className="bg-red-600 hover:bg-red-700"
          >
            Eliminar
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;