const core = require('@actions/core');
const github = require('@actions/github');
const wait = require('./wait');


// most @actions toolkit packages have async methods
async function run() {
  try {
    const token = core.getInput("github_token", { required: true })
    const client = github.getOctokit(token);
    const isActionsDefined = client.actions;
    const isRestDefined = client.rest;

    console.log(`client.actions is defined: ${isActionsDefined}`);
    console.log(`client.rest is defined: ${isRestDefined}`);

    const ms = core.getInput('milliseconds');
    core.info(`Waiting ${ms} milliseconds ...`);

    core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    await wait(parseInt(ms));
    core.info((new Date()).toTimeString());

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
