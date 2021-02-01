/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
// bundle forked scripts with webpack
// as in production, with asar, node_modules are not accessible in forked scripts

const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const getPreloadScriptsConfig = () => {
  const plugins = [];
  return {
    mode: 'production',
    node: {
      global: false,
      __filename: false,
      __dirname: false,
    },
    entry: {
      'preload-default': path.join(__dirname, 'main-src', 'preload', 'default.js'),
      'preload-menubar': path.join(__dirname, 'main-src', 'preload', 'menubar.js'),
    },
    target: 'electron-renderer',
    output: {
      path: path.join(__dirname, 'build'),
      filename: '[name].js',
    },
    devtool: 'source-map',
    plugins,
  };
};

const getElectronMainConfig = () => {
  const plugins = [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['libs'],
      cleanAfterEveryBuildPatterns: [],
    }),
    new webpack.DefinePlugin({
      'process.env.ELECTRON_APP_SENTRY_DSN': JSON.stringify(process.env.ELECTRON_APP_SENTRY_DSN),
    }),
  ];

  const patterns = [
    {
      from: path.join(__dirname, 'main-src', 'images'),
      to: path.join(__dirname, 'build', 'images'),
    },
    {
      from: path.join(__dirname, 'node_modules', 'node-mac-permissions', 'build', 'Release', 'permissions.node'),
      to: path.join(__dirname, 'build', 'permissions.node'),
    },
  ];
  plugins.push(new CopyPlugin({ patterns }));

  return {
    mode: 'production',
    node: {
      global: false,
      __filename: false,
      __dirname: false,
    },
    entry: {
      electron: path.join(__dirname, 'main-src', 'electron.js'),
    },
    target: 'electron-main',
    output: {
      path: path.join(__dirname, 'build'),
      filename: '[name].js',
    },
    devtool: 'source-map',
    plugins,
  };
};

module.exports = [getElectronMainConfig(), getPreloadScriptsConfig()];
