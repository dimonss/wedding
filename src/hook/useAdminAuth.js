import { useState, useEffect } from 'react';
import useGuestList from "./useGuestList";
import {STORAGE_KEY} from '../constant/constant';

const useAdminAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { guestList, loading: guestListLoading, error: guestListError, refreshGuestList } = useGuestList();

  useEffect(() => {
    const checkAdminStatus = () => {
      const queryParams = new URLSearchParams(window.location.search);
      const username = queryParams.get('username');
      const password = queryParams.get('password');
      
      if (username && password) {
        setIsAdmin(true);
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }
      
      // Check localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const credentials = JSON.parse(stored);
          if (credentials.username && credentials.password) {
            setIsAdmin(true);
          }
        } catch (e) {
          console.error('Failed to parse stored credentials:', e);
        }
      }
    };

    checkAdminStatus();
  }, []);
  
  return { isAdmin, guestList, guestListLoading, guestListError, refreshGuestList };
};

export default useAdminAuth;