var gameInfo = require('game.info');
var gameFactory = require('game.factory');
var roleWorker = require('role.worker');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');

module.exports.loop = function () {

    // Put objects in global memory
    Memory.gameFactory = gameFactory;
    Memory.gameInfo = gameInfo;

    gameInfo.reset();
    

    /*var tower = Game.getObjectById('dd8dd33fd29d2fb97e9e5447');
     if(tower) {
     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
     filter: (structure) => structure.hits < structure.hitsMax
     });
     if(closestDamagedStructure) {
     tower.repair(closestDamagedStructure);
     }

     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
     if(closestHostile) {
     tower.attack(closestHostile);
     }
     }*/

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

    if (gameInfo.getRoleCount('worker') < 6 ) {
        /*var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], 'har_' + Math.random(), {role: 'harvester'});
         if (isNaN(newName)) {
         console.log('new harvester: ' + newName);
         }*/
        gameFactory.spawnCreep([WORK, CARRY, MOVE, MOVE], 'worker');
    }


    if (gameInfo.getRoleCount('upgrader') < 3) {
        gameFactory.spawnCreep([WORK, CARRY, MOVE, MOVE], 'upgrader');
    }


    if (gameInfo.getRoleCount('builder') < 2) {
        gameFactory.spawnCreep([WORK, CARRY, MOVE, MOVE], 'builder');
    }

    if (gameInfo.getRoleCount('miner') < 1) {
        gameFactory.spawnCreep([WORK, WORK, WORK, MOVE], 'miner');
    }
};