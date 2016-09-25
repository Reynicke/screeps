var cron = require('game.cron');
var gameInfo = require('game.info');
var gameFactory = require('game.factory');
var gameManager = require('game.manager');

var roleCreep = require('role.creep');
var roleWorker = require('role.worker');
var roleTransporter = require('role.transporter');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleExplorer = require('role.explorer');
var roleImporter = require('role.importer');
var roleInvader = require('role.invader');

var structureTower = require('structure.tower');
var structureLink = require('structure.link');

module.exports.loop = function () {

    // Put objects in global memory
    Memory.gameFactory = gameFactory;
    Memory.gameInfo = gameInfo;
    Memory.gameManager = gameManager;

    gameInfo.reset();
    cron.tick();
    gameManager.run();

    if (cron.isItTime(1)) {
        gameInfo.suggestRoads();
    }

    // Creep loop
    for (let name in Game.creeps) {
        var creep = Game.creeps[name];
        gameInfo.registerCreep(creep);

        // Do generic creep action
        let target = roleCreep.run(creep);
        if (target) {
            continue;
        }

        // Do role specific actions
        switch (creep.memory.role) {
            case 'worker':
                roleWorker.run(creep);
                break;
            case 'transporter':
                roleTransporter.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
                break;
            case 'miner':
                roleMiner.run(creep);
                break;
            case 'explorer':
                roleExplorer.run(creep);
                break;
            case 'importer':
                roleImporter.run(creep);
                break;
            case 'invader':
                roleInvader.run(creep);
                break;
        }
    }

    // Structure loop
    for (let name in Game.structures) {
        var structure = Game.structures[name];

        switch (structure.structureType) {
            case STRUCTURE_TOWER:
                structureTower.run(structure);
                break;
            case STRUCTURE_LINK:
                structureLink.run(structure);
                break;
        }
    }

    // Define creep demand
    gameFactory.autoSpawn(
        {
            'Spawn1': {
                'worker': 2,
                'miner': 2,
                'transporter': gameInfo.roomHasConstructionSite(Game.spawns['Spawn1'].room) ? 3 : 2,
                'upgrader': 3,
                'builder': 1,
                'importer': 4,
                'explorer': 2,
                'invader': 0
            },
            'Spawn2': {
                'worker': 1,
                'miner': 1,
                'builder': 1,
                'transporter': 1,
                'upgrader': 2,
                'explorer': 2,
                'importer': 3
            }
        }
    );

    
    //Memory.gameFactory.spawnCreep([MOVE], 'explorer');
    //Memory.gameFactory.spawnCreep([CLAIM, MOVE], 'invader');
};