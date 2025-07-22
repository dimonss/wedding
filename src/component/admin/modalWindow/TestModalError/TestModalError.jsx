import React, { useState } from 'react';
import ModalPortal from '../ModalPortal/ModalPortal';
import './TestModalError.css';

const TestModalError = ({ isOpen, onClose }) => {
    const [shouldThrow, setShouldThrow] = useState(false);

    // Функции для тестирования различных ошибок в модальном окне
    const throwRenderError = () => {
        setShouldThrow(true);
    };

    const throwEventError = () => {
        throw new Error('Ошибка в обработчике события модального окна! 🎯');
    };

    const throwAsyncError = async () => {
        // Симулируем асинхронную ошибку
        await new Promise(resolve => setTimeout(resolve, 100));
        throw new Error('Асинхронная ошибка в модальном окне! ⏰');
    };

    const throwStateError = () => {
        // Симулируем ошибку при обновлении состояния
        const invalidState = null;
        invalidState.someProperty = 'value'; // TypeError
    };

    // Если должна быть ошибка в рендере
    if (shouldThrow) {
        throw new Error('Ошибка в рендере модального окна! 🎭');
    }

    return (
        <ModalPortal isOpen={isOpen}>
            <div className="test-modal-overlay">
                <div className="test-modal-content">
                    <h3>🧪 Тест ErrorBoundary в модальном окне</h3>
                    <p>Нажмите на кнопки ниже, чтобы протестировать ошибки в модальном окне:</p>
                    
                    <div className="test-modal-buttons">
                        <button 
                            className="test-modal-button render"
                            onClick={throwRenderError}
                        >
                            🎭 Ошибка в рендере
                        </button>
                        
                        <button 
                            className="test-modal-button event"
                            onClick={throwEventError}
                        >
                            🎯 Ошибка в событии
                        </button>
                        
                        <button 
                            className="test-modal-button async"
                            onClick={throwAsyncError}
                        >
                            ⏰ Асинхронная ошибка
                        </button>
                        
                        <button 
                            className="test-modal-button state"
                            onClick={throwStateError}
                        >
                            🔄 Ошибка состояния
                        </button>
                    </div>
                    
                    <div className="test-modal-actions">
                        <button 
                            className="test-modal-button close"
                            onClick={onClose}
                        >
                            ✖️ Закрыть
                        </button>
                    </div>
                </div>
            </div>
        </ModalPortal>
    );
};

export default TestModalError; 