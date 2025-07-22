import { useEffect } from 'react';

export const useModal = (isOpen, onClose) => {
    useEffect(() => {
        if (!isOpen) {
            // Restore scroll when modal is closed
            document.body.style.overflow = 'unset';
            return;
        }

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';

        // Add event listener for ESC key
        document.addEventListener('keydown', handleEscape);

        // Cleanup function
        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);
}; 