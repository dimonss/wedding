import React from 'react';
import './StatsSummary.css';

const StatsSummary = ({ stats, guestList, filteredGuestList, searchTerm }) => {
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
            
            {searchTerm && (
                <div className="search-results-info">
                    Showing {filteredGuestList.length} of {guestList.length} guests
                </div>
            )}
        </>
    );
};

export default StatsSummary; 