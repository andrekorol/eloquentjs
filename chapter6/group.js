class GroupIterator {
  constructor(groupArray) {
    this.counter = 0;
    this.group = groupArray;
    this.size = this.group.length;
  }

  next() {
    if (this.counter === this.size) return { done: true };
    const value = this.group[this.counter];
    this.counter += 1;
    return { value, done: false };
  }
}

class Group {
  constructor() {
    this.group = [];
  }

  add(value) {
    if (this.group.indexOf(value) === -1) {
      this.group.push(value);
    }
  }

  delete(value) {
    const index = this.group.indexOf(value);
    if (index !== -1) {
      this.group.splice(index, 1);
    }
  }

  has(value) {
    return this.group.indexOf(value) !== -1;
  }

  static from(iterable) {
    const newGroup = new Group();
    for (const value of iterable) {
      newGroup.add(value);
    }
    return newGroup;
  }

  [Symbol.iterator]() {
    return new GroupIterator(this.group);
  }
}

const group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

for (const value of Group.from(['a', 'b', 'c'])) {
  console.log(value);
}
// → a
// → b
// → c
