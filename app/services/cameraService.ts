import { Camera } from "@rnmapbox/maps";

interface Coordinates {
  longitude: number;
  latitude: number;
}

interface Bounds {
  minLongitude: number;
  minLatitude: number;
  maxLongitude: number;
  maxLatitude: number;
}

export default class CameraService {
  constructor(private camera: React.RefObject<Camera>) {}

  private calculateCenterCoordinates(bounds: Bounds): Coordinates {
    return {
      longitude: (bounds.minLongitude + bounds.maxLongitude) / 2,
      latitude: (bounds.minLatitude + bounds.maxLatitude) / 2,
    };
  }

  private setCameraPosition(center: Coordinates, zoomLevel: number): void {
    this.camera.current?.setCamera({
      centerCoordinate: [center.longitude, center.latitude],
      zoomLevel,
    });
  }

  public centerCameraOnPeak(item: { geometry: { coordinates: [number, number] } }): void {
    const [longitude, latitude]: [number, number] = item.geometry.coordinates;
    this.setCameraPosition({ longitude, latitude }, 15);
  }

  public adjustCameraToTrail(origin: [number, number], destination: [number, number]): void {
    const bounds: Bounds = {
      minLongitude: Math.min(origin[0], destination[0]),
      minLatitude: Math.min(origin[1], destination[1]),
      maxLongitude: Math.max(origin[0], destination[0]),
      maxLatitude: Math.max(origin[1], destination[1]),
    };

    const center: Coordinates = this.calculateCenterCoordinates(bounds);
    this.setCameraPosition(center, 12);
  }
}
