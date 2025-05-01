import {useState, useEffect} from 'react';
import {API_BASE_URL, STORAGE_KEY} from '../constant/constant';

const useGuestList = () => {
    const [guestList, setGuestList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getCredentials = () => {
        const queryParams = new URLSearchParams(window.location.search);
        const username = queryParams.get('username');
        const password = queryParams.get('password');

        if (username && password) {
            // Save credentials to localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify({username, password}));
            return {username, password};
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

    const fetchGuestList = async () => {
        const credentials = getCredentials();
        if (credentials) {
            setLoading(true);
            const headers = new Headers();
            headers.set("Authorization", "Basic " + btoa(`${credentials.username}:${credentials.password}`));
            try {
                const response = await fetch(`${API_BASE_URL}/guests`, {headers});
                if (!response.ok) {
                    throw new Error('Failed to fetch guest list');
                }
                const data = await response.json();
                setGuestList(data?.data || []);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching guest list:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchGuestList();
    }, []);

    return {guestList, loading, error, refreshGuestList: fetchGuestList};
};

export default useGuestList;