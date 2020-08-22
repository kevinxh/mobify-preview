import * as core from '@actions/core'

import fetch from 'node-fetch'
import slugify from 'slugify'

const MOBIFY_API_KEY = core.getInput('MOBIFY_API_KEY', {required: true})
const MOBIFY_PROJECT_ID = core.getInput('MOBIFY_PROJECT_ID', {
  required: true
})

interface EnvPayload {
  name: string
  slug: string
  ssr_external_hostname: string
  ssr_external_domain: string
  ssr_region: string
}

interface EnvResult {
  name: string
  slug: string
  hostname: string
  current_deploy: object
  ssr_region: string
  ssr_external_hostname: string
  ssr_external_domain: string
}

const generateEnvName = (prNumber: number, branchName: string): string => {
  return `Preview-${prNumber} ${branchName}`
}

export const generateEnvId = (prNumber: number, branchName: string): string => {
  return slugify(generateEnvName(prNumber, branchName))
}

const generateEnvPayload = (
  prNumber: number,
  branchName: string
): EnvPayload => {
  const name = generateEnvName(prNumber, branchName)
  const slug = generateEnvId(prNumber, branchName)
  return {
    name,
    slug,
    ssr_external_hostname: `${slug}.mobify-storefront.com`,
    ssr_external_domain: 'mobify-storefront.com',
    ssr_region: 'us-east-1'
  }
}

export const fetchEnv = async (envId: string): Promise<EnvResult | null> => {
  core.debug('fetchEnv')
  const response = await fetch(
    `https://cloud.mobify.com/api/projects/${MOBIFY_PROJECT_ID}/target/${envId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MOBIFY_API_KEY}`
      }
    }
  )
  const resJson = await response.json()
  core.debug(JSON.stringify(resJson, null, 4))
  core.debug(`${response.status}`)
  if (!response.ok) {
    return null
  }

  return resJson
}

export const createEnv = async (
  prNumber: number,
  branchName: string
): Promise<EnvResult | null> => {
  const payload = generateEnvPayload(prNumber, branchName)
  core.debug('createEnv')
  const response = await fetch(
    `https://cloud.mobify.com/api/projects/${MOBIFY_PROJECT_ID}/target/`,
    {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MOBIFY_API_KEY}`
      }
    }
  )
  const resJson = await response.json()
  core.debug(JSON.stringify(resJson, null, 4))
  core.debug(`${response.status}`)
  if (!response.ok) {
    throw new Error('Failed to create new environment')
  }

  return resJson
}
