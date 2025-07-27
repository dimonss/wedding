import React from 'react';
import Loader from '../../loader/Loader';
import './GuestTableComponent.css';

const GuestTableComponent = ({
    filteredGuestList,
    onNavigate,
    onEditClick,
    onDeleteClick,
    isUpdating,
    isDeleting,
    guestToDelete,
    searchTerm
}) => {
    return (
        <>
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
                        <tr key={guest.uuid} onClick={() => onNavigate(guest.uuid)}>
                            <td data-label="Name">{guest.fullName}</td>
                            <td data-label="Status" className={`status`}>
                                {guest.respStatus === null ? '⏳ Pending' :
                                    guest.respStatus ? '✅ Attending' : '❌ Not'}
                            </td>
                            <td data-label="Resp Date">{guest.respDate}</td>
                            <td data-label="UUID">{guest.uuid}</td>
                            <td data-label="Actions" className="actions-cell">
                                <button
                                    className="edit-button"
                                    onClick={(e) => onEditClick(e, guest)}
                                    disabled={isUpdating}
                                >
                                    ✏️ Edit
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={(e) => onDeleteClick(e, guest)}
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
        </>
    );
};

export default GuestTableComponent; 