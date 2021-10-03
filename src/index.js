const { userProfile } = require("./Profile");
const browserObject = require("./browser");

userProfile.then((res) => {
  browserObject.startBrowser();
});
