import React from 'react';
import Loader from '../../../loader/Loader';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({isOpen, onClose, onConfirm, guestName, isDeleting}) => {
    if (!isOpen) return null;

    return (
        <div className="delete-modal-overlay">
            <div className="delete-modal-content">
                <h3>Delete Guest</h3>
                <p>Are you sure you want to delete {guestName}?</p>
                <div className="delete-modal-actions">
                    <button
                        className="delete-modal-button confirm"
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting ? <Loader/> : 'Yes'}
                    </button>
                    <button
                        className="delete-modal-button cancel"
                        onClick={onClose}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal; 