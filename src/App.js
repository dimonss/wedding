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
                        <div className="header">
                            <h5>{'дата \nи время'}</h5>
                            <h1 className="title">СВАДЬБА<br/>И РЕГИСТРАЦИЯ</h1>
                            <h5>{'где и как \nпроехать'}</h5>
                        </div>
                        <div className="container__image">
                            <div className="names">
                                <h2>Дмитрия <b>&</b></h2>
                                <h2>{"Екатерины"}</h2>
                            </div>
                            <div className="header-text">
                                <div className="date-time">{'14 - го июня\n2025 года'}</div>
                                <div className="guest-arrival">{'16:30—17:30\nсбор гостей'}</div>
                            </div>
                        </div>
                        <div className="guest-name">
                            {guestData?.fullName || '%USERNAME%'}
                        </div>
                        <div className="invitation-text">
                            <p>Мы, Дмитрий и Екатерина,<br/>
                                с радостью приглашаем вас<br/>
                                на наше свадебное<br/>
                                торжество!</p>
                        </div>
                        <p className="special-day">Будем рады видеть вас в этот особенный день!</p>
                        <div className="rsvp-buttons">
                            <button
                                className="rsvp-button accept"
                                onClick={acceptCallback}
                            >
                                {acceptLoading ? <Loader/> : '💌 Я приду!'}
                            </button>
                            <button
                                className="rsvp-button reject"
                                onClick={rejectCallback}
                            >
                                {rejectLoading ? <Loader/> : '😩 Не приду, сори'}
                            </button>
                        </div>
                        <div className="venue-details">
                            <h3>📅 Дата и время:</h3>
                            <p>14-го июня 2025 года</p>
                            <h3>📍 Место, как проехать:</h3>
                            <p>«Кленовый лист» Гольф-клуб<br/>
                                ул. Фрунзе, 1 с. Кара-Джыгач,<br/>
                                Аламудунский район, Чуйская область</p>
                        </div>
                        <div className="map">
                            <iframe
                                title="map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3159.071531346306!2d74.70194022969577!3d42.80614583558391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb341e2128787%3A0x3ad083a24f096c54!2sBishkek%20Golf%20Club!5e0!3m2!1sen!2skg!4v1745081385779!5m2!1sen!2skg"
                                width="100%" height="300" style={{border: 0}} allowFullScreen="" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                        <div className="footer-text">
                            Ждем с нетерпением 💝
                        </div>
                    </>
                ) : guestLoading ? (
                    <Loader/>
                ) : (
                    <div className="error-message">😩 пользователь не найден 😩</div>
                )}
            </div>
        </div>
    );
}

export default App;
