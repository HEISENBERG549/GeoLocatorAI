// Example shared schema for GeoLocatorAI

export interface PredictionResult {
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  confidence: number;
}
