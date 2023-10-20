const path = require('path')

module.exports = {
  //指定入口文件
  entry: './index.ts',
  //指定打包文件所在目录
  output: {
    //指定打包文件所在目录
    path: path.resolve(__dirname, 'dist'),
    //打包后的文件名
    filename: 'bundle.js',
  },
  watch: true,
  mode: 'development',
  module: {
    // 指定要加载的规则
    rules: [
      {
        //test 指定的时规则生效的文件
        test: /\.ts$/,
        //要使用的loader
        use: 'ts-loader',
        //要排除的文件
        exclude: /node_modules/,
      },
    ],
  },
}
