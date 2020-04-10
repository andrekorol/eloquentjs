// Fill in this regular expression.
const number = /^[-+]?((\d+(\.\d*)?)|(\.\d+))(e[-+]?\d*)?$/i;

// Tests:
for (const str of [
  '1',
  '-1',
  '+15',
  '1.55',
  '.5',
  '5.',
  '1.3e2',
  '1E-4',
  '1e+12',
]) {
  if (!number.test(str)) {
    console.log(`Failed to match '${str}'`);
  }
}
for (const str of ['1a', '+-1', '1.2.3', '1+1', '1e4.5', '.5.', '1f5', '.']) {
  if (number.test(str)) {
    console.log(`Incorrectly accepted '${str}'`);
  }
}
