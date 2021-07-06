const express = require("express");
const cors = require("cors");
const { Thread } = require("./model");
const { json } = require("express");

const server = express();

server.use(cors());
server.use(express.json({}));

// this is where we will do our own middleware
server.use((req, res, next) => {
  console.log(
    "Time: ",
    Date.now(),
    " - Method: ",
    req.method,
    " - Path: ",
    req.originalUrl,
    " - Body: ",
    req.body
  );
  next();
});

module.exports = server;

// GET /thread
server.get("/thread", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  console.log("getting all threads");
  Thread.find({}, (err, threads) => {
    // check if error is null
    if (err != null) {
      res.status(500).json({
        error: err,
        message: "could not list threads",
      });
      return;
    }
    // success
    res.status(200).json(threads);
  });
});

// GET /thread/:id
server.get("/thread/:id", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  console.log(`getting thread with id ${req.params.id}`);
  Thread.findById(req.params.id, (err, thread) => {
    if (err != null) {
      // return error
    } else if (thread === null) {
      // return 404
    }
    // success
  });
});

// POST /thread
server.post("/thread", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  console.log(`creating thread with body`, req.body);
  Thread.create(
    {
      // this is the thread we are creating
    },
    (err, thread) => {
      if (err != null) {
        // return error
      }
      // success
    }
  );
});

// DELETE /thread/:id
server.delete("/thread/:id", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  console.log(`deleting thread with id ${req.params.id}`);
  Thread.findByIdAndDelete(req.params.id, (err, thread) => {
    if (err != null) {
      // return error
    } else if (thread === null) {
      // return 404
    }
    // success
  });
});

// POST /post
server.post("/post", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  console.log(`creating post with body`, req.body);

  let newPost = {
    author: req.body.author || "",
    body: req.body.body || "",
    thread_id: req.body.thread_id || "",
  };

  Thread.findByIdAndUpdate(
    req.body.thread_id,
    {
      $push: { posts: newPost },
    },
    {
      new: true,
    },
    (err, thread) => {
      if (err != null) {
        // return error
      } else if (thread === null) {
        // return 404
      }
      // success
    }
  );
});

// DELETE /post/:thread_id/:post_id
server.delete("/post/:thread_id/:post_id", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  console.log(
    `deleting post with id ${req.params.post_id} on thread with id ${req.params.thread_id}`
  );
  Thread.findByIdAndUpdate(
    req.params.thread_id,
    {
      $pull: {
        posts: {
          _id: req.params.post_id,
        },
      },
    },
    (err, thread) => {
      if (err != null) {
        // return error
      } else if (thread === null) {
        // return 404
      }
      // find the post that was deleted
      // if you can't find it return 404
      // success
    }
  );
});
