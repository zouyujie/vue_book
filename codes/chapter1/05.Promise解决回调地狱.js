const fs=require('fs')
const path=require('path')

function getFileByPath(path) {
    return new Promise(function (resolve, reject) {
      fs.readFile(path, 'utf-8', (error, data) => {
        if (error) return reject(error)
        resolve(data)
      })
    })
  }
// 1.如果前面的 Promise 执行失败，我们不想让后续的Promise 操作被终止，可以为每个 promise 指定失败的回调
//  getFileByPath('./files/text.txt')
//   .then(function (data) {
//     console.log('text.txt:'+data)
//     return getFileByPath('./files/text1.txt')
//   }, function (err) {
//     console.log('读取失败：' + err.message)
//     // return 一个新的 Promise
//     return getFileByPath('./files/text2.txt')
//   })
//   .then(function (data) {
//     console.log('text2.txt:'+data)
//     return getFileByPath('./files/text3.txt')
//   },function (err) {
//     console.log('读取失败：' + err.message)
//     return getFileByPath('./files/text3.txt')
//   })
//   .then(function (data) {
//     console.log('text3.txt:'+data)
//   }).then(function (data) {
//     console.log(data)
//   }) 
 // 2.如果前面有任何的 Promise 执行失败，则立即终止所有 promise 的执行，并马上进入catch 去处理 Promise中 抛出的异常；
  getFileByPath('./files/text.txt')
  .then(function (data) {
    console.log(data)
    return getFileByPath('./files/text1.txt')
  })
  .then(function (data) {
    console.log(data)
    return getFileByPath('./files/text2.txt')
  })
  .then(function (data) {
    console.log(data)
  })
  .catch(function (err) { 
    console.log('捕获到了异常：' + err.message)
  })