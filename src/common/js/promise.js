function runAsync1() {
  var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    setTimeout(function () {
      console.log('异步任务1执行完成');
      resolve('随便什么数据1');
    }, 1000);
  });
  return p;
}
function runAsync2() {
  var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    setTimeout(function () {
      console.log('异步任务2执行完成');
      resolve('随便什么数据2');
    }, 2000);
  });
  return p;
}
function runAsync3() {
  var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    setTimeout(function () {
      console.log('异步任务3执行完成');
      resolve('随便什么数据3');
    }, 2000);
  });
  return p;
}
function getNumber() {
  var p = new Promise(function (resolve, reject) {
    //做一些异步操作
    setTimeout(function () {
      var num = Math.ceil(Math.random() * 10); //生成1-10的随机数
      num = 8
      if (num <= 5) {
        resolve(num);
      } else {
        reject('数字太大了');
      }
    }, 2000);
  });
  return p;
}

// runAsync1()
//   .then(function(data) {
//     console.log(data);
//     return runAsync2();
//   })
//   .then(function(data) {
//     console.log(data);
//     return '直接返回数据'; //这里直接返回数据
//   })
//   .then(function(data) {
//     console.log(data);
//   });
// getNumber()
//   .then(function(data) {
//     console.log('resolved');
//     console.log(data);
//   })
//   .catch(function(reason) {
//     console.log('rejected');
//     console.log(reason);
//   });
// getNumber()
//   .then(function(data) {
//     console.log('resolved');
//     console.log(data);
//     console.log(somedata); //此处的somedata未定义
//   })
//   .catch(function(reason) {
//     console.log('rejected');
//     console.log(reason);
//   });
Promise
  .all([runAsync1(), runAsync2(), runAsync3()])
  .then(function (results) {
    console.log(results);
  });