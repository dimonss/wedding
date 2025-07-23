import React, {useState} from 'react';
import './loginForm.css';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Пожалуйста, введите имя пользователя и пароль');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // Set URL parameters
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.set('username', username);
            searchParams.set('password', password);
            window.history.replaceState({}, '', `${window.location.pathname}?${searchParams.toString()}`);

            // Reload page to trigger auth check
            window.location.reload();
        } catch (err) {
            setError('Произошла ошибка при входе в систему');
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-background">
                <div className="login-form">
                    <div className="login-header">
                        <div className="login-icon">👰🤵</div>
                        <h1>Wedding Admin Panel</h1>
                        <p>Войдите в систему для управления приглашениями</p>
                    </div>
                    
                    {error && (
                        <div className="login-error">
                            <span className="error-icon">⚠️</span>
                            {error}
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="login-form-content">
                        <div className="form-group">
                            <label htmlFor="username">Имя пользователя</label>
                            <div className="input-wrapper">
                                <span className="input-icon">👤</span>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Введите имя пользователя"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="password">Пароль</label>
                            <div className="input-wrapper">
                                <span className="input-icon">🔒</span>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Введите пароль"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                        
                        <button 
                            type="submit" 
                            className={`login-button ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading-spinner"></span>
                                    Вход в систему...
                                </>
                            ) : (
                                '🚪 Войти в систему'
                            )}
                        </button>
                    </form>
                    
                    <div className="login-footer">
                        <p>Система управления свадебными приглашениями</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm; 