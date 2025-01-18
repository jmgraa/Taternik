import json
import sys

def find_duplicate_names(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)

    name_count = {}
    for feature in data['features']:
        name = feature['properties']['name']
        if name in name_count:
            name_count[name] += 1
        else:
            name_count[name] = 1

    duplicate_names = [name for name, count in name_count.items() if count > 1]
    return duplicate_names


def rename_duplicates(file_path, duplicates_names):
    with open(file_path, 'r', encoding='utf-8') as file:
        data = json.load(file)

    cannot_rename = set()

    for feature in data['features']:
        name = feature['properties']['name']
        if name in duplicates_names:
            if feature['properties']['ele']:
                feature['properties']['name'] = f"{name} ({feature['properties']['ele']} m)"
            else:
                cannot_rename.add(name)

    with open(file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=2, ensure_ascii=False)

    print(f"{len(duplicates_names)} duplicate(s) renamed.")
    if cannot_rename:
        print(f"Cannot rename: {', '.join(cannot_rename)}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python duplicates_finder.py <input_geojson_file>")
        sys.exit(1)

    INPUT_FILE = sys.argv[1]

    duplicates = find_duplicate_names(INPUT_FILE)
    duplicates_len = len(duplicates)

    if duplicates:
        response = input("Do you want to rename duplicates? (Y/n): ")
        if response.lower() == 'n':
            print("Exiting without renaming.")
            sys.exit(0)
        else:
            rename_duplicates(INPUT_FILE, duplicates)
