import React, { createContext, useContext, useState, useEffect } from "react";
import { observeAuthState } from "../Config/AuthService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
console.log("useauth", useAuth);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = observeAuthState((user) => {
        console.log("user", user);
        if (user) {
            setIsLoggedIn(true);
            setCurrentUser(user);
        } else {
            setIsLoggedIn(false);
            setCurrentUser(null);
        }
        
        setLoading(false);
      
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    setIsLoggedIn,
    isLoggedIn
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};