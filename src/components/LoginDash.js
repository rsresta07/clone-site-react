import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../js/firebase-config";

function Login() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const login = async (event) => {
        event.preventDefault();
        setError("");

        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            console.log("User logged in successfully");
            navigate("/profile");
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                setError("No account found with this email. Please register.");
            } else if (error.code === "auth/wrong-password") {
                setError("Incorrect password. Please try again.");
            } else {
                setError("Login failed. Please try again.");
            }
            console.error("Error:", error.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-gray-950 rounded-lg shadow-lg m-6">
            <h2 className="text-6xl font-bold text-white mb-6">Login</h2>
            <form onSubmit={login} className="space-y-4">
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={loginEmail}
                        onChange={(event) => setLoginEmail(event.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(event) =>
                            setLoginPassword(event.target.value)
                        }
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Login
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
            <p className="mt-8 text-gray-400">
                Don't have an account?{" "}
                <a href="/register" className="text-blue-500 hover:underline">
                    Register
                </a>
            </p>
        </div>
    );
}

export default Login;
