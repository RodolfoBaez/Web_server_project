// @ts-nocheck
/*  B"H
 */
const model = require("../model/posts");
const express = require("express");
const app = express.Router();  // This is an express.Router(), not the full app instance

/* Four ways to send data to the server:
 * 1. Query String
 * 2. URL Parameters
 * 3. Headers
 * 4. Body
 */

// Get all posts
app.get("/", (req, res, next) => {
    model
        .getAll()
        .then((x) => res.send(x))
        .catch(next);
});

app.get("/search", (req, res, next) => {
    const query = req.query.q;

    console.log("Search Query:", query); 

    if (!query) {
        return res.status(400).send({
            isSuccess: false,
            message: "Search query is required.",
        });
    }

    model
        .search(query)
        .then((x) => res.send(x))
        .catch(next);
});

// Get a post by ID
app.get("/:id", (req, res, next) => {
    const id = req.params.id;
    model
        .get(+id) // Convert the ID to a number
        .then((x) => res.send(x))
        .catch(next);
});

// Add a new post
app.post("/", (req, res, next) => {
    model
        .add(req.body)
        .then((x) => res.send(x))
        .catch(next);
});

// Update a post by ID
app.patch("/:id", (req, res, next) => {
    const id = req.params.id;
    model
        .update(+id, req.body)
        .then((x) => res.send(x))
        .catch(next);
});

// Remove a post by ID
app.delete("/:id", (req, res, next) => {
    const id = req.params.id;
    model
        .remove(+id) // Convert the ID to a number
        .then((x) => res.send(x))
        .catch(next);
});

// Seed the database with posts
app.post("/seed", (req, res, next) => {
    model
        .seed()
        .then((x) => res.send(x))
        .catch(next);
});

module.exports = app;  // Exporting the router, not the app
