/* ======================================================
    Lab 9 - App.jsx starter
====================================================== */

import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MoviePage from "./pages/MoviePage";

export default function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch("http://localhost:3001/api/me", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setLoggedInUser(data.username);
        } else {
          setLoggedInUser(null);
        }
      } catch (error) {
        setLoggedInUser(null);
      } finally {
        setAuthChecked(true);
      }
    }

    checkSession();
  }, []);

  if (!authChecked) {
    return <p>Checking session...</p>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          loggedInUser ? (
            <Navigate to="/app" replace />
          ) : (
            <AuthPage setLoggedInUser={setLoggedInUser} />
          )
        }
      />
      <Route
        path="/app"
        element={
          loggedInUser ? (
            <MoviePage
              loggedInUser={loggedInUser}
              setLoggedInUser={setLoggedInUser}
            />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}