import slugify from 'slugify'

interface EnvironmentPayload {
  name: string
  slug: string
  ssr_external_hostname: string
  ssr_external_domain: string
  ssr_region: string
}

export const generateEnvironmentPayload = (
  prNumber: number,
  branchName: string
): EnvironmentPayload => {
  const name = `Preview-${prNumber} ${branchName}`
  const slug = slugify(name)
  return {
    name,
    slug,
    ssr_external_hostname: `${slug}.mobify-storefront.com`,
    ssr_external_domain: 'mobify-storefront.com',
    ssr_region: 'us-east-1'
  }
}
