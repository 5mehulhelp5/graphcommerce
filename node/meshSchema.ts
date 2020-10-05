import '@graphql-mesh/transform-filter-schema'
import '@graphql-mesh/graphql'
import '@graphql-mesh/merger-stitching'
import '@graphql-mesh/transform-cache'
import '@graphql-mesh/cache-file'

import { performance } from 'perf_hooks'
import { processConfig } from '@graphql-mesh/config'
import { getMesh } from '@graphql-mesh/runtime'
import meshrc from '../.meshrc.json'

function injectEnv<T extends Record<string, unknown>>(json: T): T {
  let content = JSON.stringify(json)

  if (typeof process === 'undefined' || 'env' in process === false) {
    throw new Error('Process process.env not available')
  }

  content = content.replace(/\$\{(.*?)\}/g, (_, variable) => {
    let varName = variable
    let defaultValue = ''

    if (variable.includes(':')) {
      const spl = variable.split(':')
      varName = spl.shift()
      defaultValue = spl.join(':')
    }

    if (!process.env[varName]) {
      throw new Error(`Env variable ${varName} not defined`)
    }

    return process.env[varName] || defaultValue
  })

  return JSON.parse(content)
}

export const mesh = (async () => {
  performance.mark('start-conf')
  const conf = await processConfig(injectEnv(meshrc))
  performance.mark('end-conf')

  performance.measure('conf', 'start-conf', 'end-conf')

  performance.mark('start-mesh')
  const resMesh = await getMesh(conf)
  performance.mark('end-mesh')

  performance.measure('mesh', 'start-mesh', 'end-mesh')
  return resMesh
})()

const meshSchema = mesh.then(({ schema }) => schema)

export default meshSchema
