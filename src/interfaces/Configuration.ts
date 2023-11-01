export default interface Configuration {
  baseUrlFor(service: string): URL
  featureToggleFor(feature: string): boolean
}
