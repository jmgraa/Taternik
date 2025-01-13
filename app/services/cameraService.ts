import { Camera } from "@rnmapbox/maps";

export const centerCameraOnPeak = (item: any, camera: React.RefObject<Camera>): void => {
  const longitude: number = item.geometry.coordinates[0];
  const latitude: number = item.geometry.coordinates[1];

  camera.current?.setCamera({
    centerCoordinate: [longitude, latitude],
    zoomLevel: 15
  });
}

export const adjustCameraToTrail = (origin: any, destination: any, camera: React.RefObject<Camera>): void => {
  const bounds: number[] = [
    Math.min(origin[0], destination[0]),
    Math.min(origin[1], origin[1]),
    Math.max(origin[0], destination[0]),
    Math.max(origin[1], origin[1]),
  ]

  camera.current?.setCamera({
    centerCoordinate: [
      (bounds[0] + bounds[2]) / 2,
      (bounds[1] + bounds[3]) / 2,
    ],
    zoomLevel: 12,
  });
}