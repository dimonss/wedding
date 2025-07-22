import React from 'react';
import './guestTable.css';
import useGuestList from "../../hook/useGuestList";
import useWeddingInfo from "../../hook/useWeddingInfo";
import { useGuestTableState } from "../../hook/useGuestTableState";
import { useGuestActions } from "../../hook/useGuestActions";
import AdminHeader from './AdminHeader/AdminHeader';
import SearchBar from './SearchBar/SearchBar';
import StatsSummary from './StatsSummary/StatsSummary';
import GuestTableComponent from './GuestTableComponent/GuestTableComponent';
import ModalContainer from './ModalContainer/ModalContainer';

const GuestTable = ({credentials, onLogout}) => {
    const {guestList, loading, error, refetchGuestList, deleteGuest, updateGuest, createGuest} = useGuestList(credentials);
    const {weddingInfo, loading: weddingLoading, error: weddingError, updateCoupleInfo, updateWeddingInfo} = useWeddingInfo(credentials);
    
    // Custom hooks for state management
    const {
        deleteModalOpen,
        editModalOpen,
        createModalOpen,
        weddingModalOpen,
        logoutModalOpen,
        guestToDelete,
        guestToEdit,
        isDeleting,
        isUpdating,
        isCreating,
        isUpdatingWedding,
        searchTerm,
        filteredGuestList,
        stats,
        setDeleteModalOpen,
        setEditModalOpen,
        setCreateModalOpen,
        setWeddingModalOpen,
        setLogoutModalOpen,
        setGuestToDelete,
        setGuestToEdit,
        setIsDeleting,
        setIsUpdating,
        setIsCreating,
        setIsUpdatingWedding,
        handleDeleteClick,
        handleEditClick,
        handleCreateClick,
        handleWeddingInfoClick,
        handleLogoutClick,
        handleLogoutClose,
        handleLogoutConfirm,
        handleSearchChange,
        handleClearSearch
    } = useGuestTableState(guestList);
    
    // Custom hook for guest actions
    const {
        navigate,
        handleConfirmDelete,
        handleUpdateGuest,
        handleCreateGuest,
        handleUpdateWeddingInfo
    } = useGuestActions(
        deleteGuest,
        updateGuest,
        createGuest,
        updateCoupleInfo,
        updateWeddingInfo,
        setDeleteModalOpen,
        setEditModalOpen,
        setCreateModalOpen,
        setWeddingModalOpen,
        setGuestToDelete,
        setGuestToEdit,
        setIsDeleting,
        setIsUpdating,
        setIsCreating,
        setIsUpdatingWedding
    );

    // Handle logout with onLogout callback
    const handleLogoutConfirmWithCallback = () => {
        handleLogoutConfirm(onLogout);
    };

    if (error) return <div className="error-message">Error: {error}</div>;
    if (weddingError) return <div className="error-message">Wedding Info Error: {weddingError}</div>;
    // if (!guestList || guestList.length === 0) return ;

    return (
        <div className="guest-table-container">
            <ModalContainer
                deleteModalOpen={deleteModalOpen}
                guestToDelete={guestToDelete}
                isDeleting={isDeleting}
                onDeleteClose={() => setDeleteModalOpen(false)}
                onDeleteConfirm={() => handleConfirmDelete(guestToDelete)}
                editModalOpen={editModalOpen}
                guestToEdit={guestToEdit}
                isUpdating={isUpdating}
                onEditClose={() => setEditModalOpen(false)}
                onEditSubmit={(formData) => handleUpdateGuest(formData, guestToEdit)}
                createModalOpen={createModalOpen}
                isCreating={isCreating}
                onCreateClose={() => setCreateModalOpen(false)}
                onCreateSubmit={handleCreateGuest}
                weddingModalOpen={weddingModalOpen}
                weddingInfo={weddingInfo}
                isUpdatingWedding={isUpdatingWedding}
                onWeddingClose={() => setWeddingModalOpen(false)}
                onWeddingSubmit={handleUpdateWeddingInfo}
                logoutModalOpen={logoutModalOpen}
                onLogoutClose={handleLogoutClose}
                onLogoutConfirm={handleLogoutConfirmWithCallback}
            />
            
            <AdminHeader
                onCreateClick={handleCreateClick}
                onWeddingInfoClick={handleWeddingInfoClick}
                onRefreshClick={refetchGuestList}
                onLogoutClick={handleLogoutClick}
                isCreating={isCreating}
                isUpdatingWedding={isUpdatingWedding}
                weddingLoading={weddingLoading}
                loading={loading}
            />
            
            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onClearSearch={handleClearSearch}
            />

            <StatsSummary
                stats={stats}
                guestList={guestList}
                filteredGuestList={filteredGuestList}
                searchTerm={searchTerm}
            />
            
            <GuestTableComponent
                filteredGuestList={filteredGuestList}
                onNavigate={navigate}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
                isUpdating={isUpdating}
                isDeleting={isDeleting}
                guestToDelete={guestToDelete}
                searchTerm={searchTerm}
            />
        </div>
    );
};

export default GuestTable;