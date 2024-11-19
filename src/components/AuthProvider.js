import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../js/firebase-config";
import { setUser, clearUser } from "../features/userSlice";

/*
 * Provides an authentication context to children components.
 *
 * Listens to authentication state changes using the onAuthStateChanged() function
 * and dispatches either setUser or clearUser actions to the Redux store accordingly.
 */
const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                dispatch(
                    setUser({
                        uid: currentUser.uid,
                        email: currentUser.email,
                    })
                );
            } else {
                dispatch(clearUser());
            }
        });
        return () => unsubscribe();
    }, [dispatch]);

    return <>{children}</>;
};

export default AuthProvider;
