const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const outputPath = path.resolve(process.cwd(), 'dist');
const templateHtmlPath = path.resolve(process.cwd(), 'src/index.html');

const merge = require('webpack-merge');
const customConfig = require(process.env.NODE_ENV === 'production'? './webpcak.prod.js':'./webpack.dev.js');


module.exports =  merge(customConfig, {
  entry: {
    app:'./src/main/index.js'
  },
  output: {
    filename:'main.js',
    path: outputPath
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader','css-loader']
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader',{
            loader:'postcss-loader',
            options:{
              path: './postcss.config.js'
            }
          }],
          publicPath: 'css'//这里的配置由于plugins里的配置而失效
        })
      },{
        test: /\.(jpg|png|svg|gif)$/,
        use:[{
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            context:'src',
            publicPath:function(url){//返回最终的资源相对路径
                return path.relative(outputPath,url).replace(/\\/g,'/');
            }
          }
        }]
      },{
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename:(getPath)=>{
        // 这里会覆盖publicPath的配置 所以 可以在这里指定公共目录
        return getPath('css/[name]-[sha256:contenthash:hex:5].css')
      }
    }),
    new HtmlWebpackPlugin({
      title:'webpack-demo',
      template: templateHtmlPath
    }),
    new CleanWebpackPlugin(),
  ]
})