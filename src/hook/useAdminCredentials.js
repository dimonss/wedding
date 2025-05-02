import { useState, useEffect } from 'react';
import { STORAGE_KEY } from '../constant/constant';

const useAdminCredentials = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [credentials, setCredentials] = useState(null);

    const getCredentials = () => {
        const queryParams = new URLSearchParams(window.location.search);
        const username = queryParams.get('username');
        const password = queryParams.get('password');
        
        if (username && password) {
            // Save credentials to localStorage
            const newCredentials = { username, password };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newCredentials));
            return newCredentials;
        }
        
        // Try to get credentials from localStorage
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                console.error('Failed to parse stored credentials:', e);
                return null;
            }
        }
        
        return null;
    };

    useEffect(() => {
        const checkAdminStatus = () => {
            const creds = getCredentials();
            if (creds?.username && creds?.password) {
                setIsAdmin(true);
                setCredentials(creds);
                // Clear URL parameters if they were used
                if (window.location.search) {
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
            }
        };

        checkAdminStatus();
    }, []);

    return { isAdmin, credentials };
};

export default useAdminCredentials; 