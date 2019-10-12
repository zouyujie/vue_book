// 这里 new 出来的 promise， 只是代表一个异步操作,至于它是做什么具体的异步事情，目前还不清楚
// var promise = new Promise();

// 这是一个具体的异步操作，使用 function 指定一个具体的异步操作
 var promise = new Promise(function(){
  // 这个 function 内部写的就是具体的异步操作！
}) 