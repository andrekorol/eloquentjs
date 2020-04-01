function isEven(n) {
  let num = n;
  if (num < 0) {
    num *= -1;
  }

  if (num === 0) {
    return true;
  }
  if (num === 1) {
    return false;
  }

  return isEven(num - 2);
}

console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → false
console.log(isEven(-4));
// → true
