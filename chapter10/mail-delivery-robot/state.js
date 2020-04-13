const randomItem = require('random-item');
const { roadGraph } = require('./roads');

class VillageState {
  constructor(place, parcels, graph) {
    this.place = place;
    this.parcels = parcels;
    this.graph = graph;
  }

  move(destination) {
    if (!Object.keys(this.graph[this.place]).includes(destination)) {
      return this;
    }
    const parcels = this.parcels
      .map(p => {
        if (p.place !== this.place) return p;
        return { place: destination, address: p.address };
      })
      .filter(p => p.place !== p.address);
    return new VillageState(destination, parcels, this.graph);
  }

  static random(parcelCount = 5) {
    const parcels = [];
    for (let i = 0; i < parcelCount; i += 1) {
      const address = randomItem(Object.keys(roadGraph));
      let place;
      do {
        place = randomItem(Object.keys(roadGraph));
      } while (place === address);
      parcels.push({ place, address });
    }
    return new VillageState('Post Office', parcels, roadGraph);
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

exports.VillageState = VillageState;
exports.runRobot = runRobot;
