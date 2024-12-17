import json

def filter_geojson_properties(input_file, output_file, keys_to_keep):
    with open(input_file, 'r', encoding='utf-8') as f:
        geojson_data = json.load(f)

    for feature in geojson_data.get('features', []):
        if 'properties' in feature:
            feature['properties'] = {
                key: value for key, value in feature['properties'].items() if key in keys_to_keep
            }

    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(geojson_data, f, indent=2)

INPUT_FILE = 'export.geojson'
OUTPUT_FILE = 'peaks.geojson'
keys_to_keep = ['@id', 'ele', 'ele:bpv', 'name', 'name:pl', 'natural']

filter_geojson_properties(INPUT_FILE, OUTPUT_FILE, keys_to_keep)
