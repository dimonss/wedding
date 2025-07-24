import React from 'react';
import { useModal } from '../../../../hook/useModal';
import './ModalOverlay.css';

const ModalOverlay = ({ isOpen, onClose, children, className = '' }) => {
    // Используем хук для обработки ESC и клика вне модального окна
    useModal(isOpen, onClose);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={`modal-overlay ${className}`}>
            {children}
        </div>
    );
};

export default ModalOverlay; 