var inquirer = require("inquirer");

const getDeveloperType = async (prompts) => {
  const response = await inquirer
    .prompt(prompts)
    .then((answers) => {
      return answers.res;
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
  return response;
};

var firstQuestion = {
  type: "checkbox",
  message: "What developer positions are you looking for? (Space to toggle)",
  name: "res",
  choices: ["Front-End", "Back-End", "Full Stack"],
};

const secondQuestion = (developer) => {
  var response = [];
  var frontEnd = ["React", "Angular", "Vue", "TypeScript"];
  var backEnd = ["Node", "Django", "Ruby on Rails", "Flask", "Spring"];
  if (developer.includes("Full Stack")) {
    response.push(...frontEnd, ...backEnd);
  }
  if (
    developer.includes("Front-End") &&
    developer.includes("Full Stack") === false
  ) {
    response.push(...frontEnd);
  }
  if (
    developer.includes("Back-End") &&
    developer.includes("Full Stack") === false
  ) {
    response.push(...backEnd);
  }
  return {
    type: "checkbox",
    message: "What languages/frameworks do you know? (Space to toggle)",
    name: "res",
    choices: response,
  };
};

const locationPreference = (remoteResponse) => {
  if (remoteResponse === "Either" || remoteResponse === "No") {
    return {
      type: "input",
      message: "Type your desired zip code",
      name: "res",
    };
  } else {
    return;
  }
};
var remoteQuestion = {
  type: "list",
  message: "Do you want remote? (Enter to select)",
  name: "res",
  choices: ["Yes", "No", "Either"],
};
const askQuestions = async () => {
  const devPositions = await getDeveloperType(firstQuestion);
  const test = await secondQuestion(devPositions);
  const keywords = await getDeveloperType(test);
  const remote = await getDeveloperType(remoteQuestion);
  const location = await locationPreference(remote);
  var zipCode;
  if (location) {
    zipCode = await getDeveloperType(location);
  }

  return {
    devPositions,
    keywords,
    remote,
    zipCode,
  };
};

module.exports.profile = askQuestions();
