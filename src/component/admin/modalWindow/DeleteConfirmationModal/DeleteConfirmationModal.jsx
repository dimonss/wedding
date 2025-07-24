import React from 'react';
import ModalPortal from '../ModalPortal/ModalPortal';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({isOpen, onClose, onConfirm, guestName, isDeleting}) => {
    return (
        <ModalPortal isOpen={isOpen}>
            <ModalOverlay isOpen={isOpen} onClose={onClose}>
                <div className="delete-modal-content">
                    <h3>Confirm Delete</h3>
                    <p>Are you sure you want to delete guest <strong>{guestName}</strong>?</p>
                    <p>This action cannot be undone.</p>
                    <div className="delete-modal-actions">
                        <button
                            className="delete-modal-button confirm"
                            onClick={onConfirm}
                            disabled={isDeleting}
                        >
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                        <button
                            className="delete-modal-button cancel"
                            onClick={onClose}
                            disabled={isDeleting}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </ModalOverlay>
        </ModalPortal>
    );
};

export default DeleteConfirmationModal; 