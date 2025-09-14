import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FeedbackMessageProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export function FeedbackMessage({ 
  type, 
  message, 
  onClose, 
  autoClose = true, 
  duration = 5000 
}: FeedbackMessageProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      case 'error':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-green-50 border-green-200 text-green-800',
          icon: 'text-green-600',
          button: 'text-green-600 hover:text-green-800'
        };
      case 'error':
        return {
          container: 'bg-red-50 border-red-200 text-red-800',
          icon: 'text-red-600',
          button: 'text-red-600 hover:text-red-800'
        };
      case 'info':
        return {
          container: 'bg-blue-50 border-blue-200 text-blue-800',
          icon: 'text-blue-600',
          button: 'text-blue-600 hover:text-blue-800'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`
      fixed top-4 right-4 z-50 max-w-md w-full mx-4 
      border rounded-lg p-4 shadow-lg backdrop-blur-sm
      transform transition-all duration-300 ease-in-out
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      ${styles.container}
    `}>
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 ${styles.icon}`}>
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-relaxed">
            {message}
          </p>
        </div>
        {onClose && (
          <button
            onClick={handleClose}
            className={`flex-shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors ${styles.button}`}
            aria-label="Fechar mensagem"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {autoClose && (
        <div className="mt-2">
          <div className="w-full bg-black/10 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-current rounded-full transition-all ease-linear"
              style={{
                animation: `shrink ${duration}ms linear forwards`
              }}
            />
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}

// Hook para gerenciar mensagens de feedback
export function useFeedback() {
  const [messages, setMessages] = useState<Array<{
    id: string;
    type: 'success' | 'error' | 'info';
    message: string;
  }>>([]);

  const showMessage = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Date.now().toString();
    setMessages(prev => [...prev, { id, type, message }]);
  };

  const removeMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const success = (message: string) => showMessage('success', message);
  const error = (message: string) => showMessage('error', message);
  const info = (message: string) => showMessage('info', message);

  return {
    messages,
    success,
    error,
    info,
    removeMessage
  };
}