const { startBrowser } = require("./browser");

const findJob = async (location) => {
  const cityAndState = await location;
  //seperate the city and the state into two variables to insert into the url
  var commaLocation = cityAndState.indexOf(",");
  var nameOfCity = cityAndState.substr(0, commaLocation);
  var nameOfState = cityAndState.substr(commaLocation + 2);

  console.log(`City:${nameOfCity} state:${nameOfState}`);

  const searchForJobLinkedIn = `https://www.linkedin.com/jobs/search?keywords=&location=${nameOfCity}%2C%${nameOfState}&geoId=&trk=public_jobs_jobs-search-bar_search-submit&position=1&pageNum=0`;

  const page = await startBrowser();
  const newPage = await page.newPage();
  await newPage.goto(searchForJobLinkedIn);
  newPage
    .$eval(
      "button[data-tracking-control-name=homepage-jobseeker_search-jobs-search-btn]",
      (el) => el.click()
    )
    .then(() => {
      newPage.screenshot({ path: "job.png" });
    });
  const result = await page.evaluate;

  //const urlForZip = `https://www.bing.com/search?q=what%20city%20is%${location}&qs=n&form=QBRE&sp=-1&pq=what%20city%20is%202253&sc=7-17&sk=&cvid=877E1816F4A6431593DC9D8DDD3AC38E`;
  //   //   try {
  //     /*
  //     const page = await browser.newPage();
  //     await page.goto(searchForZip);
  //     await page.screenshot({ path: "Wiki.png" });
  //     const result = await page.evaluate;
  //     console.log(result);
  //     */

  //     const page = await startBrowser();
  //     const newPage = await page.newPage();
  //     await newPage.goto(searchForZip);

  //     const result = await newPage.evaluate(() => {
  //       return document.querySelectorAll("#mt_tleWrp h2 a")[0].innerText;
  //     });
  //     //Parse the length to remove the 7 chars
  //     nameOfCityAndState = await result.slice(7);
  //   } catch (err) {
  //     console.log("Could not create a browser instance => : ", err);
  //   }
  //   return nameOfCityAndState;
};

module.exports = {
  findJob,
};
