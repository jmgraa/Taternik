const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

config.resolver.assetExts = [...config.resolver.assetExts, 'geojson'];
config.resolver.sourceExts = [...config.resolver.sourceExts, 'geojson'];

module.exports = withNativeWind(config, { input: './constants/global.css' })