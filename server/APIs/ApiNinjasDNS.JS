// API Documentation: https://api-ninjas.com/api/dnslookup

const axios = require("axios");
require("dotenv").config();

const APIheader = {
  "x-api-key": process.env.API_NINJAS_KEY,
};
const APIparams = {
  domain: "",
};

function createApiNinjasOptions(domain) {
  const options = {
    hostname: "api.api-ninjas.com",
    port: 443,
    path: "/v1/dnslookup",
    method: "GET",
  };
  APIparams.domain = domain;
  return options;
}

async function ApiNinjasDNS(domain) {
  const options = createApiNinjasOptions(domain);
  const url = `https://${options.hostname}${options.path}`;

  try {
    const response = await axios.get(url, {
      headers: APIheader,
      params: APIparams,
      timeout: 20000,
    });
    console.log("res:", response);
    if (response.status !== 200) {
      console.log("error:", response.status);
      return {
        error: true,
        status: response.status,
        message: response.message,
      };
    }

    if (response.data.length > 0) {
      return response.data[0].value;
    } else {
      return { error: true, status: 400, message: "No Records Found" };
    }
  } catch (error) {
    return {
      error: true,
      status: 500,
      message: "Internal api ninjas API server error",
    };
  }
}

module.exports = ApiNinjasDNS;
