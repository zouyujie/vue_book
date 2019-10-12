// 1.导入http内置模块
const http = require('http')
// 2.这个核心模块，能够帮我们解析URL地址，从而拿到pathname 和query等
const urlObj  = require('url')

// 3.创建一个http服务器
const server = http.createServer()
// 4.监听http服务器的request请求
server.on('request', function (req, res) {
  // 使用遗留的 API 解析 URL 字符串
  /**url.parse方法
   * 参数1：要解析的 URL 字符串
   * 如果设为 true，则返回的 URL 对象的 query 属性会是一个使用 querystring 模块的 parse() 生成的对象
   */
  const { pathname: url, query } = urlObj.parse(req.url, true)

  if (url === '/actionScript') {
    // 拼接一个合法的JS脚本，这里拼接的是一个方法的调用
    var data = {
      name: '无痕公子',
      title:'春梦了无痕',
      age: 40,
    }

    var scriptStr = `${query.callback}(${JSON.stringify(data)})`
    // 5.res.end 发送给 客户端，客户端去把这个字符串，当作JS代码去解析执行
    res.end(scriptStr)
  } else {
    res.end('404')
  }
})

// 6.指定端口号并启动服务器监听
server.listen(8000, function () {
  console.log('server listen at http://127.0.0.1:8000')
})