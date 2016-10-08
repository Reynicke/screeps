var gameInfo = require('game_info');

var roleWorker = require('creep_role_worker');
var roleTransporter = require('creep_role_transporter');
var roleUpgrader = require('creep_role_upgrader');
var roleBuilder = require('creep_role_builder');
var roleMiner = require('creep_role_miner');
var roleExplorer = require('creep_role_explorer');
var roleImporter = require('creep_role_importer');
var roleInvader = require('creep_role_invader');
var roleSword = require('creep_role_sword');

var creep = {

    /**
     * Handles actions of every creep
     */
    loop: function () {
        // Creep loop
        for (let name in Game.creeps) {
            var creep = Game.creeps[name];
            gameInfo.registerCreep(creep);

            // Do generic creep action
            let target = this.run(creep);
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
                case 'sword':
                    roleSword.run(creep);
                    break;
            }
        }
    },

    /**
     * Generic creep routine, common to all creeps
     * 
     * @param {Creep} creep
     * @returns null | {RoomObject}
     */
    run: function (creep) {

        // If creep dies
        if (creep.ticksToLive <= 2) {
            Memory.creeps[creep.name] = undefined;
            creep.say('Oh no!');
            return null;
        }

        // Check if there is a flag with creeps name or it's role
        var myFlag = Game.flags[creep.name] || Game.flags[creep.memory.role];
        if (myFlag) {
            creep.moveTo(myFlag, {reusePath: 5});
            return myFlag;
        }

        // Check if creep is bound to it's spawn room
        // Return to room if it wandered to far
        var homeSpawn = Game.spawns[creep.memory.spawn];
        if (!creep.memory.wanderer && creep.pos.roomName != homeSpawn.pos.roomName) {
            creep.moveTo(homeSpawn, {reusePath: 10});
            return homeSpawn;
        }

        // If creep is not a full energy capacity, check if there is energy lying around nearby
        if (creep.carry.energy < creep.carryCapacity) {
            var droppedEnergy = this.findCloseDroppedEnergy(creep);
            if (droppedEnergy && creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                creep.say('bling!');
                creep.moveTo(droppedEnergy, {reusePath: 10});
                return droppedEnergy;
            }
        }

        return null;
    },

    findCloseDroppedEnergy: function (creep) {
        var maxRange = 8;
        var minAmount = 25;

        return creep.pos.findClosestByPath(
            FIND_DROPPED_ENERGY,
            {
                filter: (e) => {
                    return creep.pos.getRangeTo(e.pos) < maxRange && e.energy >= minAmount;
                }
            }
        );
    }
};

module.exports = creep;