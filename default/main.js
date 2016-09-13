var gameInfo = require('game.info');
var gameFactory = require('game.factory');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {

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

        switch (creep.memory.role) {
            case 'harvester':
                roleHarvester.run(creep);
                break;
            case 'upgrader':
                roleUpgrader.run(creep);
                break;
            case 'builder':
                roleBuilder.run(creep);
        }
    }

    if (gameInfo.getRoleCount('harvester') < 6) {
        /*var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], 'har_' + Math.random(), {role: 'harvester'});
         if (isNaN(newName)) {
         console.log('new harvester: ' + newName);
         }*/
        gameFactory.spawnCreep([WORK, CARRY, MOVE, MOVE], 'harvester');
    }


    if (gameInfo.getRoleCount('upgrader') < 1) {
        /*var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'upgrader'});
        if (isNaN(newName)) {
            console.log('new upgrader: ' + newName);
        }*/

        gameFactory.spawnCreep([WORK, CARRY, MOVE, MOVE], 'upgrader');
    }


    if (gameInfo.getRoleCount('builder') < 2) {
        /*var newName = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE, MOVE], undefined, {role: 'builder'});
        if (isNaN(newName)) {
            console.log('new builder: ' + newName);
        }*/

        gameFactory.spawnCreep([WORK, CARRY, MOVE, MOVE], 'builder');
    }
};