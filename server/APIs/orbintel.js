// API Documentation https://api.orb-intelligence.com/docs/

const axios = require("axios");
require("dotenv").config();

const APIheader = {};

const APIparams = {
  api_key: process.env.API_ORBINTEL_KEY,
  name: "",
  country: "",
};

function createBusinessOptions(country, businessName) {
  const options = {
    hostname: "api.orb-intelligence.com",
    port: 443,
    path: `/3/match/`,
    method: "GET",
  };
  APIparams.name = businessName;
  APIparams.country = country;
  return options;
}

async function businessDetails(country, business) {
  businessName = business.split(" ").slice(1).join(" ");
  const options = createBusinessOptions(country, businessName);
  const url = `https://${options.hostname}${options.path}`;
  try {
    const response = await axios.get(url, {
      headers: APIheader,
      params: APIparams,
      timeout: 20000,
    });
    if (response.data.results.length > 0) {
      return {
        name: response.data.results[0].name,
        parent_name: response.data.results[0].parent_name,
        company_status: response.data.results[0].company_status,
        address1: response.data.results[0].address1,
        city: response.data.results[0].city,
        state: response.data.results[0].state,
        country: response.data.results[0].country,
        iso_country_code: response.data.results[0].iso_country_code,
        zip: response.data.results[0].zip,
      };
    } else {
      return "No Results Found";
    }
  } catch (error) {
    console.log(error);
    return {
      error: true,
      status: 500,
      message: "Internal orbintel API server error",
    };
  }
}

module.exports = businessDetails;
