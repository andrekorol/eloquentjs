function getDate(string) {
  const [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
  return new Date(year, month - 1, day);
}

const date = getDate('4-16-1997');
console.log(date);
console.log(date.getTime());
