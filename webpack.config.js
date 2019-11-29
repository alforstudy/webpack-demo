const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports =  {
  entry: './src/index.js',
  output: {
    filename:'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader','css-loader']
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader','postcss-loader'],
          publicPath: 'css'//这里的配置由于plugins里的配置而失效
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename:(getPath)=>{
        // 这里会覆盖publicPath的配置 所以 可以在这里指定公共目录
        return getPath('css/[name]-[sha256:contenthash:hex:5].css')
      }
    })
  ]
}