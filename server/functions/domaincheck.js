//Check if domain has an email address and leaves domain info

function emailCheck(input) {
  if (input.includes("@")) {
    input = input.split("@")[1];
  }
  return input;
}

module.exports = { emailCheck };
