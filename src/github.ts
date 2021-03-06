import * as github from '@actions/github'

export const getPrNumber = (): number | undefined => {
  const pullRequest = github.context.payload.pull_request
  if (!pullRequest) {
    return undefined
  }

  return pullRequest.number
}

export const getPrBranch = (): string | undefined => {
  const pullRequest = github.context.payload.pull_request
  if (!pullRequest) {
    return ''
  }

  return pullRequest.head.ref
}

export const isNewPR = (): boolean => {
  const pullRequest = github.context.payload.pull_request
  if (!pullRequest) {
    return false
  }

  return pullRequest.action === 'opened'
}
