function prepend(element, list) {
  return { value: element, rest: list };
}

function arrayToList(array) {
  let list;
  for (const element of array.reverse()) {
    if (list === undefined) {
      list = prepend(element, null);
    } else {
      list = prepend(element, list);
    }
  }
  return list;
}

function listToArray(list) {
  const array = [];
  for (let node = list; node; node = node.rest) {
    array.push(node.value);
  }
  return array;
}

function nth(list, index) {
  if (index === 0) {
    return list.value;
  }
  return nth(list.rest, index - 1);
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
