//API Documentation https://ipinfo.io/developers

const axios = require("axios");
require("dotenv").config();

const APIheader = {
  Authorization: process.env.API_IPINFO_KEY,
};

const APIparams = {};

function createIPGeoOptions(ip) {
  const options = {
    hostname: "ipinfo.io",
    port: 443,
    path: "/" + ip,
    method: "GET",
  };
  return options;
}

async function ipInfo(ip) {
  const options = createIPGeoOptions(ip);
  const url = `https://${options.hostname}${options.path}`;

  try {
    const response = await axios.get(url, {
      headers: APIheader,
      params: APIparams,
      timeout: 20000,
    });
    return response.data;
  } catch (error) {
    return({error : true, status :500, message: "Internal ip info API server error"});
  }
}

module.exports = ipInfo;
