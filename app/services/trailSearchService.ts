import { AppDispatch, setCurrentRoute } from '@/store';
import { Feature, LineString, Point } from 'geojson';
import PathFinder, { pathToGeoJSON } from 'geojson-path-finder';
import { length } from '@turf/turf';
import { Peak } from '@/app/types/peakTypes';

const peaksGeoJson = require('@/map_data/data/peaks.json');
const trailsGeojson = require('@/map_data/data/trails.json');
const pathFinder = new PathFinder(trailsGeojson, { tolerance: 0.0000001 });

const handleSetCurrentRoute = (param: any, originName: string, destinationName: string, distance: string, time: string, dispatch: AppDispatch): void => {
  dispatch(setCurrentRoute({ origin: originName, destination: destinationName, shapes: param, distance: distance, time: time }));
};

const getPeakById =(geojson: { type: string, features: Feature<Point, Peak>[] }, id: string): Feature<Point, Peak> | undefined => {
  return geojson.features.find(feature => feature.properties.properties.id === id);
}

export const FindTrailBetweenPeaks = (originId: string, destinationId: string, dispatch: AppDispatch): boolean => {
  const originPeak: Feature<Point, Peak> | undefined =  getPeakById(peaksGeoJson, originId);
  const destinationPeak: Feature<Point, Peak> | undefined = getPeakById(peaksGeoJson, destinationId);

  if (!originPeak || !destinationPeak) {
    return false;
  }

  originPeak.geometry.coordinates[0] = originPeak.properties.properties.closest_trail_lon;
  originPeak.geometry.coordinates[1] = originPeak.properties.properties.closest_trail_lat;
  destinationPeak.geometry.coordinates[0] = destinationPeak.properties.properties.closest_trail_lon;
  destinationPeak.geometry.coordinates[1] = destinationPeak.properties.properties.closest_trail_lat;

  const path: Feature<LineString, any> | undefined = pathToGeoJSON(pathFinder.findPath(originPeak, destinationPeak));

  if (!path) {
    return false;
  }

  const distance: number = Math.round(length(path, { units: 'kilometers' }) * 100) / 100;
  const time: number = Math.round(distance / 5 * 100) / 100;

  handleSetCurrentRoute(path, originPeak.properties.properties.name ?? '', destinationPeak.properties.properties.name ?? '', distance.toFixed(2), time.toFixed(2), dispatch);

  return true;
};
