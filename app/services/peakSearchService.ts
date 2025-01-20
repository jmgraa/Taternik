import Fuse, { FuseResult } from 'fuse.js';
import peaksGeoJson from '@/map_data/json/peaks.json';
import { Peak } from '@/app/types/peakTypes';

const fuse = new Fuse(peaksGeoJson.features, {
  keys: ['properties.name'],
  includeScore: true,
});

export const searchPeaks = (query: string): Peak[] => {
  if (!query) {
    return [];
  }

  const searchResults: FuseResult<Peak>[] = fuse.search<Peak>(query);
  return searchResults.map((result: FuseResult<Peak>) => result.item);
};

export { Peak };
