import React from 'react';
import Loader from '../../loader/Loader';
import './AdminHeader.css';

const AdminHeader = ({
    onCreateClick,
    onWeddingInfoClick,
    onRefreshClick,
    onLogoutClick,
    isCreating,
    isUpdatingWedding,
    weddingLoading,
    loading
}) => {
    return (
        <div className="admin-header">
            <h2>Guest List</h2>
            <div className="admin-actions">
                <button
                    className="create-button admin-action-btn"
                    onClick={onCreateClick}
                    disabled={isCreating}
                >
                    ➕ Add Guest
                </button>
                <button
                    className="wedding-info-button admin-action-btn"
                    onClick={onWeddingInfoClick}
                    disabled={isUpdatingWedding || weddingLoading}
                >
                    {isUpdatingWedding || weddingLoading ? <Loader/> : '💒 Wedding Info'}
                </button>
                <button
                    className={`refresh-button admin-action-btn${loading ? "" : " refresh-button__icon"}`}
                    onClick={onRefreshClick}
                    disabled={loading}
                >
                    {loading ? <Loader/> : 'Refresh Data'}
                </button>
                <button
                    className="logout-button admin-action-btn"
                    onClick={onLogoutClick}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminHeader; 