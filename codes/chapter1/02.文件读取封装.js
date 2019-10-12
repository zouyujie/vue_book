const fs=require('fs')
const path=require('path')
/**
 * 读取指定路径的文件
 * @param {*} path ：文件路径
 * @param {*} succCb ：读取成功的回调
 * @param {*} errCb ：读取失败的回调
 */
function getFileByPath(path, succCb, errCb) {
    fs.readFile(path, 'utf-8', (error, data) => {
      if (error) return errCb(error)
      succCb(data)
    })
  }

//调用操作
getFileByPath(path.join(__dirname, './files/text.txt'), function (data) {
  console.log('数据读取成功：'+data)
}, function (error) {
  console.log('数据读取失败：' + err.message)
})

// 先读取文件text.txt，再读取文件text2.txt，最后再读取文件text3.txt。
getFileByPath(path.join(__dirname, './files/text.txt'), function (data) {
    console.log('text.txt:'+data)
    getFileByPath(path.join(__dirname, './files/text2.txt'), function (data) {
      console.log('text2.txt:'+data)
      getFileByPath(path.join(__dirname, './files/text3.txt'), function (data) {
        console.log('text3.txt:'+data)
      })
    })
  })