import json
from os import path, remove
import sys
import geopandas as gpd
from shapely.geometry import Point, LineString


def filter_geojson(input_file, output_file):
    print('Filtering GeoJSON...')

    properties = ['@id', 'ele', 'ele:bpv', 'name', 'name:pl', 'name:sk', 'natural', 'wikipedia']

    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            geojson_data = json.load(f)

        for feature in geojson_data['features']:
            feature['properties'] = {
                key: value
                for key, value in feature['properties'].items()
                if key in properties
            }
            if '@id' in feature['properties']:
                feature['properties']['id'] = feature['properties'].pop('@id')

        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(geojson_data, f, indent=2, ensure_ascii=False)

        print("GeoJSON filtered.")

    except Exception as e:
        print(f"Error processing GeoJSON file: {e}")


def find_single_point(peak):
    trails_gdf = gpd.read_file('geojson/original/trails.geojson')
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


def find_closest_points(input_file, output_file):
    print('Finding closest points...')

    peaks_gdf = gpd.read_file(input_file)

    peaks_len = sum(1 for _ in peaks_gdf.iterrows())
    i = 1
    for _, peak_row in peaks_gdf.iterrows():
        print(f"Processing peak {i} of {peaks_len}")
        i += 1
        peak_geom = peak_row['geometry']
        closest = find_single_point(peak_geom)
        peaks_gdf.at[peak_row.name, 'closest_trail_lon'] = closest.x
        peaks_gdf.at[peak_row.name, 'closest_trail_lat'] = closest.y

    peaks_gdf.to_file(output_file, driver='GeoJSON')

    print('Closest points found.')


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python setup_data.py <input_geojson_file> <output_geojson_file>")
        sys.exit(1)

    INPUT_FILE = sys.argv[1]
    OUTPUT_FILE = sys.argv[2]

    if path.exists(OUTPUT_FILE):
        response = input(f"Output file '{OUTPUT_FILE}' already exists. Do you want to overwrite it? (y/N): ")
        if response.lower() != 'y':
            print("Exiting without overwriting the output file.")
            sys.exit(0)
        else:
            remove(OUTPUT_FILE)
            print(f"Output file '{OUTPUT_FILE}' removed.")

    functions = [filter_geojson, find_closest_points]

    i = 1
    for func in functions:
        print(f"{i}/{len(functions)} ", end='')
        i += 1
        func(INPUT_FILE, OUTPUT_FILE)
        if i == 2:
            INPUT_FILE = OUTPUT_FILE

    print(f'Filtered GeoJSON saved to: {OUTPUT_FILE}')
