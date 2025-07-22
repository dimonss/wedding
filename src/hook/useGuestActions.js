import { useCallback } from 'react';

export const useGuestActions = (
    deleteGuest,
    updateGuest,
    createGuest,
    updateCoupleInfo,
    updateWeddingInfo,
    setDeleteModalOpen,
    setEditModalOpen,
    setCreateModalOpen,
    setWeddingModalOpen,
    setGuestToDelete,
    setGuestToEdit,
    setIsDeleting,
    setIsUpdating,
    setIsCreating,
    setIsUpdatingWedding
) => {
    const navigate = useCallback((uuid) => {
        window.location.href = window.location.pathname + "/" + uuid;
    }, []);

    const handleConfirmDelete = useCallback(async (guestToDelete) => {
        if (guestToDelete) {
            setIsDeleting(true);
            try {
                await deleteGuest(guestToDelete.uuid);
                setDeleteModalOpen(false);
                setGuestToDelete(null);
            } finally {
                setIsDeleting(false);
            }
        }
    }, [deleteGuest, setDeleteModalOpen, setGuestToDelete, setIsDeleting]);

    const handleUpdateGuest = useCallback(async (formData, guestToEdit) => {
        if (guestToEdit) {
            setIsUpdating(true);
            try {
                await updateGuest(guestToEdit.uuid, formData);
                setEditModalOpen(false);
                setGuestToEdit(null);
            } finally {
                setIsUpdating(false);
            }
        }
    }, [updateGuest, setEditModalOpen, setGuestToEdit, setIsUpdating]);

    const handleCreateGuest = useCallback(async (formData) => {
        setIsCreating(true);
        try {
            await createGuest(formData);
            setCreateModalOpen(false);
        } finally {
            setIsCreating(false);
        }
    }, [createGuest, setCreateModalOpen, setIsCreating]);

    const handleUpdateWeddingInfo = useCallback(async (formData) => {
        setIsUpdatingWedding(true);
        try {
            const { coupleData, weddingData } = formData;
            
            // Update couple information
            const coupleResult = await updateCoupleInfo(coupleData);
            if (!coupleResult.success) {
                console.error('Error updating couple information:', coupleResult.error);
                return;
            }
            
            // Update wedding information
            const weddingResult = await updateWeddingInfo(weddingData);
            if (!weddingResult.success) {
                console.error('Error updating wedding information:', weddingResult.error);
                return;
            }
            
            setWeddingModalOpen(false);
        } catch (error) {
            console.error('Error updating wedding information:', error);
        } finally {
            setIsUpdatingWedding(false);
        }
    }, [updateCoupleInfo, updateWeddingInfo, setWeddingModalOpen, setIsUpdatingWedding]);

    return {
        navigate,
        handleConfirmDelete,
        handleUpdateGuest,
        handleCreateGuest,
        handleUpdateWeddingInfo
    };
}; 