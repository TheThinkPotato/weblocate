// API Documentation http://worldtimeapi.org/pages/examples

const axios = require("axios");

const APIheader = {};

const APIparams = {};

function createLocalTimeOptions(timezone) {
  const options = {
    hostname: "worldtimeapi.org",
    port: 443,
    path: `/api/timezone/${timezone}`,
    method: "GET",
  };
  return options;
}

async function getLocalTime(timezone) {
  const options = createLocalTimeOptions(timezone);
  const url = `https://${options.hostname}${options.path}`;

  try {
    const response = await axios.get(url, {
      headers: APIheader,
      params: APIparams,
    });
    return { datetime: response.data.datetime };
  } catch (error) {
    return {
      error: true,
      status: 500,
      message: "Internal local time API server error",
    };
  }
}

module.exports = getLocalTime;
