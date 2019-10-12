// 导入处理路径的模块
const path = require("path");
// 导入自动生成HTMl文件的插件
var htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// 导出一个配置对象
module.exports = {
  // 项目入口文件
  entry: path.join(__dirname, "./src/main.js"),
  output: {
    // 配置输出选项
    path: path.join(__dirname, "./dist"), // 配置输出的路径
    filename: "bundle.js" // 配置输出的文件名
  },
  devServer: {
    // 这是配置 dev-server 命令参数的第二种方式
    // --open --port 3000 --contentBase src --hot
    open: true, // 自动打开浏览器
    port: 3000, // 设置启动时候的运行端口
    contentBase: "src", // 指定托管的根目录
    hot: true // 启用热更新
  },
  plugins: [
    // 配置插件的节点
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(), // new一个热更新的模块对象
    new htmlWebpackPlugin({ // 创建一个在内存中生成HTML页面的插件
      template: path.join(__dirname, './src/index.html'), // 指定模板页面，将来会根据指定的页面路径，去生成内存中的页面
      filename: 'index.html' // 指定生成的页面的名称
    })
  ],
  module: { // 这个节点用于配置所有第三方模块加载器 
    rules: [ // 配置所有第三方模块的匹配规则
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }, //配置处理.css文件的第三方loader 规则
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, //配置处理 .less 文件的第三方 loader 规则
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 配置处理 .scss 文件的第三方 loader 规则
      { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=31606&name=[name]-[hash:6].[ext]'},// 处理url图片路径的loader &name=[name]-[hash:6].[ext]
      { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理字体文件的 loader 
      { test:/\.js$/, use: 'babel-loader', exclude:/node_modules/ }, // 配置 Babel 来转换高级的ES语法
      { test: /\.vue$/, use: 'vue-loader' } // 处理 .vue 文件的 loader
    ]
  },
  resolve: {
    alias: { // 修改 Vue 被导入时候的包的路径
      // 'vue$': 'vue/dist/vue.esm.js'
    }
   },
  mode: "development" // 模式配置
};
