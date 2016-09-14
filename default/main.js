var cron = require ('game.cron');
var gameInfo = require('game.info');
var gameFactory = require('game.factory');
var roleWorker = require('role.worker');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
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
            case 'harvester':
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
    

    if (gameInfo.getRoleCount('worker') < 6 ) {
        gameFactory.spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE, MOVE], 'worker');
    }

    if (gameInfo.getRoleCount('upgrader') < 3) {
        gameFactory.spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], 'upgrader');
    }

    if (gameInfo.getRoleCount('builder') < 2) {
        gameFactory.spawnCreep([WORK, CARRY, MOVE, MOVE, MOVE], 'builder');
    }

    if (gameInfo.getRoleCount('miner') < 2) {
        gameFactory.spawnCreep([WORK, WORK, WORK, MOVE], 'miner');
    }
};