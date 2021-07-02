const express = require("express");
const cors = require("cors");

const server = express();

server.use(cors());
server.use(express.json({}));

module.exports = server;

// GET /thread

// GET /thread/:id

// POST /thread

// DELETE /thread/:id

// POST /post

// DELETE /post/:thread_id/:post_id
