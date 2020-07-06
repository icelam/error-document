/* eslint "import/no-extraneous-dependencies": ["error", {"optionalDependencies": false} ] */
const path = require('path');
const fs = require('fs');
const Webpack = require('webpack');
const dotenv = require('dotenv');
const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const baseWebpackConfig = require('./webpack.base.conf');
const getClientEnvironment = require('./utils/env');
const InlineChunkHtmlPlugin = require('./utils/InlineChunkHtmlPlugin');

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
  path.resolve(__dirname, '../.env.production.local'),
  path.resolve(__dirname, '../.env.production'),
  path.resolve(__dirname, '../.env')
].filter((dotenvFile) => fs.existsSync(dotenvFile));

console.log(`${dotenvFiles[0]} will be used.\n`);

// Load env variables
dotenv.config({
  path: dotenvFiles[0]
});

const clientEnv = getClientEnvironment('production');

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  stats: 'errors-only',
  bail: true,
  plugins: [
    new Webpack.DefinePlugin(clientEnv.stringified),
    new Webpack.optimize.ModuleConcatenationPlugin(),
    new OptimizeCssnanoPlugin({
      sourceMap: false,
      cssnanoOptions: {
        preset: ['default', {
          discardComments: {
            removeAll: true
          }
        }]
      }
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: '../bundle-analyzer-plugin-report.html'
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/.+[.]js/])
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            envName: 'production'
          }
        }]
      },
      {
        test: /\.s?css/i,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: 'head',
              injectType: 'singletonStyleTag'
            }
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
});
