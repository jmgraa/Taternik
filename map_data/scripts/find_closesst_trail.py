import geopandas as gpd
from shapely.geometry import Point, LineString
import sys

def find_closest_point(peak):
    trails_gdf = gpd.read_file('data/trails.geojson')
    closest_point = None
    min_distance = float('inf')

    for trail in trails_gdf['geometry']:
        if isinstance(trail, LineString):
            for coord in trail.coords:
                point = Point(coord)
                distance = peak.distance(point)
                if distance < min_distance:
                    min_distance = distance
                    closest_point = point
        elif isinstance(trail, Point):
            distance = peak.distance(trail)
            if distance < min_distance:
                min_distance = distance
                closest_point = trail

    return closest_point

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python filter_geojson.py <input_geojson_file> <output_geojson_file>")
        sys.exit(1)

    INPUT_FILE = sys.argv[1]
    OUTPUT_FILE = sys.argv[2]

    peaks_gdf = gpd.read_file(INPUT_FILE)

    peaks_len = sum(1 for _ in peaks_gdf.iterrows())
    i = 1
    for _, peak_row in peaks_gdf.iterrows():
        print(f"Processing peak {i} of {peaks_len}")
        i += 1
        peak_geom = peak_row['geometry']
        closest = find_closest_point(peak_geom)
        peaks_gdf.at[peak_row.name, 'closest_trail_lon'] = closest.x
        peaks_gdf.at[peak_row.name, 'closest_trail_lat'] = closest.y

    peaks_gdf.to_file(OUTPUT_FILE, driver='GeoJSON')
    print(f'Filtered GeoJSON saved to:{OUTPUT_FILE}')
