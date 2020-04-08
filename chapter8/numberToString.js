function numberToString(n, base = 10) {
  let num = n;
  let result = '';
  let sign = '';
  if (num < 0) {
    sign = '-';
    num = -num;
  }
  do {
    debugger;
    result = String(n % base) + result;
    num /= base;
  } while (num > 0);
  return sign + result;
}
console.log(numberToString(13, 10));
// → 1.5e-3231.3e-3221.3e-3211.3e-3201.3e-3191.3e-3181.3…
