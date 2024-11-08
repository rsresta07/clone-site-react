import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../js/firebase-config";
import { signOut, onAuthStateChanged } from "firebase/auth";

function UserProfile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Listen for user authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                // Redirect to login if no user is found
                navigate("/login-auth");
            }
        });

        return () => unsubscribe(); // Cleanup the listener
    }, [navigate]);

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/login-auth"); // Redirect to login page after logout
    };

    return (
        <div className="max-w-md mx-auto p-6 mt-20 rounded-lg shadow-lg">
            <h1 className="text-6xl font-bold text-white mb-6">User Profile</h1>
            {user ? (
                <>
                    <p className="text-3xl text-white mb-4">
                        <span className="font-semibold">Email:</span>{" "}
                        {user.email}
                    </p>
                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <p className="text-gray-500">Loading...</p>
            )}
        </div>
    );
}

export default UserProfile;
