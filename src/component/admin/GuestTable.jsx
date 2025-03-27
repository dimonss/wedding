import React from 'react';
import './admin.css';
import Loader from '../loader/Loader';

const GuestTable = ({guestList, loading, error}) => {
    if (loading) return <Loader/>;
    if (error) return <div className="error-message">Error: {error}</div>;
    if (!guestList || guestList.length === 0) return <div>No guests found</div>;

    return (
        <div className="guest-table-container">
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
                    <tr key={guest.uuid}>
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