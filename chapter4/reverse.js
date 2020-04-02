function reverseArray(array) {
  const result = [];
  for (let i = array.length - 1; i >= 0; i -= 1) {
    result.push(array[i]);
  }
  return result;
}

function reverseArrayInPlace(array) {
  const len = array.length;
  for (let i = 0; i <= Math.floor(len / 2); i += 1) {
    const tmp = array[i];
    array[i] = array[len - 1 - i];
    array[len - 1 - i] = tmp;
  }
}

console.log(reverseArray(['A', 'B', 'C']));
// → ["C", "B", "A"];
const arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
