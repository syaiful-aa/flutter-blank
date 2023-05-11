const core = require('@actions/core');

try {
  const command = core.getInput('command').replace('/', '');
  const action = command.split(' ')[0];
  const options = command.replace(action, '').split(',').map(mapOption)

  core.setOutput("action", action);
  core.setOutput("build-options", JSON.stringify(options));
} catch (error) {
  core.setFailed(error.message);
}

function mapOption(option) {
	let args = option.trim().split(' ')
  let artifact = 'apk'
  if (args.length > 2) {
    artifact = args[0]
    args.shift()
  }
  
  return {
    'artifact': artifact,
    'flavor': args[0],
    'mode': args[1]
  };
}