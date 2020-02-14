/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request");

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request("https://api.ipify.org?format=json", (error, response, body) => {
    // error can be set if invalid domain, user is offline, etc.
    if (error) {
      return callback(error, null);
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ip = JSON.parse(body).ip.trim();
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`http://ip-api.com/json/${ip}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    const data = JSON.parse(body);

    // This error handling below fits the returned given by this api. ipvigilante was down.
    if (data.status === "fail" || response.statusCode !== 200) {
      //Server error
      const msg = `Status Code ${response.statusCode} when fetching Coordinates. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const { lat, lon } = data;
    return callback(null, { lat, lon });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };
