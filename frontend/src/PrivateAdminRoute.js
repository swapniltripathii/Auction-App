import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './contexts/authContext/authcontext';
import { firestore } from './firebase/firebase';
import { doc, getDoc } from 'firebase/firestore'; // Correct import for Firestore

const PrivateAdminRoute = () => {
  const { currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(null); // Changed to null for loading state
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (currentUser) {
        try {
          const userRef = doc(firestore, 'users', currentUser.uid); // Corrected Firestore syntax
          const docSnap = await getDoc(userRef);
          if (docSnap.exists() && docSnap.data().role === 'admin') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setIsAdmin(false); // Optionally handle errors here
        } finally {
          setLoading(false); // Stop loading regardless of success or failure
        }
      } else {
        setLoading(false); // No user means stop loading
      }
    };

    checkAdminStatus();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner/loader component
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateAdminRoute;
