import React from 'react';
import { logErrorToService, getUserFriendlyMessage } from '../../utils/errorLogger';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false, 
            error: null,
            errorInfo: null,
            userMessage: ''
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        // Логируем ошибку
        logErrorToService(error, errorInfo);
        
        // Получаем пользовательское сообщение
        const userMessage = getUserFriendlyMessage(error);
        
        this.setState({
            error: error,
            errorInfo: errorInfo,
            userMessage: userMessage
        });
    }

    handleReload = () => {
        window.location.reload();
    };

    handleGoHome = () => {
        window.location.href = '/';
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="app-error-boundary">
                    <div className="app-error-content">
                        <div className="error-icon">⚠️</div>
                        <h1>Упс! Что-то пошло не так</h1>
                        <p>
                            {this.state.userMessage || 
                             'Произошла непредвиденная ошибка в приложении. Мы уже работаем над её устранением.'}
                        </p>
                        
                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <details className="error-details">
                                <summary>Детали ошибки (только для разработчиков)</summary>
                                <div className="error-stack">
                                    <h4>Ошибка:</h4>
                                    <pre>{this.state.error.toString()}</pre>
                                    {this.state.errorInfo && (
                                        <>
                                            <h4>Stack trace:</h4>
                                            <pre>{this.state.errorInfo.componentStack}</pre>
                                        </>
                                    )}
                                </div>
                            </details>
                        )}
                        
                        <div className="error-actions">
                            <button 
                                className="error-button primary"
                                onClick={this.handleReload}
                            >
                                🔄 Обновить страницу
                            </button>
                            <button 
                                className="error-button secondary"
                                onClick={this.handleGoHome}
                            >
                                🏠 На главную
                            </button>
                        </div>
                        
                        <div className="error-footer">
                            <p>
                                Если проблема повторяется, пожалуйста, 
                                <a href="mailto:support@example.com" className="error-link">
                                    свяжитесь с нами
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 