import React, {useEffect, useState} from "react";
import "./App.css";
import useGuestData from "./hook/useGuestData";
import useAcceptGuest from "./hook/useAcceptGuest";
import useRejectGuest from "./hook/useRejectGuest";
import useAdminCredentials from "./hook/useAdminCredentials";
import GuestTable from "./component/admin/GuestTable";
import LoginForm from "./component/loginForm/LoginForm";
import InvitationPage from "./component/InvitationPage/InvitationPage";

function App() {
    const [firstRender, setFirstRender] = useState(true);
    const [respStatus, setRespStatus] = useState(null);
    const { isAdmin, credentials, logout } = useAdminCredentials();
    let guestUUID = window.location.pathname.split('/').pop();
    guestUUID = guestUUID?.length === 36 ? guestUUID : null;

    const {guestData, guestLoading, guestError, fetchGuestData} = useGuestData(guestUUID);
    const {acceptCallback, acceptLoading, acceptError} = useAcceptGuest(guestUUID);
    const {rejectCallback, rejectLoading, rejectError} = useRejectGuest(guestUUID);
    useEffect(() => {
        setRespStatus(guestData?.respStatus)
    }, [guestData]);
    useEffect(() => {
        if (!acceptLoading && !rejectLoading && !firstRender) {
            fetchGuestData();
        }
    }, [acceptLoading, rejectLoading]);
    useEffect(() => {
        if (firstRender) {
            setFirstRender(false);
        }
    }, [firstRender]);

    // Show login form if not authenticated and no UUID
    if (!isAdmin && !guestUUID) {
        return <LoginForm />;
    }

    // Render admin view if authenticated
    if (isAdmin && !guestUUID) {
        return (
            <div className="app-container admin-mode">
                <div className="admin-panel">
                    <div className="admin-header">
                        <h1 className="admin-title">Wedding Admin Panel</h1>
                    </div>
                    <GuestTable 
                        credentials={credentials}
                        onLogout={logout}
                    />
                </div>
            </div>
        );
    }

    // Regular guest view
    //TODO rm props drilling
    return (
        <InvitationPage
            guestData={guestData}
            guestLoading={guestLoading}
            guestError={guestError}
            respStatus={respStatus}
            setRespStatus={setRespStatus}
            acceptCallback={acceptCallback}
            acceptLoading={acceptLoading}
            rejectCallback={rejectCallback}
            rejectLoading={rejectLoading}
        />
    );
}

export default App;
