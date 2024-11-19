import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../features/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../js/firebase-config";
import { useNavigate } from "react-router-dom";

function UserProfile() {
    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await signOut(auth);
            dispatch(clearUser());
            navigate("/login-auth");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (!user) {
        return (
            <div className="text-center mt-20">
                <p className="text-white text-2xl">Loading...</p>
            </div>
        );
    }

    return (
        <div className="max-w-md mx-auto p-6 mt-20 rounded-lg shadow-lg">
            <h1 className="text-6xl font-bold text-white mb-6">User Profile</h1>
            <p className="text-3xl text-white mb-4">
                <span className="font-semibold">Email:</span> {user.email}
            </p>
            <button
                onClick={logout}
                className="w-full px-4 py-2 mt-4 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
                Logout
            </button>
        </div>
    );
}

export default UserProfile;
