const fs=require('fs')

 function getFileByPath(path) {
    return  new Promise(function (resolve, reject) {
      fs.readFile(path, 'utf-8', (error, data) => {
        if (error) return reject(error)
        resolve(data)
      })
    })
  }

  async function getAllFile(){
    await getFileByPath('./files/text.txt').then(function (data) { console.log('text.txt:'+data)});
    await getFileByPath('./files/text2.txt').then(function (data) { console.log('text2.txt:'+data)});
    await getFileByPath('./files/text3.txt').then(function (data) { console.log('text3.txt:'+data)});
  }
 //调用
  getAllFile()