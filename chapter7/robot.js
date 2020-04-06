function buildGraph(edges) {
  const graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (const [from, to] of edges.map(r => r.split('-'))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  'Marketplace-Farm',
  'Marketplace-Post Office',
  'Marketplace-Shop',
  'Marketplace-Town Hall',
  'Shop-Town Hall',
];

const roadGraph = buildGraph(roads);

function randomPick(array) {
  const choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return {
    direction: randomPick(roadGraph[state.place]),
  };
}

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    }
    const parcels = this.parcels
      .map(p => {
        if (p.place !== this.place) return p;
        return { place: destination, address: p.address };
      })
      .filter(p => p.place !== p.address);
    return new VillageState(destination, parcels);
  }

  static random(parcelCount = 5) {
    const parcels = [];
    for (let i = 0; i < parcelCount; i += 1) {
      const address = randomPick(Object.keys(roadGraph));
      let place;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place === address);
      parcels.push({ place, address });
    }
    return new VillageState('Post Office', parcels);
  }
}

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn += 1) {
    if (state.parcels.length === 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    const action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}

// runRobot(VillageState.random(), randomRobot);

// console.log(roadGraph);
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

function routeRobot(state, memory) {
  if (memory.length === 0) {
    memory = mailRoute;
  }
  return {
    direction: memory[0],
    memory: memory.slice(1),
  };
}

// runRobot(VillageState.random(), routeRobot, []);

function findRoute(graph, from, to) {
  const work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i += 1) {
    const { at, route } = work[i];
    for (const place of graph[at]) {
      if (place === to) return route.concat(place);
      if (!work.some(w => w.at === place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

function goalOrientedRobot({ place, parcels }, route) {
  if (route.length === 0) {
    const parcel = parcels[0];
    if (parcel.place !== place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}

// runRobot(VillageState.random(), goalOrientedRobot, []);

function countRobotSteps(state, robot, memory) {
  for (let steps = 0; ; steps += 1) {
    if (state.parcels.length === 0) {
      return steps;
    }
    const action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

function compareRobots(robot1, memory1, robot2, memory2) {
  const numTasks = 100;
  let robot1Steps = 0;
  let robot2Steps = 0;
  for (let i = 0; i < numTasks; i += 1) {
    const initialMemory1 = memory1;
    const initialMemory2 = memory2;
    const state = VillageState.random();
    const state1 = state;
    const state2 = state;
    robot1Steps += countRobotSteps(state1, robot1, initialMemory1);
    robot2Steps += countRobotSteps(state2, robot2, initialMemory2);
  }
  console.log(`Robot ${robot1.name} average: ${robot1Steps / numTasks} steps.`);
  console.log(`Robot ${robot2.name} average: ${robot2Steps / numTasks} steps.`);
}

// compareRobots(routeRobot, [], goalOrientedRobot, []);

function smartRobot({ place, parcels }, route) {
  if (route.length === 0) {
    let shortestRoute;
    for (const parcel of parcels) {
      let parcelRoute;
      if (parcel.place !== place) {
        parcelRoute = findRoute(roadGraph, place, parcel.place);
      } else {
        parcelRoute = findRoute(roadGraph, place, parcel.address);
      }
      if (
        typeof shortestRoute === 'undefined' ||
        parcelRoute.length < shortestRoute.length
      ) {
        shortestRoute = parcelRoute;
      }
    }
    route = shortestRoute;
  }
  return { direction: route[0], memory: route.slice(1) };
}

compareRobots(goalOrientedRobot, [], smartRobot, []);

// runRobot(VillageState.random(), smartRobot, []);
