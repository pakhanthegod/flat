const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: [
    path.resolve(__dirname, 'src/css/styles.scss'),
    path.resolve(__dirname, 'src/js/main.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: miniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [autoprefixer('last 4 versions', 'not ie <= 11', 'not ie_mob <= 11')];
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new miniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new copyWebpackPlugin([
      {
        from: 'src/img',
        to: 'img'
      },
      {
        from: 'src/js',
        to: 'js'
      }
    ])
  ]
};