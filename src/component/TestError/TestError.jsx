import React, { useState } from 'react';
import './TestError.css';

const TestError = () => {
    const [shouldThrow, setShouldThrow] = useState(false);

    // Функция, которая генерирует ошибку
    const throwError = () => {
        throw new Error('Это тестовая ошибка для проверки ErrorBoundary! 🧪');
    };

    // Функция, которая генерирует ошибку в рендере
    const renderError = () => {
        if (shouldThrow) {
            throw new Error('Ошибка в рендере компонента! 🎭');
        }
        return null;
    };

    // Функция для тестирования сетевой ошибки
    const simulateNetworkError = () => {
        const error = new Error('Network Error: Failed to fetch');
        error.name = 'NetworkError';
        throw error;
    };

    // Функция для тестирования ошибки авторизации
    const simulateAuthError = () => {
        const error = new Error('401 Unauthorized');
        error.name = 'AuthError';
        throw error;
    };

    // Функция для тестирования ошибки в модальном окне
    const testModalError = () => {
        // Симулируем ошибку в модальном окне
        const modalError = new Error('Ошибка в модальном окне! 🪟');
        modalError.name = 'ModalError';
        throw modalError;
    };

    // Функция для тестирования ошибки в портале
    const testPortalError = () => {
        // Симулируем ошибку в портале
        const portalError = new Error('Ошибка в React Portal! 🚪');
        portalError.name = 'PortalError';
        throw portalError;
    };

    return (
        <div className="test-error-container">
            <h2>🧪 Тестирование ErrorBoundary</h2>
            <p>Нажмите на кнопки ниже, чтобы протестировать различные типы ошибок:</p>
            
            <div className="test-buttons">
                <button 
                    className="test-button error"
                    onClick={throwError}
                >
                    🚨 Вызвать обычную ошибку
                </button>
                
                <button 
                    className="test-button error"
                    onClick={() => setShouldThrow(true)}
                >
                    🎭 Вызвать ошибку в рендере
                </button>
                
                <button 
                    className="test-button network"
                    onClick={simulateNetworkError}
                >
                    🌐 Симулировать сетевую ошибку
                </button>
                
                <button 
                    className="test-button auth"
                    onClick={simulateAuthError}
                >
                    🔐 Симулировать ошибку авторизации
                </button>
                
                <button 
                    className="test-button undefined"
                    onClick={() => {
                        const obj = null;
                        obj.someMethod(); // TypeError
                    }}
                >
                    ❌ Вызвать TypeError
                </button>
                
                <button 
                    className="test-button modal"
                    onClick={testModalError}
                >
                    🪟 Тест ошибки в модальном окне
                </button>
                
                <button 
                    className="test-button portal"
                    onClick={testPortalError}
                >
                    🚪 Тест ошибки в портале
                </button>
            </div>
            
            {renderError()}
        </div>
    );
};

export default TestError; 