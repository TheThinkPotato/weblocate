// API Documentation https://www.abstractapi.com/api/time-date-timezone-api#docs

const axios = require("axios");
require("dotenv").config();

const APIheader = {};

const APIparams = {api_key: process.env.API_TIMEZONE_KEY, location:""};

function createLocalTimeOptions(country,city) {
  const options = {
    hostname: "timezone.abstractapi.com",
    port: 443,
    path: `/v1/current_time`,
    method: "GET",
  };  
  // timezone = timezone.replace(/\//g, ",");
  APIparams.location = city + "," + country;    
  return options;
}

async function getLocalTime(country,city) {    
  const options = createLocalTimeOptions(country,city);
  const url = `https://${options.hostname}${options.path}`;

  try {
    const response = await axios.get(url, {
      headers: APIheader,
      params: APIparams,
      timeout: 20000,
    });
    const returnData = response.data.datetime.replace(" ", "T");    
    return { datetime: returnData };
  } catch (error) {
    return {
      error: true,
      status: 500,
      message: "Internal local time API server error",
    };
  }
}

module.exports = getLocalTime;
