interface Configuration {
  baseUrlFor(service: string): URL
  featureToggleFor(feature: string): boolean
}

export default Configuration;
