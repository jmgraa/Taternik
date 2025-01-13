export interface Peak {
  type: string;
  properties: {
    id: string;
    ele: number | null;
    "ele:bpv": string | null;
    name: string | null;
    "name:pl": string | null;
    "name:sk": string | null;
    natural: string | null;
    wikipedia: string | null;
    closest_trail_lon: number;
    closest_trail_lat: number;
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
}