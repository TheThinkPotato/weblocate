// API Documentation https://rapidapi.com/Amiichu/api/exerra-phishing-check

const axios = require("axios");
require("dotenv").config();

const APIheader = {
  "X-RapidAPI-Key": process.env.API_EXERRA_KEY,
  "X-RapidAPI-Host": "exerra-phishing-check.p.rapidapi.com",
};

const APIparams = {};

function createExerraOptions(domain) {
  const options = {
    hostname: "exerra-phishing-check.p.rapidapi.com",
    port: 443,
    path: `/`,
    method: "GET",
  };
  APIparams.url = `https://${domain}`;
  return options;
}

async function getLocalTime(domain) {
  const options = createExerraOptions(domain);
  const url = `https://${options.hostname}${options.path}`;

  try {
    const response = await axios.get(url, {
      headers: APIheader,
      params: APIparams,
    });
    return { isScam: response.data.isScam };
  } catch (error) {
    return {
      error: true,
      status: 500,
      message: "Internal exerra API server error",
    };
  }
}

module.exports = getLocalTime;
