import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import './ModalPortal.css';

const ModalPortal = ({ children, isOpen }) => {
    const [portalContainer, setPortalContainer] = useState(null);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        // Create portal container if it doesn't exist
        let container = document.getElementById('modal-portal');
        if (!container) {
            container = document.createElement('div');
            container.id = 'modal-portal';
            document.body.appendChild(container);
        }
        setPortalContainer(container);

        // Cleanup function
        return () => {
            // Only cleanup if component is unmounting, not when modal closes
            if (container && container.childNodes.length === 0) {
                try {
                    document.body.removeChild(container);
                } catch (error) {
                    console.warn('Error removing modal portal container:', error);
                }
            }
        };
    }, [isOpen]);

    // Don't render anything if modal is not open or container is not ready
    if (!isOpen || !portalContainer) {
        return null;
    }

    try {
        return createPortal(
            <ErrorBoundary>
                {children}
            </ErrorBoundary>,
            portalContainer
        );
    } catch (error) {
        console.error('Error creating modal portal:', error);
        return null;
    }
};

export default ModalPortal; 