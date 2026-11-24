/* ======================================================
    Lab 9 - server.js starter
====================================================== */

// ==========================================
// 1. Imports, middleware, and file paths
// ========================================== 

const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cors = require("cors");

const app = express();
const PORT = 3001;

// express.json() lets the server read JSON request bodies. 
// Without this middleware, req.body will usually be undefined. 
app.use(express.json());
// CORS allows the React app to talk to this server. 
// credentials: true is required because this lab uses sessions. 
// We allow both localhost and 127.0.0.1 because Vite may show either one. 
app.use(
    cors({
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
        credentials: true,
    })
);

// This lab uses a simple server-side session. 
// The browser keeps a session id, while the server stores session data. 
app.use(
    session({
        secret: "cmpt315_lab9_secret",
        resave: false,
        saveUninitialized: false,
    })
);

// These paths point to the JSON files used in this lab. 
const usersFile = path.join(__dirname, "users.json");
const watchlistsFile = path.join(__dirname, "watchlists.json");

// ==========================================
// 2. Helper Functions
// ========================================== 

// Read and parse users.json. 
async function readUsers() {
    // TODO 1: 
    // Read usersFile using fs.readFile(...) 
    // Convert the JSON text into a JavaScript value using JSON.parse(...) 
}

// Save the updated users array back to users.json. 
async function writeUsers(users) {
    // TODO 2: 
    // Convert users into nicely formatted JSON text using JSON.stringify(users, null, 2). 
    // Write the text to usersFile using fs.writeFile(...) 
}

// Read and parse watchlists.json. 
async function readWatchlists() {
    // TODO 3: 
    // Read watchlistsFile and return the parsed JSON object. 
}

// Save the updated watchlists object.
async function writeWatchlists(watchlists) {
    // TODO 4: 
    // Convert watchlists into nicely formatted JSON using JSON.stringify(watchlists, null, 2). 
    // Write the watchlists object back to watchlistsFile. 
}

// Return true only if the username matches the lab rules. 
function isValidUsername(username) {
    // TODO 5: 
    // Check that username exists. 
    // Check that it is 3 to 20 characters long. 
    // Check that it contains only letters and numbers. 
}

// Return true only if the password matches the lab rules. 
function isValidPassword(password) {
    // TODO 6: 
    // Check that password exists. 
    // Check that it is at least 6 characters long. 
    // Check that it contains at least one letter and one number. 
}

// This middleware protects routes that require login. 
function requireLogin(req, res, next) {
    if (!req.session.username) {
        return res.status(401).json({ message: "You must log in first." });
    }
    next();
}

// ==========================================
// 3. Basic route and register route
// ========================================== 

// Simple route for quick testing in the browser or Postman. 
app.get("/api/health", (req, res) => {
    res.json({ message: "API is running" });
});

app.post("/api/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // TODO 7: 
        // Validate missing fields. 
        // Validate username format with isValidUsername(...). 
        // Validate password format with isValidPassword(...). 

        const users = await readUsers();
        // TODO 8: 
        // Check whether the username already exists. 
        // If it exists, return status 400 with a clear JSON message. 

        // bcrypt.hash(...) turns the plain password into a secure hash. 
        const passwordHash = await bcrypt.hash(password, 10);

        // TODO 9: 
        // Push the new user object into the users array. 
        // Use the keys exactly like this: { username, passwordHash }. 
        // Save users using writeUsers(...). 

        const watchlists = await readWatchlists();

        // TODO 10: 
        // Create an empty watchlist array for the new user. 
        // Save watchlists using writeWatchlists(...). 

        res.status(201).json({ message: "Registration successful." });
    } catch (error) {
        res.status(500).json({ message: "Server error during registration." });
    }
});

// ==========================================
// 4. Login, logout, and current user
// ========================================== 

app.post("/api/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // TODO 11: 
        // Validate missing fields. 

        const users = await readUsers();

        // TODO 12: 
        // Create a variable named user using: 
        // const user = users.find((u) => u.username === username); 
        // If no user is found, return status 401. 

        // bcrypt.compare(...) checks the plain password against the stored hash. 
        const passwordMatches = await bcrypt.compare(password, user.passwordHash);

        // TODO 13: 
        // If the password does not match, return status 401. 
        // If it does match, save the username in req.session.username. 

        res.json({ message: "Login successful.", username });
    } catch (error) {
        res.status(500).json({ message: "Server error during login." });
    }
});

app.post("/api/logout", (req, res) => {
    req.session.destroy(() => {
        res.json({ message: "Logout successful." });
    });
});

app.get("/api/me", (req, res) => {
    if (!req.session.username) {
        return res.status(401).json({ message: "Not logged in." });
    }

    res.json({ username: req.session.username });
});

// ==========================================
// 5. Watchlist routes
// ========================================== 

app.get("/api/watchlist", requireLogin, async (req, res) => {
    try {
        const watchlists = await readWatchlists();
        const username = req.session.username;

        // TODO 14: 
        // Return the watchlist array for this user. 
        // If the user has no watchlist yet, return an empty array. 
    } catch (error) {
        res.status(500).json({ message: "Server error while reading watchlist." });
    }
});

app.post("/api/watchlist", requireLogin, async (req, res) => {
    try {
        const username = req.session.username;
        const movie = req.body;

        // TODO 15: 
        // Validate that movie.imdbID and movie.Title exist. 
        // Return status 400 if the movie object is incomplete. 

        const watchlists = await readWatchlists();

        if (!watchlists[username]) {
            watchlists[username] = [];
        }
        const userWatchlist = watchlists[username];

        // TODO 16: 
        // Prevent duplicate movies by checking imdbID. 
        // If the movie already exists, return status 400. 

        // TODO 17: 
        // Add the movie to userWatchlist. 
        // Because userWatchlist refers to watchlists[username], saving watchlists will keep the new movie. 
        // Save the updated watchlists object. 

        res.status(201).json({ message: "Movie added to watchlist." });
    } catch (error) {
        res.status(500).json({ message: "Server error while adding movie." });
    }
});

app.delete("/api/watchlist/:imdbID", requireLogin, async (req, res) => {
    try {
        const username = req.session.username;
        const imdbID = req.params.imdbID;

        const watchlists = await readWatchlists();
        const userWatchlist = watchlists[username] || [];

        // TODO 18: 
        // Create a new array that removes the movie whose imdbID matches req.params.imdbID. 
        // Assign that new array back to watchlists[username]. 
        // Save the updated watchlists object. 

        res.json({ message: "Movie removed from watchlist." });
    } catch (error) {
        res.status(500).json({ message: "Server error while removing movie." });
    }
});

// ==========================================
// 6. Start the server
// ========================================== 

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 