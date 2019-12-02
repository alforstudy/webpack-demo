const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');


module.exports =  {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: '10080'
  },
  plugins: [
    new ProgressBarWebpackPlugin()
  ]
}