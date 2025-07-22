import React from 'react';
import DeleteConfirmationModal from '../modalWindow/DeleteConfirmationModal/DeleteConfirmationModal';
import GuestFormModal from '../modalWindow/GuestFormModal/GuestFormModal';
import WeddingInfoModal from '../modalWindow/WeddingInfoModal/WeddingInfoModal';
import LogoutConfirmationModal from '../modalWindow/LogoutConfirmationModal/LogoutConfirmationModal';
import TestModalError from '../modalWindow/TestModalError/TestModalError';
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
    onLogoutConfirm,
    
    // Test modal error
    testModalErrorOpen,
    onTestModalErrorClose
}) => {
    return (
        <>
            <ErrorBoundary>
                <DeleteConfirmationModal
                    isOpen={deleteModalOpen}
                    onClose={onDeleteClose}
                    onConfirm={onDeleteConfirm}
                    guestName={guestToDelete?.fullName}
                    isDeleting={isDeleting}
                />
            </ErrorBoundary>
            
            <ErrorBoundary>
                <GuestFormModal
                    isOpen={editModalOpen}
                    onClose={onEditClose}
                    onSubmit={onEditSubmit}
                    isSubmitting={isUpdating}
                    guest={guestToEdit}
                    mode="edit"
                />
            </ErrorBoundary>
            
            <ErrorBoundary>
                <GuestFormModal
                    isOpen={createModalOpen}
                    onClose={onCreateClose}
                    onSubmit={onCreateSubmit}
                    isSubmitting={isCreating}
                    mode="create"
                />
            </ErrorBoundary>
            
            <ErrorBoundary>
                <WeddingInfoModal
                    isOpen={weddingModalOpen}
                    onClose={onWeddingClose}
                    onSubmit={onWeddingSubmit}
                    isSubmitting={isUpdatingWedding}
                    weddingInfo={weddingInfo}
                    mode="edit"
                />
            </ErrorBoundary>
            
            <ErrorBoundary>
                <LogoutConfirmationModal
                    isOpen={logoutModalOpen}
                    onClose={onLogoutClose}
                    onConfirm={onLogoutConfirm}
                />
            </ErrorBoundary>
            
            <ErrorBoundary>
                <TestModalError
                    isOpen={testModalErrorOpen}
                    onClose={onTestModalErrorClose}
                />
            </ErrorBoundary>
        </>
    );
};

export default ModalContainer; 