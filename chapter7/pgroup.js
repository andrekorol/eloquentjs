class PGroup {
  constructor(array) {
    this.array = array;
  }

  add(value) {
    return new PGroup(this.array.concat(value));
  }

  delete(value) {
    return new PGroup(this.array.filter(element => element !== value));
  }

  has(value) {
    return this.array.indexOf(value) !== -1;
  }
}

PGroup.empty = new PGroup([]);

const a = PGroup.empty.add('a');
// console.log(a);
const ab = a.add('b');
// console.log(ab);
const b = ab.delete('a');
// console.log(b);

console.log(b.has('b'));
// → true
console.log(a.has('b'));
// → false
console.log(b.has('a'));
// → false
