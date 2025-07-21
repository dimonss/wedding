import React, {useCallback, useMemo, useState} from 'react';
import './guestTable.css';
import Loader from '../loader/Loader';
import useGuestList from "../../hook/useGuestList";
import useWeddingInfo from "../../hook/useWeddingInfo";
import DeleteConfirmationModal from './modalWindow/DeleteConfirmationModal/DeleteConfirmationModal';
import GuestFormModal from './modalWindow/GuestFormModal/GuestFormModal';
import WeddingInfoModal from './modalWindow/WeddingInfoModal/WeddingInfoModal';
import LogoutConfirmationModal from './modalWindow/LogoutConfirmationModal/LogoutConfirmationModal';

const DEFAULT_VALUES = {
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0
}

const GuestTable = ({credentials, onLogout}) => {
    const {guestList, loading, error, refetchGuestList, deleteGuest, updateGuest, createGuest} = useGuestList(credentials);
    const {weddingInfo, loading: weddingLoading, error: weddingError, updateCoupleInfo, updateWeddingInfo} = useWeddingInfo(credentials);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [weddingModalOpen, setWeddingModalOpen] = useState(false);
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [guestToDelete, setGuestToDelete] = useState(null);
    const [guestToEdit, setGuestToEdit] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdatingWedding, setIsUpdatingWedding] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const navigate = useCallback((uuid) => {
        window.location.href = window.location.pathname + "/" + uuid
    }, []);

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

    const handleConfirmDelete = useCallback(async () => {
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
    }, [guestToDelete, deleteGuest]);

    const handleUpdateGuest = useCallback(async (formData) => {
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
    }, [guestToEdit, updateGuest]);

    const handleCreateGuest = useCallback(async (formData) => {
        setIsCreating(true);
        try {
            await createGuest(formData);
            setCreateModalOpen(false);
        } finally {
            setIsCreating(false);
        }
    }, [createGuest]);

    const handleWeddingInfoClick = useCallback(() => {
        setWeddingModalOpen(true);
    }, []);

    const handleLogoutClick = useCallback(() => {
        setLogoutModalOpen(true);
    }, []);

    const handleLogoutClose = useCallback(() => {
        setLogoutModalOpen(false);
    }, []);

    const handleLogoutConfirm = useCallback(() => {
        setLogoutModalOpen(false);
        onLogout();
    }, [onLogout]);

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
    }, [updateCoupleInfo, updateWeddingInfo]);

    // Filter guests based on search term
    const filteredGuestList = useMemo(() => {
        if (!guestList) return [];
        if (!searchTerm.trim()) return guestList;
        
        const searchLower = searchTerm.toLowerCase();
        return guestList.filter(guest => 
            guest.fullName?.toLowerCase().includes(searchLower) ||
            guest.uuid?.toLowerCase().includes(searchLower)
        );
    }, [guestList, searchTerm]);

    const stats = useMemo(() => (filteredGuestList ? {
        total: filteredGuestList.length,
        approved: filteredGuestList.filter(guest => guest.respStatus === 1).length,
        rejected: filteredGuestList.filter(guest => guest.respStatus === 0).length,
        pending: filteredGuestList.filter(guest => guest.respStatus === null).length
    } : DEFAULT_VALUES), [filteredGuestList]);

    if (error) return <div className="error-message">Error: {error}</div>;
    if (weddingError) return <div className="error-message">Wedding Info Error: {weddingError}</div>;
    // if (!guestList || guestList.length === 0) return ;

    return (
        <div className="guest-table-container">
            <DeleteConfirmationModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                guestName={guestToDelete?.fullName}
                isDeleting={isDeleting}
            />
            <GuestFormModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSubmit={handleUpdateGuest}
                isSubmitting={isUpdating}
                guest={guestToEdit}
                mode="edit"
            />
            <GuestFormModal
                isOpen={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onSubmit={handleCreateGuest}
                isSubmitting={isCreating}
                mode="create"
            />
            <WeddingInfoModal
                isOpen={weddingModalOpen}
                onClose={() => setWeddingModalOpen(false)}
                onSubmit={handleUpdateWeddingInfo}
                isSubmitting={isUpdatingWedding}
                weddingInfo={weddingInfo}
                mode="edit"
            />
            <LogoutConfirmationModal
                isOpen={logoutModalOpen}
                onClose={handleLogoutClose}
                onConfirm={handleLogoutConfirm}
            />
            <div className="admin-header">
                <h2>Guest List</h2>
                <div className="admin-actions">
                    <button
                        className="create-button admin-action-btn"
                        onClick={handleCreateClick}
                        disabled={isCreating}
                    >
                        ➕ Add Guest
                    </button>
                    <button
                        className="wedding-info-button admin-action-btn"
                        onClick={handleWeddingInfoClick}
                        disabled={isUpdatingWedding || weddingLoading}
                    >
                        {isUpdatingWedding || weddingLoading ? <Loader/> : '💒 Wedding Info'}
                    </button>
                    <button
                        className={`refresh-button admin-action-btn${loading ? "" : " refresh-button__icon"}`}
                        onClick={refetchGuestList}
                        disabled={loading}
                    >
                        {loading ? <Loader/> : 'Refresh Data'}
                    </button>
                    <button
                        className="logout-button admin-action-btn"
                        onClick={handleLogoutClick}
                    >
                        Logout
                    </button>
                </div>
            </div>
            
            {/* Search Input */}
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search guests by name, email, phone, or UUID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                {searchTerm && (
                    <button
                        className="clear-search-btn"
                        onClick={() => setSearchTerm('')}
                        title="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>

            <div className="stats-summary">
                <div className="stat-item">
                    <span className="stat-label">Total:</span>
                    <span className="stat-value">{stats.total}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Approved:</span>
                    <span className="stat-value approved">{stats.approved}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Rejected:</span>
                    <span className="stat-value rejected">{stats.rejected}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Pending:</span>
                    <span className="stat-value pending">{stats.pending}</span>
                </div>
            </div>
            
            {searchTerm && (
                <div className="search-results-info">
                    Showing {filteredGuestList.length} of {guestList.length} guests
                </div>
            )}
            
            <h2>Guest List</h2>
            <table className="guest-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Resp Date</th>
                    <th>UUID</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredGuestList.map((guest) => (
                    <tr key={guest.uuid} onClick={() => navigate(guest.uuid)}>
                        <td data-label="Name">{guest.fullName}</td>
                        <td data-label="Status" className={`status ${guest.status}`}>
                            {guest.respStatus === null ? '⏳ Pending' :
                                guest.respStatus ? '✅ Attending' : '❌ Not'}
                        </td>
                        <td data-label="Resp Date">{guest.respDate}</td>
                        <td data-label="UUID">{guest.uuid}</td>
                        <td data-label="Actions" className="actions-cell">
                            <button
                                className="edit-button"
                                onClick={(e) => handleEditClick(e, guest)}
                                disabled={isUpdating}
                            >
                                ✏️ Edit
                            </button>
                            <button
                                className="delete-button"
                                onClick={(e) => handleDeleteClick(e, guest)}
                                disabled={isDeleting}
                            >
                                {isDeleting && guestToDelete?.uuid === guest.uuid ? <Loader/> : '🗑️ Delete'}
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            
            {filteredGuestList.length === 0 && (
                <div className="no-results">
                    {searchTerm ? `No guests found matching "${searchTerm}"` : "No guests found"}
                </div>
            )}
        </div>
    );
};

export default GuestTable;