import { Camera } from "@rnmapbox/maps";

export const centerCameraOnPeak = (item: any, camera: React.RefObject<Camera>): void => {
  const longitude: number = item.geometry.coordinates[0];
  const latitude: number = item.geometry.coordinates[1];

  camera.current?.setCamera({
    centerCoordinate: [longitude, latitude],
    zoomLevel: 15
  });
}