// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Configure path aliases
config.resolver.alias = {
  '@': path.resolve(__dirname, 'src'),
};

// Fast Refresh is enabled by default in Expo
// No additional configuration needed - it works automatically!

module.exports = withNativeWind(config, { input: './src/styles/globals.css' });

