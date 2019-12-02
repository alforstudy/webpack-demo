const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports =  {
  plugins: [
    new UglifyJSPlugin({
      test: /\.js(\?.*)?$/i,  //测试匹配文件,
      include: /\/src/, //包含哪些文件
      excluce: /\/node_modules/, //不包含哪些文件
      chunkFilter: (chunk) => {
            // `vendor` 模块不压缩
            // chunk 指的是一个入口文件对应的出口文件
            if (chunk.name === 'vendor') {
              return false;
            }
            return true;
      },
      cache: false,   //是否启用文件缓存，默认缓存在node_modules/.cache/uglifyjs-webpack-plugin.目录
      parallel: true,  //使用多进程并行运行来提高构建速度
    })
  ]
}