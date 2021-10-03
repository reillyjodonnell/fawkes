const { userProfile } = require("./Profile");
const { findZip } = require("./convertZip");
const { findJob } = require("./findJob");

var nameOfCityAndState;
userProfile.then((res) => {
  const zipcode = res.zipCode;
  const language = res.keywords;
  nameOfCityAndState = findZip(zipcode);
  search(nameOfCityAndState);

  //browserObject.startBrowser(zipcode);
});
const search = async (nameOfCityAndState) => {
  const test = await findJob(nameOfCityAndState);
};
