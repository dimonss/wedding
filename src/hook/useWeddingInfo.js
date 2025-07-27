import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constant/constant';

const useWeddingInfo = (credentials) => {
    const [weddingInfo, setWeddingInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWeddingInfo = async () => {
        if (!credentials) return;

        setLoading(true);
        setError(null);

        try {
            const authHeader = 'Basic ' + btoa(`${credentials.username}:${credentials.password}`);
            const response = await fetch(`${API_BASE_URL}/user`, {
                method: 'GET',
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (data.status === 'OK') {
                setWeddingInfo(data.data);
            } else {
                setError(data.message || 'Failed to fetch wedding information');
            }
        } catch (err) {
            setError('Network error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateCoupleInfo = async (coupleData) => {
        if (!credentials) return;

        setLoading(true);
        setError(null);

        try {
            const authHeader = 'Basic ' + btoa(`${credentials.username}:${credentials.password}`);
            const response = await fetch(`${API_BASE_URL}/user/couple`, {
                method: 'PUT',
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(coupleData),
            });

            const data = await response.json();

            if (data.status === 'OK') {
                setWeddingInfo(prev => ({ ...prev, ...data.data }));
                return { success: true, data: data.data };
            } else {
                setError(data.message || 'Failed to update couple information');
                return { success: false, error: data.message };
            }
        } catch (err) {
            const errorMsg = 'Network error: ' + err.message;
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    const updateWeddingInfo = async (weddingData) => {
        if (!credentials) return;

        setLoading(true);
        setError(null);

        try {
            const authHeader = 'Basic ' + btoa(`${credentials.username}:${credentials.password}`);
            const response = await fetch(`${API_BASE_URL}/user/wedding`, {
                method: 'PUT',
                headers: {
                    'Authorization': authHeader,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(weddingData),
            });

            const data = await response.json();

            if (data.status === 'OK') {
                setWeddingInfo(prev => ({ ...prev, ...data.data }));
                return { success: true, data: data.data };
            } else {
                setError(data.message || 'Failed to update wedding information');
                return { success: false, error: data.message };
            }
        } catch (err) {
            const errorMsg = 'Network error: ' + err.message;
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    // Новый метод для обновления всех данных сразу
    const updateAllWeddingInfo = async (formData) => {
        if (!credentials) return;

        setLoading(true);
        setError(null);

        try {
            // Сначала обновляем couple info
            const coupleResult = await updateCoupleInfo(formData.coupleData);
            if (!coupleResult.success) {
                return coupleResult;
            }

            // Затем обновляем wedding info
            const weddingResult = await updateWeddingInfo(formData.weddingData);
            if (!weddingResult.success) {
                return weddingResult;
            }

            return { success: true, data: { ...coupleResult.data, ...weddingResult.data } };
        } catch (err) {
            const errorMsg = 'Network error: ' + err.message;
            setError(errorMsg);
            return { success: false, error: errorMsg };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (credentials) {
            fetchWeddingInfo();
        }
    }, [credentials]);

    return {
        weddingInfo,
        loading,
        error,
        fetchWeddingInfo,
        updateCoupleInfo,
        updateWeddingInfo,
        updateAllWeddingInfo,
    };
};

export default useWeddingInfo; 