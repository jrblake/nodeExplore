var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject('Arguments Must Be Numbers');
      }
    }, 1500);
  });
};

asyncAdd(8, 5).then((res) => {
  console.log('Result: ', res);
  return asyncAdd((res), 33);
}).then((res) => {
  console.log('Should Be: ', res);
}).catch((errorMessage) => {
  console.log(errorMessage);
});

// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('Hey. It Worked!');
//     //reject('Unable to Fulfill Request');
//   }, 2500);
// });

// somePromise.then((message) => {
//   console.log('Success: ', message);
// }, (errorMessage) => {
//   console.log('Error: ', errorMessage);
// });
