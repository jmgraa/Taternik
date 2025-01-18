import json
import sys

def remove_features_without_name(input_file, output_file):
    print('Removing features without name...')
    with open(input_file, 'r', encoding='utf-8') as file:
        data = json.load(file)

    features = data['features']
    data['features'] = [feature for feature in features if 'name' in feature['properties']]

    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=2, ensure_ascii=False)
    print('Features without name removed.')


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python remove_features_without_name.py <input_geojson_file> <output_geojson_file>")
        sys.exit(1)

    INPUT_FILE = sys.argv[1]
    OUTPUT_FILE = sys.argv[2]

    remove_features_without_name(INPUT_FILE, OUTPUT_FILE)
