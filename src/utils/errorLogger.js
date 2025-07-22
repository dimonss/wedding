// Утилита для логирования ошибок
export const logErrorToService = (error, errorInfo) => {
    // Здесь можно добавить интеграцию с сервисами аналитики ошибок
    // например: Sentry, LogRocket, Bugsnag и т.д.
    
    const errorData = {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo?.componentStack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        // Можно добавить дополнительную информацию
        // userId: getCurrentUserId(),
        // sessionId: getSessionId(),
    };

    // Логирование в консоль для разработки
    if (process.env.NODE_ENV === 'development') {
        console.group('🚨 Application Error');
        console.error('Error:', error);
        console.error('Error Info:', errorInfo);
        console.error('Error Data:', errorData);
        console.groupEnd();
    }

    // Отправка в сервис аналитики (пример)
    // try {
    //     fetch('/api/errors', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(errorData),
    //     });
    // } catch (logError) {
    //     console.error('Failed to log error:', logError);
    // }

    // Или отправка в Sentry
    // if (window.Sentry) {
    //     window.Sentry.captureException(error, {
    //         contexts: {
    //             react: {
    //                 componentStack: errorInfo?.componentStack,
    //             },
    //         },
    //     });
    // }
};

// Утилита для создания пользовательских ошибок
export const createCustomError = (message, code = 'UNKNOWN_ERROR') => {
    const error = new Error(message);
    error.code = code;
    error.isCustomError = true;
    return error;
};

// Утилита для проверки типа ошибки
export const isNetworkError = (error) => {
    return error.message.includes('Network Error') || 
           error.message.includes('fetch') ||
           error.message.includes('Failed to fetch');
};

export const isAuthError = (error) => {
    return error.message.includes('401') || 
           error.message.includes('Unauthorized') ||
           error.message.includes('Authentication');
};

// Утилита для получения пользовательского сообщения об ошибке
export const getUserFriendlyMessage = (error) => {
    if (isNetworkError(error)) {
        return 'Проблемы с подключением к интернету. Проверьте соединение и попробуйте снова.';
    }
    
    if (isAuthError(error)) {
        return 'Ошибка авторизации. Пожалуйста, войдите в систему снова.';
    }
    
    if (error.code === 'GUEST_NOT_FOUND') {
        return 'Приглашение не найдено. Проверьте правильность ссылки.';
    }
    
    return 'Произошла непредвиденная ошибка. Попробуйте обновить страницу.';
}; 