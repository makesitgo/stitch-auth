const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin')

const libName = 'stitch-auth';

module.exports = (env = {}) => ({
  mode: 'production',
  entry: ['./src/index.tsx'],
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.PUBLIC_URL': JSON.stringify('/stitch-auth'),
    }),
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma: 6,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      { test: /\.svg/, use: 'svg-url-loader' },
      {
        test: /\.png$/,
        use: 'url-loader?limit=10000&mimetype=image/png',
      },
      {
        test: /.(png|jpg|jpeg|gif|woff|woff2|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[hash].[ext]',
            limit: 10000,
            publicPath: '/static/',
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader?sourceMap=true', 'less-loader?sourceMap=true'],
      },
      {
        test: /favicon\.ico$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  output: {
    path: `${__dirname}/dist/static`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  devtool: 'cheap-source-map',
});
