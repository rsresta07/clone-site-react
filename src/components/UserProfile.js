// src/components/UserProfile.js
import React from "react";
import { useUser } from "../contexts/UserContext";

function UserProfile() {
    const { user, logout } = useUser();

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
                        onClick={logout}
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
