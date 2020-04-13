const robots = require('./example-robots');
const { VillageState, runRobot } = require('./state');

// runRobot(VillageState.random(), robots.randomRobot);
// runRobot(VillageState.random(), robots.routeRobot, []);
runRobot(VillageState.random(), robots.goalOrientedRobot, []);
