# Launching a project as a developer

## Prerequisites
Before running your React Native project, ensure you have the following installed:
- **Android Studio**
- **Node.js**
- **Java Development Kit**

## Running the Project

### 1. Clone the Repository
```bash
git clone https://github.com/jmgraa/Taternik.git
cd Taternik
```

### 2. Create .env file
Create an .env file with two variables:  
- **EXPO_PUBLIC_MAPBOX_API_KEY** - api key for Mapbox service
- **EXPO_PUBLIC_MAPBOX_STYLE_URL** - url to map style

For project defense purposes, an .env file has been provided along with the .apk installation file.

### 3. Install Dependencies
Navigate to your project directory and install the required dependencies:
```bash
npm install
```

### 4. Set up Android studio
Follow the [Expo Tutorial](#https://docs.expo.dev/workflow/android-studio-emulator/).

### 5. Start the Metro Bundler
Run the following command to start the Metro bundler:
```bash
npx expo run:android
```
This will open the Android emulator and the application installed on it will be displayed.
In case of errors after applying all steps, restart the application several times or click the available **reload** button. Remember to manually grant location permissions.