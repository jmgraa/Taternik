import Fuse, { FuseResult } from 'fuse.js';
import peaksGeoJson from '@/map_data/json/peaks.json';
import importantPoints from '@/map_data/json/important_points.json'
import Peak, { PeakProperties } from '@/app/types/peakTypes';

const fuse = new Fuse(peaksGeoJson.features, {
  keys: ['properties.name'],
  includeScore: true
});

export default class PeakSearchService { 
  public searchPeaks(query: string): Peak[] {
    if (!query) {
      return [];
    }
  
    const searchResults: FuseResult<Peak>[] = fuse.search<Peak>(query);

    const peaks: Peak[] = searchResults
      .filter((result: FuseResult<Peak>) => result.score !== undefined && result.score < 0.3)
      .map((result: FuseResult<Peak>) => result.item);

    return peaks;
  };
}
