import {useCallback, useState} from 'react';
import {API_BASE_URL} from '../constant/constant'

const useRejectData = (guestUUID) => {
    const [rejectLoading, setRejectLoading] = useState(false);
    const [rejectError, setRejectError] = useState(null);

    const rejectCallback = useCallback(
        async () => {
            try {
                setRejectLoading(true);
                const response = await fetch(`${API_BASE_URL}/guest_reject/${guestUUID}`, {
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
    return {rejectCallback, rejectLoading, rejectError}
}
export default useRejectData