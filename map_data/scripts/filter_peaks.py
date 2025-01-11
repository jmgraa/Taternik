import json
import sys

def filter_geojson(input_file, output_file, properties):
    print('Filtering GeoJSON...')

    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            geojson_data = json.load(f)

        for feature in geojson_data['features']:
            feature['properties'] = {key: value for key, value in feature['properties'].items() if key in properties}

        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(geojson_data, f, indent=4, ensure_ascii=False)

        print(f"Filtered GeoJSON saved to: {output_file}")

    except Exception as e:
        print(f"Error processing GeoJSON file: {e}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python filter_peaks.py <input_geojson_file> <output_geojson_file> <['property1', 'property2', ...]>")
        sys.exit(1)

    INPUT_FILE = sys.argv[1]
    OUTPUT_FILE = sys.argv[2]

    if len(sys.argv) == 4:
        properties_to_keep = json.loads(sys.argv[3])
    else:
        properties_to_keep = ['id', 'ele', 'ele:bpv', 'name', 'name:pl', 'name:sk', 'natural', 'wikipedia']

    filter_geojson(INPUT_FILE, OUTPUT_FILE, properties_to_keep)
