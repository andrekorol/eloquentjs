function loop(value, test, update, body) {
  let current = value;
  while (test(current)) {
    body(current);
    current = update(current);
  }
}

loop(
  3,
  n => n > 0,
  n => n - 1,
  console.log
);
// → 3
// → 2
// → 1
