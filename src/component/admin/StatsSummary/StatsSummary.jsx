import React from 'react';
import './StatsSummary.css';

const StatsSummary = ({ stats, guestList, filteredGuestList, searchTerm, statusFilter }) => {
    const getStatusFilterText = () => {
        switch (statusFilter) {
            case null:
                return '⏳ Pending';
            case 1:
                return '✅ Attending';
            case 0:
                return '❌ Not';
            default:
                return 'All';
        }
    };

    const hasActiveFilters = searchTerm || statusFilter !== 'all';

    return (
        <>
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
            
            {hasActiveFilters && (
                <div className="filter-results-info">
                    <span className="filter-info-main">
                        Showing {filteredGuestList.length} of {guestList.length} guests
                    </span>
                    {searchTerm && <span className="filter-info"> • Search: "{searchTerm}"</span>}
                    {statusFilter !== 'all' && <span className="filter-info"> • Status: {getStatusFilterText()}</span>}
                </div>
            )}
        </>
    );
};

export default StatsSummary; 