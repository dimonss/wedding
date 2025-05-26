import {useState, useEffect, useCallback} from 'react';
import {API_BASE_URL, STORAGE_KEY} from '../constant/constant';

const useGuestList = (credentials) => {
    const [guestList, setGuestList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getHeaders = useCallback(() => {
        const headers = new Headers();
        headers.set("Authorization", "Basic " + btoa(`${credentials.username}:${credentials.password}`));
        headers.set("Content-Type", "application/json");
        return headers;
    }, [credentials]);

    const fetchGuestList = useCallback(async () => {
        if (credentials?.username && credentials?.password) {
            setLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/guests`, {
                    headers: getHeaders()
                });
                if (!response.ok) {
                    if (response.status === 401) {
                        localStorage.removeItem(STORAGE_KEY);
                        window.location.reload();
                        return;
                    }
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
    }, [credentials, getHeaders]);

    const createGuest = async (guestData) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/guest`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(guestData)
            });
            if (!response.ok) {
                throw new Error('Failed to create guest');
            }
            await fetchGuestList();
            return true;
        } catch (error) {
            setError(error.message);
            console.error('Error creating guest:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateGuest = async (guestId, guestData) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/guest/${guestId}`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(guestData)
            });
            if (!response.ok) {
                throw new Error('Failed to update guest');
            }
            await fetchGuestList();
            return true;
        } catch (error) {
            setError(error.message);
            console.error('Error updating guest:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const deleteGuest = async (guestId) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/guest/${guestId}`, {
                method: 'DELETE',
                headers: getHeaders()
            });
            if (!response.ok) {
                throw new Error('Failed to delete guest');
            }
            await fetchGuestList();
            return true;
        } catch (error) {
            setError(error.message);
            console.error('Error deleting guest:', error);
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGuestList();
    }, [fetchGuestList]);

    return {
        guestList,
        loading,
        error,
        createGuest,
        updateGuest,
        deleteGuest,
        refetchGuestList: fetchGuestList
    };
};

export default useGuestList;