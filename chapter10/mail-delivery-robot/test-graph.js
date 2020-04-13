const { buildGraph } = require('./graph');

const arr = [
  ['home', 'mall'],
  ['church', 'theater'],
];
const graph = buildGraph(arr);

console.log(graph);
