// Counter routes

const express = require("express");
const logger = require("morgan");
const counters = require("../apis/dynamodb");

const router = express.Router();
router.use(logger("tiny"));

// Read PageView Route
router.get("/read", async (req, res, next) => {
  const data = await counters.readCounter();
  if (data.statusCode) {
    res.status(data.statusCode).json({ pageviews: data.message });
  } else {
    res.status(200).json({ pageviews: data });
  }
});

// Update PageView Route
router.get("/update/", async (req, res, next) => {
  const counter = await counters.incrementCounter();
  res.status(200).json({ pageviews: counter });
});

module.exports = router;
