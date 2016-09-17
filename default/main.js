var cron = require('game.cron');
var gameInfo = require('game.info');
var gameFactory = require('game.factory');

var roleWorker = require('role.worker');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleExplorer = require('role.explorer');
var roleInvader = require('role.invader');

var roleTower = require('role.tower');

module.exports.loop = function () {

    // Put objects in global memory
    Memory.gameFactory = gameFactory;
    Memory.gameInfo = gameInfo;

    gameInfo.reset();

    cron.tick();


    // Creep loop
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        gameInfo.registerCreep(creep);

        switch (creep.memory.role) {
            case 'worker':
                roleWorker.run(creep);
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
            case 'invader':
                roleInvader.run(creep);
                break;
        }
    }

    // Structure loop
    for (var name in Game.structures) {
        var structure = Game.structures[name];

        switch (structure.structureType) {
            case STRUCTURE_TOWER:
                roleTower.run(structure);
                break;
        }
    }

    
    // Spawn needed role creeps
    gameFactory.autoSpawn(
        {
            'worker': {
                num: 4,
                body: [WORK, CARRY, CARRY, MOVE, MOVE]
            },
            
            'upgrader': {
                num: 6,
                body: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE]
            },
            
            'builder': {
                num: 1,
                body: [WORK, CARRY, MOVE, MOVE]
            },
            
            'miner': {
                num: 2,
                body: [WORK, WORK, WORK, MOVE]
            }
        }
    );
    

    //Memory.gameFactory.spawnCreep([MOVE], 'explorer');
    //Memory.gameFactory.spawnCreep([CLAIM, MOVE], 'invader');
};