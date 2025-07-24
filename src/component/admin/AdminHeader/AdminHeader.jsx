import React from 'react';
import Loader from '../../loader/Loader';
import './AdminHeader.css';

const AdminHeader = ({
                         onCreateClick,
                         onWeddingInfoClick,
                         onRefreshClick,
                         onLogoutClick,
                         onTestErrorClick,
                         onTestModalErrorClick,
                         isCreating,
                         isUpdatingWedding,
                         weddingLoading,
                         loading
                     }) => {
    return (
        <div className="admin-header">
            <div className={'admin-header-title'}>
                <h2 onDoubleClick={onTestErrorClick}>Guest &nbsp;</h2><h2 onDoubleClick={onTestModalErrorClick}>List</h2>
            </div>
            <div className="admin-actions">
                <button
                    className="admin-action-btn create-button"
                    onClick={onCreateClick}
                    disabled={isCreating}
                >
                    {isCreating ? 'Creating...' : '➕ Add Guest'}
                </button>

                <button
                    className="admin-action-btn refresh-button"
                    onClick={onRefreshClick}
                    disabled={loading}
                >
                    <span className="refresh-button__icon"></span>
                    {loading ? 'Refreshing...' : 'Refresh Data'}
                </button>

                <button
                    className="admin-action-btn wedding-info-button"
                    onClick={onWeddingInfoClick}
                    disabled={isUpdatingWedding || weddingLoading}
                >
                    {isUpdatingWedding ? 'Updating...' : 'Wedding Info'}
                </button>

                <button
                    className="admin-action-btn logout-button"
                    onClick={onLogoutClick}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminHeader; 