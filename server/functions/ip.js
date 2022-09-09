// Ip checking functions

function ipCheck(ip) {
  // Check if ip input is valid
  try {
    const ipSplit = ip.split(".");
    //check if first octect is not 0
    if (ipSplit[0] === "0" || ipSplit[0] === "255") {
      return false;
    }
  } catch (error) {
    return false;
  }
  if (checkIfIp(ip)) {
    return true;
  }
  return false;
}

//Check if this is an IP address
function checkIfIp(ip) {
  // Ip check RegEx based from w3resource.com
  // https://www.w3resource.com/javascript/form/ip-address-validation.php
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ip
    )
  ) {
    return true;
  }
  return false;
}

module.exports = { ipCheck, checkIfIp };
