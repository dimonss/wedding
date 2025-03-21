import {useCallback, useEffect, useState} from 'react';
import {API_BASE_URL} from '../constant/constant'

const useGuestData = (guestUUID) => {
    const [guestData, setGuestData] = useState(null);
    const [guestLoading, setGuestLoading] = useState(false);
    const [guestError, setGuestError] = useState(null);
    const fetchGuestData = useCallback(async () => {
        if (guestUUID) {
            setGuestLoading(true);
            try {
                const response = await fetch(`${API_BASE_URL}/guest/${guestUUID}`);
                if (!response.ok) {
                    console.error("req error")
                }
                const data = await response.json();
                setGuestData(data?.data);
            } catch (error) {
                setGuestError(error);
            } finally {
                setGuestLoading(false);
            }
        }
    }, [guestUUID])
    useEffect(() => {
        fetchGuestData();
    }, [fetchGuestData]);
    return {guestData, guestLoading, guestError, fetchGuestData}
}
export default useGuestData