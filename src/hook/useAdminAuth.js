import { useState, useEffect } from 'react';
import useGuestList from "./useGuestList";

const useAdminAuth = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { guestList, loading: guestListLoading, error: guestListError } = useGuestList();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const username = queryParams.get('username');
    const password = queryParams.get('password');
    if (username && password) {
      setIsAdmin(true);
    }
  }, []);
  
  return { isAdmin, guestList, guestListLoading, guestListError };
};

export default useAdminAuth;