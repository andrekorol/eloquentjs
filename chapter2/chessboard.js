const size = 8;
let board = '';

for (let i = 0; i < size; i += 1) {
  for (let j = 0; j < size; j += 1) {
    if (i % 2 === 0) {
      if (j % 2 === 0) {
        board += ' ';
      } else {
        board += '#';
      }
    } else if (j % 2 === 0) {
      board += '#';
    } else {
      board += ' ';
    }
  }
  board += '\n';
}

console.log(board);
