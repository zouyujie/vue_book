const fs=require('fs')
const path=require('path')

// 这是普通读取文件的方式
fs.readFile(path.join(__dirname, './files/text.txt'), 'utf-8', (err, data) => {
  if (err) throw err
  console.log('读取数据：'+data)
}) 