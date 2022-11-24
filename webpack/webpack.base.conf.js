/* eslint "import/no-extraneous-dependencies": ["error", {"optionalDependencies": false} ] */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const HtmlVariablesPlugin = require('html-variables-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'assets/js/[name].js',
    assetModuleFilename: 'assets/[name].[hash:8][ext]',
    publicPath: ''
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      inject: 'body'
    }),
    new HtmlInlineScriptPlugin(),
    new HtmlVariablesPlugin(process.env)
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@js': path.resolve(__dirname, '../src/assets/js'),
      '@style': path.resolve(__dirname, '../src/assets/scss')
    }
  },
  module: {
    rules: [
      {
        test: /\.(html|htm)(\?.*)?$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico|webp)(\?.*)?$/,
        exclude: [
          path.resolve(__dirname, '../src/assets/fonts')
        ],
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[hash:8][ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/media/[name].[hash:8][ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[hash:8][ext]'
        },
        exclude: [
          path.resolve(__dirname, '../src/assets/images')
        ]
      }
    ]
  }
};
