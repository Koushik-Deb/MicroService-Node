const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const eventsArr = [];

app.post("/events", async (req, res) => {
  console.log("Event Bus |-- Received Event ", req.body.type, "|--", req.body);
  const events = req.body;

  eventsArr.push(events);

  axios.post("http://posts-clusterip-srv:4000/events", events).catch((err) => {
    console.log(err.message);
    console.log("post 4000");
  });
  // axios.post("http://localhost:4001/events", events).catch((err) => {
  //   console.log(err.message);
  //   console.log("comment 4001");
  // });
  // axios.post("http://localhost:4002/events", events).catch((err) => {
  //   console.log(err.message);
  //   console.log("query 4002");
  // });
  // axios.post("http://localhost:4003/events", events).catch((err) => {
  //   console.log(err.message);
  //   console.log("moderation 4003");
  // });

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(eventsArr);
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
