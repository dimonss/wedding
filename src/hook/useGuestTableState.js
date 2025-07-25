import { useState, useCallback, useMemo } from 'react';

const DEFAULT_VALUES = {
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0
};

export const useGuestTableState = (guestList) => {
    // Modal states
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [weddingModalOpen, setWeddingModalOpen] = useState(false);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    
    // Guest states
    const [guestToDelete, setGuestToDelete] = useState(null);
    const [guestToEdit, setGuestToEdit] = useState(null);
    
    // Loading states
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdatingWedding, setIsUpdatingWedding] = useState(false);
    
    // Search state
    const [searchTerm, setSearchTerm] = useState('');

    // Filtered guest list
    const filteredGuestList = useMemo(() => {
        if (!guestList) return [];
        if (!searchTerm.trim()) return guestList;
        
        const searchLower = searchTerm.toLowerCase();
        return guestList.filter(guest => 
            guest.fullName?.toLowerCase().includes(searchLower) ||
            guest.uuid?.toLowerCase().includes(searchLower)
        );
    }, [guestList, searchTerm]);

    // Stats calculation
    const stats = useMemo(() => (filteredGuestList ? {
        total: filteredGuestList.length,
        approved: filteredGuestList.filter(guest => guest.respStatus === 1).length,
        rejected: filteredGuestList.filter(guest => guest.respStatus === 0).length,
        pending: filteredGuestList.filter(guest => guest.respStatus === null).length
    } : DEFAULT_VALUES), [filteredGuestList]);

    // Modal handlers
    const handleDeleteClick = useCallback((e, guest) => {
        e.stopPropagation();
        setGuestToDelete(guest);
        setDeleteModalOpen(true);
    }, []);

    const handleEditClick = useCallback((e, guest) => {
        e.stopPropagation();
        setGuestToEdit(guest);
        setEditModalOpen(true);
    }, []);

    const handleCreateClick = useCallback(() => {
        setCreateModalOpen(true);
    }, []);

    const handleWeddingInfoClick = useCallback(() => {
        setWeddingModalOpen(true);
    }, []);

    const handleLogoutClick = useCallback(() => {
        setLogoutModalOpen(true);
    }, []);

    const handleLogoutClose = useCallback(() => {
        setLogoutModalOpen(false);
    }, []);

    const handleLogoutConfirm = useCallback((onLogout) => {
        setLogoutModalOpen(false);
        onLogout();
    }, []);

    // Search handlers
    const handleSearchChange = useCallback((value) => {
        setSearchTerm(value);
    }, []);

    const handleClearSearch = useCallback(() => {
        setSearchTerm('');
    }, []);

    return {
        // States
        deleteModalOpen,
        editModalOpen,
        createModalOpen,
        weddingModalOpen,
        logoutModalOpen,
        guestToDelete,
        guestToEdit,
        isDeleting,
        isUpdating,
        isCreating,
        isUpdatingWedding,
        searchTerm,
        filteredGuestList,
        stats,
        
        // Setters
        setDeleteModalOpen,
        setEditModalOpen,
        setCreateModalOpen,
        setWeddingModalOpen,
        setLogoutModalOpen,
        setGuestToDelete,
        setGuestToEdit,
        setIsDeleting,
        setIsUpdating,
        setIsCreating,
        setIsUpdatingWedding,
        
        // Handlers
        handleDeleteClick,
        handleEditClick,
        handleCreateClick,
        handleWeddingInfoClick,
        handleLogoutClick,
        handleLogoutClose,
        handleLogoutConfirm,
        handleSearchChange,
        handleClearSearch
    };
}; 