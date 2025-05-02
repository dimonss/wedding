import React, {useEffect, useState} from "react";
import "./App.css";
import useGuestData from "./hook/useGuestData";
import useAcceptGuest from "./hook/useAcceptGuest";
import useRejectGuest from "./hook/useRejectGuest";
import useAdminCredentials from "./hook/useAdminCredentials";
import Loader from "./component/loader/Loader";
import GuestTable from "./component/admin/GuestTable";

function App() {
    const [firstRender, setFirstRender] = useState(true);
    const [respStatus, setRespStatus] = useState(null);
    const { isAdmin, credentials } = useAdminCredentials();
    let guestUUID = window.location.pathname.split('/').pop();
    guestUUID = guestUUID?.length === 36 ? guestUUID : null;

    const {guestData, guestLoading, guestError, fetchGuestData} = useGuestData(guestUUID);
    const {acceptCallback, acceptLoading, acceptError} = useAcceptGuest(guestUUID);
    const {rejectCallback, rejectLoading, rejectError} = useRejectGuest(guestUUID);
    useEffect(() => {
        setRespStatus(guestData?.respStatus)
    }, [guestData]);
    useEffect(() => {
        if (!acceptLoading && !rejectLoading) {
            if (!firstRender) fetchGuestData();
            else setFirstRender(false);
        }
    }, [acceptLoading, rejectLoading, fetchGuestData, firstRender]);
    // Render admin view if authenticated
    if (isAdmin && !guestUUID) {
        return (
            <div className="app-container admin-mode">
                <div className="admin-panel">
                    <div className="admin-header">
                        <h1 className="admin-title">Wedding Admin Panel</h1>
                    </div>
                    <GuestTable credentials={credentials}/>
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
                            <a href="#date"><h5>{'дата \nи время'}</h5></a>
                            <h1 className="title">СВАДЬБА<br/>И РЕГИСТРАЦИЯ</h1>
                            <a href="#map"><h5>{'где и как \nпроехать'}</h5></a>
                        </div>
                        <div className="header__mobile">
                            <h1 className="title">СВАДЬБА И РЕГИСТРАЦИЯ</h1>
                        </div>
                        <div className="container__image">
                            <div className="names">
                                <h2>Дмитрия &</h2>
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
                            {respStatus === null &&
                                <p>Мы, Дмитрий и Екатерина,<br/>
                                    с радостью приглашаем Вас<br/>
                                    на наше свадебное<br/>
                                    торжество!</p>
                            }
                            {respStatus === 1 &&
                                <p>Ждем с нетерпением 🤗</p>
                            }
                            {respStatus === 0 &&
                                <p>Жаль что не получится!<br/>
                                    Но если что то:</p>
                            }
                        </div>
                        {respStatus === null &&
                            <p className="special-day">Будем рады видеть Вас в этот особенный день!</p>}
                        <div className="rsvp-buttons">
                            <div className="rsvp-buttons__container">
                                {respStatus === null ? <>
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
                                </> : <button
                                    className="rsvp-button accept"
                                    onClick={() => setRespStatus(null)}
                                >
                                    {`🧐 Я передумал${guestData?.gender === 'female' ? 'a' : ''}`}
                                </button>}
                            </div>
                        </div>
                        <div className="venue-details" id="date">
                            <h3>📅 Дата и время:</h3>
                            <p>14-го июня 2025 года</p>
                            <h3>📍 Место, как проехать:</h3>
                            <p>«Кленовый лист» Гольф-клуб</p>
                            <p>ул. Фрунзе, 1 с. Кара-Джыгач,</p>
                            <p>Аламудунский район, Чуйская область</p>
                        </div>
                        <div className="map" id="map">
                            <iframe
                                title="map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3159.071531346306!2d74.70194022969577!3d42.80614583558391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb341e2128787%3A0x3ad083a24f096c54!2sBishkek%20Golf%20Club!5e0!3m2!1sen!2skg!4v1745081385779!5m2!1sen!2skg"
                                width="420" height="300" style={{border: 0, borderRadius: '16px', maxWidth: "100%"}}
                                allowFullScreen="" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                        {respStatus === null && <div className="footer-text">
                            Ждем с нетерпением 🤗
                        </div>}
                        {respStatus !== null && <a
                            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Свадьба%20Дмитрия%20и%20Екатерины&dates=20250614T103000Z/20250614T160000Z&details=Сбор%20гостей%20в%2016:30.%20Место%20проведения:%20«Кленовый%20лист»%20Гольф-клуб&location=ул.%20Фрунзе,%201%20с.%20Кара-Джыгач,%20Аламудунский%20район,%20Чуйская%20область"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="calendar-button"
                        >
                            <span>📅 Добавить в календарь</span>
                        </a>}
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
