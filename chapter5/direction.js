const SCRIPTS = require('./scripts');

function countBy(items, groupName) {
  const counts = [];
  for (const item of items) {
    const name = groupName(item);
    const known = counts.findIndex(c => c.name === name);
    if (known === -1) {
      counts.push({
        name,
        count: 1,
      });
    } else {
      counts[known].count += 1;
    }
  }
  return counts;
}

function characterScript(code) {
  for (const script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => code >= from && code < to)) {
      return script;
    }
  }
  return null;
}

function dominantDirection(text) {
  const direction = countBy(text, char => {
    const script = characterScript(char.codePointAt(0));
    return script ? script.direction : 'none';
  })
    .filter(({ name }) => name !== 'none')
    .reduce((dir1, dir2) => (dir1.count > dir2.count ? dir1 : dir2));
  return direction.name;
}

// console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
// // → [{name: false, count: 2}, {name: true, count: 3}]

// console.log(characterScript(121));
// // → {name: "Latin", …}

console.log(dominantDirection('Hello!'));
// → ltr
console.log(dominantDirection('Hey, مساء الخير'));
// → rtl
