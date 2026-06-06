import { deliveryOriginLatitude, deliveryOriginLongitude } from "@/lib/billing";

type NominatimResult = {
  lat?: string;
  lon?: string;
};

const toRadians = (value: number) => (value * Math.PI) / 180;

export function getDistanceKm(from: { lat: number; lon: number }, to: { lat: number; lon: number }) {
  const earthRadiusKm = 6371;
  const dLat = toRadians(to.lat - from.lat);
  const dLon = toRadians(to.lon - from.lon);
  const lat1 = toRadians(from.lat);
  const lat2 = toRadians(to.lat);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return 2 * earthRadiusKm * Math.asin(Math.sqrt(a));
}

export async function getDistanceFromMayurViharByPincode(pincode: string) {
  const cleanPincode = pincode.trim();
  if (!/^\d{6}$/.test(cleanPincode)) return null;

  const params = new URLSearchParams({
    format: "json",
    countrycodes: "in",
    postalcode: cleanPincode,
    limit: "1"
  });
  const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
    headers: { Accept: "application/json" }
  });
  if (!response.ok) return null;

  const [result] = (await response.json()) as NominatimResult[];
  const lat = Number(result?.lat);
  const lon = Number(result?.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

  const distance = getDistanceKm({ lat: deliveryOriginLatitude, lon: deliveryOriginLongitude }, { lat, lon });
  return Math.round(distance * 10) / 10;
}
