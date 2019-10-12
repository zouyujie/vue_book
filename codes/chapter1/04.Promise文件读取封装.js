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

   getFileByPath('./files/text.txt')
  .then(function (data) {
    console.log('text.txt:'+data)
  }, function (err) {
    console.log(err.message)
  }) 