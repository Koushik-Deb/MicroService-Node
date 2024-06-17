const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { POST_CREATED, COMMENT_CREATED } = require("./constants");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  res.status(200).send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  if (type === POST_CREATED) {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === COMMENT_CREATED) {
    const { id, content, postId } = data;
    const post = posts[postId];
    post.comments.push({ id, content });
  }

  res.status(200).send({ message: "Event received" });
});

app.listen(4002, () => {
  console.log("Listening on 4002");
});
