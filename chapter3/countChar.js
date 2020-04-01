function countChar(string, char) {
  let counter = 0;
  for (let i = 0; i < string.length; i += 1) {
    if (string[i] === char) {
      counter += 1;
    }
  }
  return counter;
}

function countBs(string) {
  return countChar(string, 'B');
}

console.log(countBs('BBC'));
// → 2
console.log(countChar('kakkerlak', 'k'));
// → 4
