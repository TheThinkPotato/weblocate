//Search routes

const express = require("express");
const logger = require("morgan");
const router = express.Router();
router.use(logger("tiny"));

const ipCheck = require("../functions/ip");
const apiCalls = require("../functions/apicalls");
const domainCheck = require("../functions/domaincheck");

// Ip Search Route
router.get("/ip/:ip", async (req, res, next) => {
  if (!ipCheck.ipCheck(req.params.ip)) {
    res.status(400).json({ error: true, message: "Invalid IP Address." });
    return;
  }
  const result = await apiCalls.search(req.params.ip, req.params.ip);
  if (result === undefined) {
    res.status(400).json({
      error: true,
      message: "No Ip Found or Invalid IP Address.",
      ip: req.params.ip,      
    });
    return;
  }
  if(result.error) {
    res.status(400).json({
      error: result.error,
      message: result.message,
      ip: req.params.ip,
    });
    return;
  } else res.status(200).json(result);
});

// Domain/Email Search Route
router.get("/domain/:domain", async (req, res, next) => {
  
  let domain = req.params.domain;

  if (ipCheck.checkIfIp(domain))
  {
    return res.status(400).json({error: true, message: "Please enter a valid domain name."});
  }


  //if domain contains @ then remove it
  domain = domainCheck.emailCheck(domain);

  const ip = await apiCalls.getIP(domain);
  if (ip.error) {
    res.status(ip.status).json({ error: ip.error, message: ip.message });
    return;
  }
  result = await apiCalls.search(ip, domain);
  if (result.error) {
    res.status(400).json({
      error: result.error,
      message: result.message,
      ip: req.params.ip,
    });
    return;
  } else res.status(200).json(result);
});

module.exports = router;
