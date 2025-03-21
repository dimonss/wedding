import {useCallback, useState} from 'react';
import {API_BASE_URL} from '../constant/constant'

const useRejectData = (guestUUID) => {
    const [acceptLoading, setRejectLoading] = useState(false);
    const [acceptError, setRejectError] = useState(null);

    const acceptCallback = useCallback(
        async () => {
            try {
                setRejectLoading(true)
                const response = await fetch(`${API_BASE_URL}/guest_accept/${guestUUID}`, {
                    method: 'POST',
                });
                if (!response.ok) {
                    console.error("req error")
                }
            } catch (error) {
                setRejectError(error);
            } finally {
                setRejectLoading(false);
            }
        }, []);
    return {acceptCallback, acceptLoading, acceptError}
}
export default useRejectData