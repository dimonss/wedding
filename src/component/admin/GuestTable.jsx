import React, {useCallback, useMemo, useState} from 'react';
import './admin.css';
import Loader from '../loader/Loader';
import useGuestList from "../../hook/useGuestList";

const DEFAULT_VALUES = {
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0
}

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, guestName }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Delete Guest</h3>
                <p>Are you sure you want to delete {guestName}?</p>
                <div className="modal-actions">
                    <button className="modal-button confirm" onClick={onConfirm}>Yes</button>
                    <button className="modal-button cancel" onClick={onClose}>No</button>
                </div>
            </div>
        </div>
    );
};

const GuestTable = ({credentials, onLogout}) => {
    const {guestList, loading, error, refetchGuestList, deleteGuest} = useGuestList(credentials);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [guestToDelete, setGuestToDelete] = useState(null);

    const navigate = useCallback((uuid) => {
        window.location.href = window.location.pathname + "/" + uuid
    }, []);

    const handleDeleteClick = useCallback((e, guest) => {
        e.stopPropagation();
        setGuestToDelete(guest);
        setDeleteModalOpen(true);
    }, []);

    const handleConfirmDelete = useCallback(async () => {
        if (guestToDelete) {
            await deleteGuest(guestToDelete.uuid);
            setDeleteModalOpen(false);
            setGuestToDelete(null);
        }
    }, [guestToDelete, deleteGuest]);

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
            />
            <div className="admin-header">
                <h2>Guest List</h2>
                <div className="admin-actions">
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
                        <td>
                            <button
                                className="delete-button"
                                onClick={(e) => handleDeleteClick(e, guest)}
                            >
                                🗑️ Delete
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