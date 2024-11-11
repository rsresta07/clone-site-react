// src/contexts/UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../js/firebase-config";
import { useNavigate } from "react-router-dom";

// Create the context
const UserContext = createContext();

// Custom hook for using the user context
export const useUser = () => useContext(UserContext);

// User provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
                navigate("/login-auth");
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const logout = async () => {
        await signOut(auth);
        setUser(null);
        navigate("/login-auth");
    };

    return (
        <UserContext.Provider value={{ user, logout }}>
            {children}
        </UserContext.Provider>
    );
};
