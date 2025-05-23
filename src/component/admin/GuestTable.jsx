import React, {useCallback, useMemo} from 'react';
import './admin.css';
import Loader from '../loader/Loader';
import useGuestList from "../../hook/useGuestList";

const DEFAULT_VALUES = {
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0
}

const GuestTable = ({credentials, onLogout}) => {
    const {guestList, loading, error, refetchGuestList} = useGuestList(credentials);
    const navigate = useCallback((uuid) => {
        window.location.href = window.location.pathname + "/" + uuid
    }, []);
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
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default GuestTable;