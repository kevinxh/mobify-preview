import * as core from '@actions/core'
import * as github from '@actions/github'
import {getPrNumber} from './github'

async function run(): Promise<void> {
  try {
    core.info('-- Mobify Preview --')
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`)
    // const githubToken = core.getInput('github-token', {required: true})
    const prNumber = getPrNumber()
    if (!prNumber) {
      core.debug('Could not get pull request number from context, exiting')
      return
    }
    core.debug(`PR: ${prNumber}`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
