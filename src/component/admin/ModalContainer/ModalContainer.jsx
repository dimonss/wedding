import React from 'react';
import DeleteConfirmationModal from '../modalWindow/DeleteConfirmationModal/DeleteConfirmationModal';
import GuestFormModal from '../modalWindow/GuestFormModal/GuestFormModal';
import WeddingInfoModal from '../modalWindow/WeddingInfoModal/WeddingInfoModal';
import LogoutConfirmationModal from '../modalWindow/LogoutConfirmationModal/LogoutConfirmationModal';
import ErrorBoundary from '../modalWindow/ErrorBoundary/ErrorBoundary';

const ModalContainer = ({
    // Delete modal
    deleteModalOpen,
    guestToDelete,
    isDeleting,
    onDeleteClose,
    onDeleteConfirm,
    
    // Edit modal
    editModalOpen,
    guestToEdit,
    isUpdating,
    onEditClose,
    onEditSubmit,
    
    // Create modal
    createModalOpen,
    isCreating,
    onCreateClose,
    onCreateSubmit,
    
    // Wedding info modal
    weddingModalOpen,
    weddingInfo,
    isUpdatingWedding,
    onWeddingClose,
    onWeddingSubmit,
    
    // Logout modal
    logoutModalOpen,
    onLogoutClose,
    onLogoutConfirm
}) => {
    return (
        <ErrorBoundary>
            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                onClose={onDeleteClose}
                onConfirm={onDeleteConfirm}
                guestName={guestToDelete?.fullName}
                isDeleting={isDeleting}
            />
            
            <GuestFormModal
                isOpen={editModalOpen}
                onClose={onEditClose}
                onSubmit={onEditSubmit}
                isSubmitting={isUpdating}
                guest={guestToEdit}
                mode="edit"
            />
            
            <GuestFormModal
                isOpen={createModalOpen}
                onClose={onCreateClose}
                onSubmit={onCreateSubmit}
                isSubmitting={isCreating}
                mode="create"
            />
            
            <WeddingInfoModal
                isOpen={weddingModalOpen}
                onClose={onWeddingClose}
                onSubmit={onWeddingSubmit}
                isSubmitting={isUpdatingWedding}
                weddingInfo={weddingInfo}
                mode="edit"
            />
            
            <LogoutConfirmationModal
                isOpen={logoutModalOpen}
                onClose={onLogoutClose}
                onConfirm={onLogoutConfirm}
            />
        </ErrorBoundary>
    );
};

export default ModalContainer; 