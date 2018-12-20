const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const libName = 'grammas-kitchen';

module.exports = ((env = {}) => {
  return {
    mode: 'development',
    entry: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://0.0.0.0:8000',
      'webpack/hot/only-dev-server',
      './src/index.tsx',
    ],
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development'),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.less$/,
          loader: [
            { loader: 'style-loader' },
            { loader: 'css-loader?sourceMap=true' },
            { loader: 'less-loader?sourceMap=true' },
          ],
        },
        {
          test: /favicon\.ico$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[hash].[ext]',
            },
          },
        },
      ],
    },
    resolve: {
      modules: [path.resolve('./src'), path.resolve('./node_modules')],
      extensions: ['.ts', '.tsx', '.js'],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/static/',
    },
    devtool: 'inline-source-map',
    devServer: {
      host: '0.0.0.0',
      port: 8000,
      historyApiFallback: true,
      hot: true,
      progress: true,
    },
  };
})();
