import React from 'react';
import ModalPortal from '../ModalPortal/ModalPortal';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import './LogoutConfirmationModal.css';

const LogoutConfirmationModal = ({isOpen, onClose, onConfirm}) => {
    return (
        <ModalPortal isOpen={isOpen}>
            <ModalOverlay isOpen={isOpen} onClose={onClose}>
                <div className="logout-modal-content">
                    <h3>Confirm Logout</h3>
                    <p>Are you sure you want to logout from the admin panel?</p>
                    <div className="logout-modal-actions">
                        <button
                            className="logout-modal-button confirm"
                            onClick={onConfirm}
                        >
                            Logout
                        </button>
                        <button
                            className="logout-modal-button cancel"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </ModalOverlay>
        </ModalPortal>
    );
};

export default LogoutConfirmationModal; 