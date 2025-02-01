import React, { useEffect } from "react";
import "./App.css";

function App() {
    useEffect(() => {
        createConfetti();
    }, []);

    const createConfetti = () => {
        const confettiContainer = document.querySelector(".confetti-container");
        if (!confettiContainer) return;

        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement("div");
            confetti.className = "confetti";

            // Случайный цвет
            const colors = ["#FF4081", "#3F51B5", "#FFC107", "#4CAF50", "#FF5722", "#9C27B0"];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            // Случайное расположение
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.animationDelay = `${Math.random() * 3}s`;

            confettiContainer.appendChild(confetti);
        }
    };

    return (
        <div className="app-container">
            <div className="confetti-container"></div>
            <div className="invitation-container">
                <h1>💍 Приглашение на свадьбу 💍</h1>
                <p className="welcome-text">Дорогие друзья и близкие!</p>
                <p>
                    Мы, <span className="highlight">Дмитрий</span> и <span className="highlight">Екатерина</span>,
                    с радостью приглашаем вас на наше свадебное торжество!
                </p>
                <p className="date">📅 Дата: 20 июля 2025 года</p>
                <p className="location">📍 Место: Ресторан "Белый сад", г. Москва</p>
                <p className="ending-text">Будем рады видеть вас в этот особенный день!</p>
                <button className="rsvp-button accept">💌 Я буду!</button>
                <button className="rsvp-button reject">😩 Сори не получается</button>
            </div>
        </div>
    );
}

export default App;
