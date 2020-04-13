const { find_path } = require('dijkstrajs');
const randomItem = require('random-item');
const { VillageState, runRobot } = require('./state');

exports.randomRobot = function(state) {
  // console.log(Object.keys(state.graph[state.place]));
  return {
    direction: randomItem(Object.keys(state.graph[state.place])),
  };
};

const mailRoute = [
  "Alice's House",
  'Cabin',
  "Alice's House",
  "Bob's House",
  'Town Hall',
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  'Shop',
  "Grete's House",
  'Farm',
  'Marketplace',
  'Post Office',
];

exports.routeRobot = function(state, memory) {
  if (memory.length === 0) {
    memory = mailRoute;
  }
  return {
    direction: memory[0],
    memory: memory.slice(1),
  };
};

exports.goalOrientedRobot = function(state, route) {
  if (route.length === 0) {
    const parcel = state.parcels[0];
    if (parcel.place !== state.place) {
      route = find_path(state.graph, state.place, parcel.place);
    } else {
      route = find_path(state.graph, state.place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
};
