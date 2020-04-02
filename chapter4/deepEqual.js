function deepEqual(obj1, obj2) {
  if (typeof obj1 === 'object' && typeof obj2 === 'object') {
    for (const property of Object.keys(obj1)) {
      return deepEqual(obj1[property], obj2[property]);
    }
  }
  return obj1 === obj2;
}

const obj = { here: { is: 'an' }, object: 2 };
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false
console.log(deepEqual(obj, { here: { is: 'an' }, object: 2 }));
// → true
