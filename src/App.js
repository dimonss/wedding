import React, {useEffect, useState} from "react";
import "./App.css";
import useConfetti from "./hook/useConfetti";
import useGuestData from "./hook/useGuestData";
import useAcceptGuest from "./hook/useAcceptGuest";
import useRejectGuest from "./hook/useRejectGuest";
import useAdminAuth from "./hook/useAdminAuth";
import Loader from "./component/loader/Loader";
import GuestTable from "./component/admin/GuestTable";

function App() {
    const [firstRender, setFirstRender] = useState(true);
    const {isAdmin, guestList, guestListError, guestListLoading} = useAdminAuth();
    useConfetti(isAdmin);
    let guestUUID = window.location.pathname.split('/').pop();
    guestUUID = guestUUID?.length === 36 ? guestUUID : null;

    const {guestData, guestLoading, guestError, fetchGuestData} = useGuestData(guestUUID);
    const {acceptCallback, acceptLoading, acceptError} = useAcceptGuest(guestUUID);
    const {rejectCallback, rejectLoading, rejectError} = useRejectGuest(guestUUID);
    useEffect(() => {
        if (!acceptLoading && !rejectLoading) {
            if (!firstRender) fetchGuestData();
            else setFirstRender(false);
        }
    }, [acceptLoading, rejectLoading, fetchGuestData, firstRender]);
    // Render admin view if authenticated
    if (isAdmin) {
        return (
            <div className="app-container admin-mode">
                <div className="admin-panel">
                    <div className="admin-header">
                        <h1 className="admin-title">Wedding Admin Panel</h1>
                    </div>
                    <GuestTable
                        guestList={guestList}
                        loading={guestListLoading}
                        error={guestListError}
                    />
                </div>
            </div>
        );
    }

    // Regular guest view
    return (
        <div className="app-container">
            <div className="confetti-container" id='confetti-container'></div>
            <div className="invitation-container">
                {guestData ? (
                    <>
                        <h1>💍 Приглашение на свадьбу 💍</h1>
                        <p className="welcome-text">{guestData?.fullName || 'Дорогие друзья и близкие!'}</p>
                        <p>
                            Мы, <span className="highlight">Дмитрий</span> и <span
                            className="highlight">Екатерина</span>,
                            с радостью приглашаем вас на наше свадебное торжество!
                        </p>
                        <p className="date">📅 Дата: 20 июля 2025 года</p>
                        <p className="location">📍 Место: Ресторан "Белый сад", г. Москва</p>
                        <p className="ending-text">Будем рады видеть вас в этот особенный день!</p>
                        <button
                            className="rsvp-button accept"
                            onClick={acceptCallback}
                        >
                            {acceptLoading ? <Loader/> : '💌 Я буду!'}
                        </button>
                        <button
                            className="rsvp-button reject"
                            onClick={rejectCallback}
                        >
                            {rejectLoading ? <Loader/> : '😩 Сори не получается'}
                        </button>
                    </>
                ) : guestLoading ? (
                    <Loader/>
                ) : (
                    '😩пользователь не найден😩'
                )}
            </div>
        </div>
    );
}

export default App;
