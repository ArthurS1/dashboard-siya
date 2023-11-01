/*
 * Environment provides configuration for feature toggles and api urls
 * based on environment variables.
 */

import Configuration from '../interfaces/Configuration'

export default class Environment implements Configuration {

  featureToggles: Map<string, boolean>= new Map([
    // example of enabling a feature toggle
    // ["feature", true]
  ])

  baseUrlFor(service: string) {
    const a = process.env[service]

    console.debug(process.env); //TODO: remove

    if (a === undefined)
      throw new Error(`Failed to find environment variable ${service}`)
    else
      return new URL(a)
  }

  featureToggleFor(feature: string) {
    const a = this.featureToggles.get(feature)

    return a === undefined ? false : a
  }

}
