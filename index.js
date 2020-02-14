const {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
} = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsByIP("162.245.144.188", (error, data) => {
//   if (error) console.log("*** Error", error);

//   if (data) console.log("*** Data", data);
// });

// fetchISSFlyOverTimes({ lat: "49.27670", lon: "-123.13000" }, (error, data) => {
//   if (error) {
//     console.log(error);
//     return;
//   }
//   console.log("Data retrieved successfully. Flyover times:\n", data);
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(passTimes);
});
