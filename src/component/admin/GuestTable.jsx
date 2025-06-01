import React, {useCallback, useMemo, useState} from 'react';
import './admin.css';
import Loader from '../loader/Loader';
import useGuestList from "../../hook/useGuestList";
import DeleteConfirmationModal from './DeleteConfirmationModal';
import GuestFormModal from './GuestFormModal';

const DEFAULT_VALUES = {
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0
}

const GuestTable = ({credentials, onLogout}) => {
    const {guestList, loading, error, refetchGuestList, deleteGuest, updateGuest, createGuest} = useGuestList(credentials);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [guestToDelete, setGuestToDelete] = useState(null);
    const [guestToEdit, setGuestToEdit] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

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

    const stats = useMemo(() => (guestList ? {
        total: guestList.length,
        approved: guestList.filter(guest => guest.respStatus === 1).length,
        rejected: guestList.filter(guest => guest.respStatus === 0).length,
        pending: guestList.filter(guest => guest.respStatus === null).length
    } : DEFAULT_VALUES), [guestList]);

    if (error) return <div className="error-message">Error: {error}</div>;
    if (!guestList || guestList.length === 0) return <div>No guests found</div>;

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
            <div className="admin-header">
                <h2>Guest List</h2>
                <div className="admin-actions">
                    <button
                        className="create-button"
                        onClick={handleCreateClick}
                        disabled={isCreating}
                    >
                        ➕ Add Guest
                    </button>
                    <button
                        className={`refresh-button${loading ? "" : " refresh-button__icon"}`}
                        onClick={refetchGuestList}
                        disabled={loading}
                    >
                        {loading ? <Loader/> : 'Refresh Data'}
                    </button>
                    <button
                        className="logout-button"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                </div>
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
                {guestList.map((guest) => (
                    <tr key={guest.uuid} onClick={() => navigate(guest.uuid)}>
                        <td>{guest.fullName}</td>
                        <td className={`status ${guest.status}`}>
                            {guest.respStatus === null ? '⏳ Pending' :
                                guest.respStatus ? '✅ Attending' : '❌ Not'}
                        </td>
                        <td>{guest.respDate}</td>
                        <td>{guest.uuid}</td>
                        <td className="actions-cell">
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
        </div>
    );
};

export default GuestTable;