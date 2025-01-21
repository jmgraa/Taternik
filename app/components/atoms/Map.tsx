import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState, setUserLocation } from '@/store';
import { MapView, Camera, LocationPuck, ShapeSource, LineLayer, UserLocation, Location } from '@rnmapbox/maps'
import CameraService from '@/app/services/cameraService';

interface MapProps {
  camera: React.RefObject<Camera>;
  cameraService: CameraService;
}

const bounds = {
  ne: [20.286403, 49.300444],
  sw: [19.583921, 49.145569],
};

const MapAtom: React.FC<MapProps> = ({ camera, cameraService }) => {
  const currentRoute = useSelector((state: RootState) => state.route.currentRoute);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (currentRoute?.originCoordinates && currentRoute?.destinationCoordinates) {
      const originArray: [number, number] = [...Object.values(currentRoute.originCoordinates)] as [number, number];
      const destinationArray: [number, number] = [...Object.values(currentRoute.destinationCoordinates)] as [number, number];
  
      cameraService.adjustCameraToTrail(originArray, destinationArray);
    }
    
  }, [currentRoute?.originCoordinates, currentRoute?.destinationCoordinates]);

  const setUserLocationInStore = (longitude: number, latitude: number): void => {
    dispatch(setUserLocation({ longitude: longitude, latitude: latitude }));
  };

  return (
    <MapView
      style={{flex: 1}}      
      styleURL={process.env.EXPO_PUBLIC_MAPBOX_STYLE_URL}
      scaleBarEnabled={false}
      logoEnabled={false}
      attributionEnabled={false}
    >
      <Camera
        ref={camera}
        maxBounds={bounds}
        centerCoordinate={[19.963916, 49.240495]}
      />

      <LocationPuck />

      <UserLocation
        visible={false}
        onUpdate={(location: Location) => setUserLocationInStore(location.coords.longitude, location.coords.latitude)}
      />
      
      { currentRoute?.shapes &&
        <ShapeSource 
          id="path-source" 
          shape={currentRoute.shapes}
        >
          <LineLayer
            id="path-layer"
            style={{
              lineColor: 'orange',
              lineWidth: 5,
              lineDasharray: [2, 1.5]
            }}
          />
        </ShapeSource>
      }
    </MapView> 
  )
}

export default MapAtom
