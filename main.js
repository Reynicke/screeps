var cron = require('game_cron');
var gameInfo = require('game_info');
var gameFactory = require('game_factory');
var gameManager = require('game_manager');

var creep = require('creep');
var structure = require('structure');

module.exports.loop = function () {

    // Put objects in global memory
    Memory.gameFactory = gameFactory;
    Memory.gameInfo = gameInfo;
    Memory.gameManager = gameManager;

    gameInfo.reset();
    cron.tick();
    gameManager.run();

    // Handle creep and structure actions
    creep.loop();
    structure.loop();
    
    // Define creep demand
    gameFactory.autoSpawn(
        {
            'Spawn1': {
                'worker': 2,
                'miner': 2,
                'transporter': gameInfo.roomHasConstructionSite(Game.spawns['Spawn1'].room) ? 3 : 2,
                'upgrader': 3,
                'builder': 1,
                'importer': 3,
                'explorer': 3,
                'invader': 0,
                'sword': 0
            },
            'Spawn2': {
                'worker': 1,
                'miner': 1,
                'builder': 1,
                'transporter': 1,
                'upgrader': 2,
                'explorer': 2,
                'importer': 2,
                'invader': 0,
                'sword': 0
            }
        }
    );

    if (cron.every(100)) {
        gameInfo.suggestRoads();
    }
};