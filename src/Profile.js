const returnedPromise = require("./Profiler");
const fs = require("fs");

const test = async () => {
  const returnedPromiseValue = await returnedPromise.profile;
  return returnedPromiseValue;
};

test().then((data) => {
  var jsonProfile = JSON.stringify(data, null, 2);
  fs.writeFile("userConfig.json", jsonProfile, "utf8", () => {});
});

module.exports.userProfile = test();
