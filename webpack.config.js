// @flow

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const pathToBuild = path.resolve(__dirname, 'build');

const __DEV__ = process.env.NODE_ENV === 'development';

module.exports = {
  entry: path.resolve(__dirname, './src/client.js'),
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: pathToBuild,
    port: 3000,
    hot: true,
  },
  output: {
    path: pathToBuild,
    filename: 'main.js',
    // publicPath: path.resolve(__dirname, './public/assets'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          __DEV__ ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[sha1:hash:hex:4]',
            },
          },
          'sass-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(pathToBuild, {}),
    new MiniCssExtractPlugin({ filename: 'style.css' }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: path.resolve(__dirname, './public/index.html'),
      filename: 'index.html',
    }),
  ],
};
