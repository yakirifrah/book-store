import { useState, useEffect } from 'react';
export default function useAuthListener() {
  const [user, setUser] = useState('');
  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem('login')));
    if (!user?.login || !user?.token) {
      return;
    }
  }, []);
  return { user };
}
