/* ======================================================
    Lab 9 - AuthPage.jsx starter
====================================================== */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage({ setLoggedInUser }) {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        // TODO 19: 
        // Send POST /api/register with JSON data. 
        // Include headers: { "Content-Type": "application/json" }. 
        // Include credentials: "include". 
        // Show the returned message in setMessage(...). 
    }

    async function handleLogin(e) {
        e.preventDefault();

        // TODO 20: 
        // Send POST /api/login with JSON data. 
        // Include headers and credentials: "include". 
        // If response.ok is true: 
        // 1. setLoggedInUser(data.username) 
        // 2. navigate("/app") 
        // Otherwise show the returned message. 
    }

    return (
        <main className="authPage">
            <h1>Movie App Login</h1>
            <p>Register a new account or log in to view your watchlist.</p>

            <section className="card">
                <h2>Register</h2>
                <form onSubmit={handleRegister} className="stack">
                    <input
                        type="text"
                        placeholder="Username"
                        value={registerUsername}
                        onChange={(e) => setRegisterUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                    <button type="submit">Register</button>
                </form>
            </section>

            <section className="card">
                <h2>Login</h2>
                <form onSubmit={handleLogin} className="stack">
                    <input
                        type="text"
                        placeholder="Username"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </section>

            <p className="message">{message}</p>
        </main>
    );
}