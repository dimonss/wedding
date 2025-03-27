import {useEffect} from "react";

const useConfetti = (isAdmin) => {
    useEffect(() => {
        const createConfetti = () => {
            setTimeout(() => {
                if (!isAdmin) {
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
                }

            }, 1000)
        };
        createConfetti()
    }, [isAdmin])

}
export default useConfetti