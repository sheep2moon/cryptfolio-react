import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';

const FireContext = React.createContext();

export function useFire() {
  return useContext(FireContext);
}

const FireProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const register = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);
  const login = (email, password) => {
    try {
      auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  };
  const logout = () => auth.signOut();
  const resetPassword = (email) => auth.sendPasswordResetEmail(email);
  const updateEmail = (email) => user.updateEmail(email);
  const updatePassword = (password) => user.updatePassword(password);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsub;
  }, []);

  const value = {
    user,
    register,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <FireContext.Provider value={value}>
      {!loading && children}
    </FireContext.Provider>
  );
};

export default FireProvider;
