import React from 'react';
import { useModal } from '../../../../hook/useModal';
import ModalPortal from '../ModalPortal/ModalPortal';
import './LogoutConfirmationModal.css';

const LogoutConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    useModal(isOpen, onClose);

    return (
        <ModalPortal isOpen={isOpen}>
            <div className="logout-modal-overlay">
                <div className="logout-modal-content">
                    <h3>🚪 Выход из системы</h3>
                    <p>Вы уверены, что хотите выйти из админ-панели?</p>
                    <div className="logout-modal-actions">
                        <button
                            className="logout-modal-button confirm"
                            onClick={onConfirm}
                        >
                            Да, выйти
                        </button>
                        <button
                            className="logout-modal-button cancel"
                            onClick={onClose}
                        >
                            Отмена
                        </button>
                    </div>
                </div>
            </div>
        </ModalPortal>
    );
};

export default LogoutConfirmationModal; 