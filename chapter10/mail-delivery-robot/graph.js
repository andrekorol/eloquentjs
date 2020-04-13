exports.buildGraph = function(edgesArray) {
  /**
   * Builds a graph data object.
   *
   * Creates a graph data object from an array of two-element arrays,
   * consumable by the dijkstrajs module.
   *
   * @param {Array} edgesArray An array of edges. Each edge must be an
   * array of two adjacent nodes.
   *
   * @return {Object} A graph object, with all edges having the same
   * unitary weight.
   */
  const graph = {};
  function addEdge(from, to) {
    if (!Object.keys(graph).includes(from)) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }

  let firstNode;
  let secondNode;
  for (const edge of edgesArray) {
    [firstNode, secondNode] = edge;
    addEdge(firstNode, secondNode);
    addEdge(secondNode, firstNode);
  }

  const weightedGraph = {};
  for (const node of Object.keys(graph)) {
    weightedGraph[node] = {};
    const edges = weightedGraph[node];
    for (const dest of graph[node]) {
      edges[dest] = 1;
    }
  }
  return weightedGraph;
};
