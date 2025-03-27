import {useState, useEffect} from 'react';
import {API_BASE_URL} from '../constant/constant';

const useGuestList = () => {
    const [guestList, setGuestList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const queryParams = new URLSearchParams(window.location.search);
    const username = queryParams.get('username');
    const password = queryParams.get('password');
    const fetchGuestList = async () => {
        if (username && password) {
            setLoading(true);
            const headers = new Headers();
            headers.set("Authorization", "Basic " + btoa(`${username}:${password}`));
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

    return {guestList, loading, error, fetchGuestList};
};

export default useGuestList;