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
    
    // Search and filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Filtered guest list
    const filteredGuestList = useMemo(() => {
        if (!guestList) return [];
        
        let filtered = guestList;
        
        // Apply status filter
        if (statusFilter !== 'all') {
            filtered = filtered.filter(guest => guest.respStatus === statusFilter);
        }
        
        // Apply search filter
        if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(guest => 
                guest.fullName?.toLowerCase().includes(searchLower) ||
                guest.uuid?.toLowerCase().includes(searchLower)
            );
        }
        
        return filtered;
    }, [guestList, searchTerm, statusFilter]);

    // Stats calculation - based on full guest list, not filtered
    const stats = useMemo(() => (guestList ? {
        total: guestList.length,
        approved: guestList.filter(guest => guest.respStatus === 1).length,
        rejected: guestList.filter(guest => guest.respStatus === 0).length,
        pending: guestList.filter(guest => guest.respStatus === null).length
    } : DEFAULT_VALUES), [guestList]);

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

    // Status filter handlers
    const handleStatusChange = useCallback((status) => {
        setStatusFilter(status);
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
        statusFilter,
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
        handleClearSearch,
        handleStatusChange
    };
}; 