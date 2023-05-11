const core = require('@actions/core');
const github = require('@actions/github');

const mapOption = function(option) {
  return {
    'artifact': 'apk',
    'flavor': 'staging',
    'mode': 'release'
  };
};

try {
  const command = core.getInput('command').replace('/', '');
  const action = command.split(' ')[0];
  const flavors = command.replace(action,'').split(',').map(e => e.trim())
  const options = command.replace(action, '').split(',').map(mapOption)

  core.setOutput("action", action);
  core.setOutput("flavors", JSON.stringify(flavors));
  core.setOutput("options", JSON.stringify(options));


  // TODO: remove code below. Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}