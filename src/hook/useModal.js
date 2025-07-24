import {useEffect} from 'react';

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

        const handleOutsideClick = (event) => {
            if (event.target.classList.contains('modal-overlay'))
                onClose();
        };

        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';

        // Add event listeners
        document.addEventListener('keydown', handleEscape);
        document.addEventListener('mousedown', handleOutsideClick);

        // Cleanup function
        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen, onClose]);
}; 