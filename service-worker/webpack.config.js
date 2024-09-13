const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    main: './src/index.ts', // 第一个入口
    ['service-worker']: './src/service-worker.ts', // 第二个入口
  },
  output: {
    filename: ({hash, runtime}) => {
      if(runtime === 'service-worker') {
        return 'service-worker.js'
      }
      return `${runtime}-${hash}.js`
    },
    path: path.resolve(__dirname, 'dist'), // 输出目录
    clean: true, // 清理输出目录
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
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
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['main'],
      inject: true,
    }),
  ],
  devServer :{
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3131,
    hot: true,
  }
}

module.exports = webpackConfig
