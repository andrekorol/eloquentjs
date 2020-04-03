const arrays = [[1, 2, 3], [4, 5], [6]];
console.log(arrays.reduce((array1, array2) => array1.concat(array2)));
// → [1, 2, 3, 4, 5, 6]
