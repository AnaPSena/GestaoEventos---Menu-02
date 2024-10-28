import { useState, useEffect } from 'react';

export const useUserInfo = () => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Replace 'token' with your actual key

    const fetchUserInfo = async () => {
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT
          setUser(payload); // Assuming the payload contains user info
        } catch (error) {
          console.error('Failed to decode token:', error);
          setUser(null); // Set user to null if decoding fails
        }
      }
      setLoading(false);
    };

    fetchUserInfo();
  }, []);

  return { user, loading };
};

