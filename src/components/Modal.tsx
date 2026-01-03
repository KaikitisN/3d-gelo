import { ReactNode, useEffect, useRef } from 'react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { animate } from 'animejs';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  const containerRef = useFocusTrap({
    isActive: isOpen,
    onEscape: onClose,
    restoreFocus: true,
  });

  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && backdropRef.current && modalRef.current) {
      animate(backdropRef.current, {
        opacity: [0, 1],
        duration: 200,
        easing: 'out-quad',
      });
      animate(modalRef.current, {
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 300,
        easing: 'out-cubic',
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        ref={backdropRef}
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
        onClick={onClose} 
        aria-hidden="true"
        style={{ opacity: 0 }}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          ref={(node) => {
            // Set both refs
            if (containerRef && 'current' in containerRef) {
              (containerRef as any).current = node;
            }
            if (modalRef && node) {
              (modalRef as any).current = node;
            }
          }}
          className={`relative bg-white rounded-lg shadow-xl ${sizeClasses[size]} w-full`}
          style={{ opacity: 0 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
