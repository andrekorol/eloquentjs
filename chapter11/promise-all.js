function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    const array = new Array(promises.length).fill(0);
    if (promises.length === 0) resolve(array);
    let counter = promises.length;
    for (let i = 0; i < promises.length; i += 1) {
      promises[i]
        .then(value => {
          array[i] = value;
          counter -= 1;
          if (counter === 0) {
            resolve(array);
          }
        })
        .catch(failure => reject(failure));
    }
  });
}

// Test code.
Promise_all([]).then(array => {
  console.log('This should be []:', array);
});

function soon(val) {
  return new Promise(resolve => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}
Promise_all([soon(1), soon(2), soon(3)]).then(array => {
  console.log('This should be [1, 2, 3]:', array);
});
Promise_all([soon(1), Promise.reject(new Error('X')), soon(3)])
  .then(array => {
    console.log('We should not get here');
  })
  .catch(error => {
    if (error !== 'X') {
      console.log('Unexpected failure:', error);
    }
  });
