const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// webpack的所有配置信息
module.exports = {
  mode: 'development',
  watch: true,
  optimization: {
    minimize: false,
  },
  entry: './src/webpack.ts',
  devtool: 'inline-source-map',

  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, './static'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack-bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
        },
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpack',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}
