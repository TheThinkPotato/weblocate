// This function handles all of the API calls for the Search route

const ipInfoAPI = require("../apis/ipinfo");
const localTimeAPI = require("../apis/localtime");
const orbIntelAPI = require("../apis/orbintel");
const exerraAPI = require("../apis/exerra");
const apisNinjasDNS = require("../apis/apininjasdns.js");

// Search for ip details
async function search(ip, domain) {
  let ipGeoInfo = {};
  let localTime = {};
  let businessInfo = {};
  let phishingCheck = {};
  try {
    ipGeoInfo = await ipInfoAPI(ip, domain);
  } catch (error) {
    return { error: true, message: "Error getting data from ipinfo API." };
  }

  if (ipGeoInfo.bogon !== true) {
    try {
      localTime = await localTimeAPI(ipGeoInfo.timezone);
    } catch (error) {
      return {
        error: true,
        message: "Error getting data from localtime API.",
      };
    }

    try {
      businessInfo = await orbIntelAPI(ipGeoInfo.country, ipGeoInfo.org);
    } catch (error) {
      return {
        error: true,
        message: "Error getting data from orbintel API.",
      };
    }

    try {
      phishingCheck = await exerraAPI(domain);
    } catch (error) {
      return { error: true, message: "Error getting data from exerra API." };
    }
    if (localTime.error || businessInfo.error || phishingCheck.error) {
      return {
        error: true,
        message: "Error getting data from APIs.",
      };
    } else {
      return {
        search: { searchIP: ip, searchDomain: domain },
        ipGeoInfo,
        businessInfo,
        localTime,
        phishingCheck,
        error: false,
      };
    }
  }
}

async function getIP(domain) {
  const ip = await apisNinjasDNS(domain); //Get IP address from API-Ninjas DNS
  if (ip.error) {
    return { status: ip.status, error: ip.error, message: ip.message };
  }
  if (!ip) {
    return {
      status: 400,
      error: true,
      message: "Bad Request No Results Found.",
    };
  } else {
    return ip;
  }
}

module.exports = { search, getIP };
