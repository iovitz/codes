const path = require('node:path')
const process = require('node:process')

const isWeb = process.env.SCINE === 'web'
const isNode = !isWeb

const webpackConfig = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  externals: [],
  plugins: [],
}

if (isWeb) {
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  // 增加Web端devServer配置
  webpackConfig.devServer = {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3131,
    hot: true,
  }
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      inject: true,
    }),
  )
}
else if (isNode) {
  const nodeExternals = require('webpack-node-externals')
  webpackConfig.target = 'node'
  webpackConfig.externals.push(nodeExternals())
}

module.exports = webpackConfig
