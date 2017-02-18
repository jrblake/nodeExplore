console.log('Starting App');

//first function is called a callback function
setTimeout(() => {
  console.log('Inside of Callback');
}, 2000);

setTimeout(() => {
  console.log('Inside of Callback 2');
}, 0);

console.log('Finishing App');