import React, { useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { auth } from "../js/firebase-config";

function Register() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize navigate

    const register = async (event) => {
        event.preventDefault(); // Prevents form refresh
        setError(""); // Clear previous errors

        // Password and Confirm Password match validation
        if (registerPassword !== confirmPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
            console.log("User registered:", userCredential.user);
            navigate("/login-auth"); // Redirect to login page after registration
        } catch (error) {
            // Handle specific Firebase auth errors
            if (error.code === "auth/email-already-in-use") {
                setError(
                    "This email is already registered. Please try logging in."
                );
            } else if (error.code === "auth/invalid-email") {
                setError(
                    "The email address is not valid. Please enter a valid email."
                );
            } else if (error.code === "auth/weak-password") {
                setError(
                    "Password is too weak. Please enter a stronger password."
                );
            } else {
                setError("Registration failed. Please try again.");
            }
            console.error("Error:", error.message);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe(); // Clean up the listener
    }, []);

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-gray-950 rounded-lg shadow-lg">
            <h2 className="text-6xl font-semibold text-white mb-6">Register</h2>
            {user ? (
                navigate("/login-auth")
            ) : (
                <form onSubmit={register} className="space-y-4">
                    <div>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            onChange={(event) =>
                                setRegisterEmail(event.target.value)
                            }
                            value={registerEmail}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>
                    <div>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={(event) =>
                                setRegisterPassword(event.target.value)
                            }
                            value={registerPassword}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>
                    <div>
                        <input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            value={confirmPassword}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Register
                    </button>
                    {error && (
                        <div className="mt-4 p-4 bg-red-500 text-white rounded-md text-center">
                            {error}
                        </div>
                    )}
                </form>
            )}
        </div>
    );
}

export default Register;
