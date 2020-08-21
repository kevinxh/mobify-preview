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

const generateEnvName = (prNumber: number, branchName: string): string => {
  return `Preview-${prNumber} ${branchName}`
}

export const generateEnvId = (prNumber: number, branchName: string): string => {
  return slugify(generateEnvName(prNumber, branchName))
}

export const generateEnvPayload = (
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

export const fetchEnv = async (envId: string): Promise<object> => {
  const response = await fetch(
    `https://cloud.mobify.com/api/projects/${MOBIFY_PROJECT_ID}/target/${envId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `$Bearer ${MOBIFY_API_KEY}`
      }
    }
  )
  return await response.json()
}
