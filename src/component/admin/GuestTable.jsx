import React, { useState } from 'react';
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
import TestError from '../TestError/TestError';
import StatusFilter from './StatusFilter/StatusFilter';

const GuestTable = ({credentials, onLogout}) => {
    const [showTestError, setShowTestError] = useState(false);
    const [testModalErrorOpen, setTestModalErrorOpen] = useState(false);
    
    const {guestList, loading, error, refetchGuestList, deleteGuest, updateGuest, createGuest} = useGuestList(credentials);
    const {weddingInfo, loading: weddingLoading, error: weddingError, updateAllWeddingInfo} = useWeddingInfo(credentials);
    
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
        statusFilter,
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
        handleClearSearch,
        handleStatusChange
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
        updateAllWeddingInfo,
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

    // Handle test error button
    const handleTestErrorClick = () => {
        setShowTestError(!showTestError);
    };

    // Handle test modal error button
    const handleTestModalErrorClick = () => {
        setTestModalErrorOpen(true);
    };

    // Handle test modal error close
    const handleTestModalErrorClose = () => {
        setTestModalErrorOpen(false);
    };

    if (error) return <div className="error-message">Error: {error}</div>;
    if (weddingError) return <div className="error-message">Wedding Info Error: {weddingError}</div>;

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
                testModalErrorOpen={testModalErrorOpen}
                onTestModalErrorClose={handleTestModalErrorClose}
            />
            
            <AdminHeader
                onCreateClick={handleCreateClick}
                onWeddingInfoClick={handleWeddingInfoClick}
                onRefreshClick={refetchGuestList}
                onLogoutClick={handleLogoutClick}
                onTestErrorClick={handleTestErrorClick}
                onTestModalErrorClick={handleTestModalErrorClick}
                isCreating={isCreating}
                isUpdatingWedding={isUpdatingWedding}
                weddingLoading={weddingLoading}
                loading={loading}
            />
            
            {showTestError && <TestError />}

            <StatsSummary
                stats={stats}
                guestList={guestList}
                filteredGuestList={filteredGuestList}
                searchTerm={searchTerm}
                statusFilter={statusFilter}
            />


            
            <StatusFilter
                selectedStatus={statusFilter}
                onStatusChange={handleStatusChange}
            />

            <SearchBar
                searchTerm={searchTerm}
                onSearchChange={handleSearchChange}
                onClearSearch={handleClearSearch}
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