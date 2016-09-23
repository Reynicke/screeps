var cron = require('game.cron');
var gameInfo = require('game.info');
var gameFactory = require('game.factory');

var roleCreep = require('role.creep');
var roleWorker = require('role.worker');
var roleTransporter = require('role.transporter');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleExplorer = require('role.explorer');
var roleInvader = require('role.invader');

var structureTower = require('structure.tower');
var structureLink = require('structure.link');

module.exports.loop = function () {

    // Put objects in global memory
    Memory.gameFactory = gameFactory;
    Memory.gameInfo = gameInfo;

    gameInfo.reset();

    cron.tick();
    
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

    
    // Spawn needed role creeps
    gameFactory.autoSpawn(
        {
            'Spawn1': {
                'worker': {
                    num: 2,
                    body: [WORK, CARRY, CARRY, MOVE, MOVE]
                },

                'miner': {
                    num: 2,
                    body: [WORK, WORK, WORK, WORK, WORK, MOVE]
                },

                'transporter': {
                    num: 3,
                    body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
                },

                'upgrader': {
                    num: 3,
                    body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE]
                },

                'builder': {
                    num: 1,
                    body: [WORK, CARRY, MOVE]
                },

                'explorer': {
                    num: 2,
                    body: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
                    global: true
                },

                'invader': {
                    num: 0,
                    body: [CLAIM, MOVE],
                    global: true
                }
            },
            'Spawn2': {
                'worker': {
                    num: 1,
                    body: [WORK, CARRY, CARRY, MOVE, MOVE]
                },

                'miner': {
                    num: 1,
                    body: [WORK, WORK, WORK, WORK, WORK, MOVE]
                },

                'builder': {
                    num: 1,
                    body: [WORK, CARRY, MOVE]
                },

                'transporter': {
                    num: 1,
                    body: [CARRY, CARRY, CARRY, MOVE, MOVE]
                },

                'upgrader': {
                    num: 2,
                    body: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE]
                },
                
                'explorer': {
                    num: 3,
                    body: [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
                    global: true
                }
            }
        }
    );
    

    //Memory.gameFactory.spawnCreep([MOVE], 'explorer');
    //Memory.gameFactory.spawnCreep([CLAIM, MOVE], 'invader');
};