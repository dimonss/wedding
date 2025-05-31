import React, {useCallback, useMemo, useState, useEffect} from 'react';
import './admin.css';
import Loader from '../loader/Loader';
import useGuestList from "../../hook/useGuestList";

const DEFAULT_VALUES = {
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0
}

const DeleteConfirmationModal = ({isOpen, onClose, onConfirm, guestName, isDeleting}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Delete Guest</h3>
                <p>Are you sure you want to delete {guestName}?</p>
                <div className="modal-actions">
                    <button
                        className="modal-button confirm"
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting ? <Loader/> : 'Yes'}
                    </button>
                    <button
                        className="modal-button cancel"
                        onClick={onClose}
                    >
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

const EditGuestModal = ({isOpen, onClose, guest, onUpdate, isUpdating}) => {
    const [formData, setFormData] = useState({
        fullName: '',
        gender: '',
        respStatus: ''
    });

    useEffect(() => {
        if (guest) {
            setFormData({
                fullName: guest.fullName || '',
                gender: guest.gender || '',
                respStatus: guest.respStatus === null ? null : guest.respStatus ? '1' : '0'
            });
        }
    }, [guest]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            respStatus: formData.respStatus === '' ? null : parseInt(formData.respStatus)
        };
        onUpdate(data);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content edit-form">
                <h3>Edit Guest</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="respStatus">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="respStatus">Response Status</label>
                        <select
                            id="respStatus"
                            name="respStatus"
                            value={formData.respStatus}
                            onChange={handleChange}
                        >
                            <option value="null">Pending</option>
                            <option value="1">Attending</option>
                            <option value="0">Not Attending</option>
                        </select>
                    </div>
                    <div className="modal-actions">
                        <button
                            type="submit"
                            className="modal-button confirm"
                            disabled={isUpdating}
                        >
                            {isUpdating ? <Loader/> : 'Update'}
                        </button>
                        <button
                            type="button"
                            className="modal-button cancel"
                            onClick={onClose}
                            disabled={isUpdating}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const CreateGuestModal = ({isOpen, onClose, onCreate, isCreating}) => {
    const [formData, setFormData] = useState({
        fullName: '',
        gender: '',
        respStatus: 'null'
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            respStatus: formData.respStatus === 'null' ? null : parseInt(formData.respStatus)
        };
        onCreate(data);
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content edit-form">
                <h3>Add New Guest</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="respStatus">Response Status</label>
                        <select
                            id="respStatus"
                            name="respStatus"
                            value={formData.respStatus}
                            onChange={handleChange}
                        >
                            <option value="null">Pending</option>
                            <option value="1">Attending</option>
                            <option value="0">Not Attending</option>
                        </select>
                    </div>
                    <div className="modal-actions">
                        <button
                            type="submit"
                            className="modal-button confirm"
                            disabled={isCreating}
                        >
                            {isCreating ? <Loader/> : 'Create'}
                        </button>
                        <button
                            type="button"
                            className="modal-button cancel"
                            onClick={onClose}
                            disabled={isCreating}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

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
            <EditGuestModal
                isOpen={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                guest={guestToEdit}
                onUpdate={handleUpdateGuest}
                isUpdating={isUpdating}
            />
            <CreateGuestModal
                isOpen={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onCreate={handleCreateGuest}
                isCreating={isCreating}
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