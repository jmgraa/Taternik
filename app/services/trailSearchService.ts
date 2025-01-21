import { AppDispatch, setCurrentRoute } from '@/store';
import { Feature, LineString, Point } from 'geojson';
import PathFinder, { pathToGeoJSON } from 'geojson-path-finder';
import { length } from '@turf/turf';
import { PeakProperties } from '@/app/types/peakTypes';

const peaksGeoJson: any = require('@/map_data/json/peaks.json');
const trailsGeojson: any = require('@/map_data/json/trails.json');
const pathFinder: PathFinder<unknown, unknown> = new PathFinder(trailsGeojson, { tolerance: 0.0000001 });

export default class TrailSearchService {
  constructor(private dispatch: AppDispatch) {}

  private handleSetCurrentRoute(param: any, originName: string, destinationName: string, distance: string, time: string): void {
    this.dispatch(setCurrentRoute({ origin: originName, destination: destinationName, originCoordinates: param.geometry.coordinates[0], destinationCoordinates: param.geometry.coordinates[param.geometry.coordinates.length - 1], shapes: param, distance: distance, time: time }));
  };

  private getPeakById(geojson: { type: string, features: Feature<Point, PeakProperties>[] }, id: string): Feature<Point, PeakProperties> | undefined {
    return geojson.features.find(feature => feature.properties.id === id);
  }

  public FindTrailBetweenPeaks(originId: string, destinationId: string): boolean {
    const originPeak: Feature<Point, PeakProperties> | undefined =  this.getPeakById(peaksGeoJson, originId);
    const destinationPeak: Feature<Point, PeakProperties> | undefined = this.getPeakById(peaksGeoJson, destinationId);
  
    if (!originPeak || !destinationPeak) {
      return false;
    }
  
    originPeak.geometry.coordinates[0] = originPeak.properties.closest_trail_lon;
    originPeak.geometry.coordinates[1] = originPeak.properties.closest_trail_lat;
    destinationPeak.geometry.coordinates[0] = destinationPeak.properties.closest_trail_lon;
    destinationPeak.geometry.coordinates[1] = destinationPeak.properties.closest_trail_lat;
  
    const path: Feature<LineString, any> | undefined = pathToGeoJSON(pathFinder.findPath(originPeak, destinationPeak));
  
    if (!path) {
      return false;
    }
  
    const distance: number = Math.round(length(path, { units: 'kilometers' }) * 100) / 100;
    const time: number = Math.round(distance / 3 * 100) / 100;
  
    this.handleSetCurrentRoute(path, originPeak.properties.name ?? '', destinationPeak.properties.name ?? '', distance.toFixed(2), time.toFixed(2));
  
    return true;
  };
}
