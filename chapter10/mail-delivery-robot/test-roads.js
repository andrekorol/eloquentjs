const { find_path } = require('dijkstrajs');
const { roadGraph } = require('./roads');

console.log(find_path(roadGraph, 'Post Office', 'Cabin'));
