const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  plugins: [
    // 在构建之前将dist文件夹清理掉
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./dist'],
    }),
    // 指定HTML模板, 插件会将构建好的js文件自动插入到HTML文件中
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  devServer: {
    // 不启动压缩
    compress: false,
    host: 'localhost',
    port: 5000,
  },
}
