import { useState, useEffect, useRef } from 'react';
import { animate } from 'animejs';

interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

let toastId = 0;
const toastCallbacks: Array<(toast: ToastMessage) => void> = [];

export function showToast(message: string, type: 'success' | 'error' | 'info' = 'success') {
  const toast: ToastMessage = {
    id: toastId++,
    message,
    type,
  };
  toastCallbacks.forEach((callback) => callback(toast));
}

export default function Toast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const toastRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    const callback = (toast: ToastMessage) => {
      setToasts((prev) => [...prev, toast]);
      
      // Animate in after a short delay to ensure ref is set
      setTimeout(() => {
        const toastElement = toastRefs.current.get(toast.id);
        if (toastElement) {
          animate(toastElement, {
            translateX: [400, 0],
            opacity: [0, 1],
            duration: 400,
            easing: 'out-cubic',
          });
        }
      }, 50);

      setTimeout(() => {
        const toastElement = toastRefs.current.get(toast.id);
        if (toastElement) {
          animate(toastElement, {
            translateX: [0, 400],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInCubic',
            complete: () => {
              setToasts((prev) => prev.filter((t) => t.id !== toast.id));
              toastRefs.current.delete(toast.id);
            },
          });
        }
      }, 3000);
    };

    toastCallbacks.push(callback);
    return () => {
      const index = toastCallbacks.indexOf(callback);
      if (index > -1) toastCallbacks.splice(index, 1);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2" aria-live="polite">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          ref={(el) => {
            if (el) toastRefs.current.set(toast.id, el);
          }}
          className={`flex items-center p-4 rounded-lg shadow-lg max-w-sm ${
            toast.type === 'success'
              ? 'bg-green-500 text-white'
              : toast.type === 'error'
              ? 'bg-red-500 text-white'
              : 'bg-blue-500 text-white'
          }`}
          role="alert"
          style={{ opacity: 0 }}
        >
          <div className="flex-shrink-0 mr-3">
            {toast.type === 'success' && (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {toast.type === 'error' && (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {toast.type === 'info' && (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
      ))}
    </div>
  );
}
