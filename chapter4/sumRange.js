function range(start, end, step = 1) {
  const array = [];
  if (step === 0) {
    return undefined;
  }
  if (step < 0) {
    if (end < start) {
      for (let i = start; i >= end; i += step) {
        array.push(i);
      }
    } else {
      return undefined;
    }
  } else {
    for (let i = start; i <= end; i += step) {
      array.push(i);
    }
  }
  return array;
}

function sum(array) {
  let result = 0;
  for (const element of array) {
    result += element;
  }
  return result;
}

console.log(range(1, 3, 0));
console.log(range(10, 20, -3));
console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55
