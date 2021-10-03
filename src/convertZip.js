const { startBrowser } = require("./browser");

async function findZip(location) {
  var nameOfCityAndState = ``;
  const searchForZip = `https://www.bing.com/search?q=${location}%20city&qs=n&form=QBRE&sp=-1&pq=22535%20city&sc=8-10&sk=&cvid=5A5D06A03AF44FCA8030A391C3610793`;
  const urlForZip = `https://www.bing.com/search?q=what%20city%20is%${location}&qs=n&form=QBRE&sp=-1&pq=what%20city%20is%202253&sc=7-17&sk=&cvid=877E1816F4A6431593DC9D8DDD3AC38E`;
  try {
    /*
    const page = await browser.newPage();
    await page.goto(searchForZip);
    await page.screenshot({ path: "Wiki.png" });
    const result = await page.evaluate;
    console.log(result);
    */

    const page = await startBrowser();
    const newPage = await page.newPage();
    await newPage.goto(searchForZip);

    const result = await newPage.evaluate(() => {
      return document.querySelectorAll("#mt_tleWrp h2 a")[0].innerText;
    });
    //Parse the length to remove the 7 chars
    nameOfCityAndState = await result.slice(7);
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
  }
  return nameOfCityAndState;
}

module.exports = {
  findZip,
};
