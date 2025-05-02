import {useState, useEffect, useCallback} from 'react';
import {API_BASE_URL} from '../constant/constant';

const useGuestList = (credentials) => {
    const [guestList, setGuestList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchGuestList = useCallback(async () => {
        if (credentials?.username && credentials?.password) {
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
    }, [credentials]);

    useEffect(() => {
        fetchGuestList();
    }, []);

    return {guestList, loading, error, refetchGuestList: fetchGuestList};
};

export default useGuestList;