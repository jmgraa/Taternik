import json
import sys

def fix_double_names(input_file, output_file):
    print('Fixing double names...')

    with open(input_file, 'r', encoding='utf-8') as file:
        data = json.load(file)

    cannot_fix = set()

    counter = 0
    for feature in data['features']:
        name = feature['properties']['name']
        if '/' in name:
            if feature['properties']['name:pl']:
                feature['properties']['name'] = feature['properties']['name:pl']
                counter += 1
            else:
                cannot_fix.add(name)

    with open(output_file, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=2, ensure_ascii=False)
    print(f'{counter} double name(s) fixed.')
    if cannot_fix:
        print(f"Cannot fix {len(cannot_fix)} name(s):\n{'\n'.join(cannot_fix)}")


if __name__ == "__main__":
    if len(sys.argv) != 2 and len(sys.argv) != 3:
        print("Usage: python fix_double_names.py <input_geojson_file> <optional: output_geojson_file>")
        sys.exit(1)

    INPUT_FILE = sys.argv[1]
    if len(sys.argv) == 3:
        OUTPUT_FILE = sys.argv[2]
    else:
        OUTPUT_FILE = INPUT_FILE

    fix_double_names(INPUT_FILE, OUTPUT_FILE)
