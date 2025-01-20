export default {
  "expo": {
    "name": "Taternik",
    "slug": "Taternik",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/app-icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "newArchEnabled": true,
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/app-icon.png",
        "backgroundColor": "#e1dbca"
      },
      "package": "com.jmgraa.Taternik"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/app-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#e1dbca"
        }
      ],
      [
        "@rnmapbox/maps",
        {
          "RNMapboxMapsDownloadToken": process.env.MAPBOX_API_KEY
        }
      ],
      [
        "expo-location",
        {
          "locationWhenInUsePermission": "Show current location on map."
        }
      ]
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "b6afad55-5481-4f80-be59-dd8358e0eb08"
      }
    }
  }
}
