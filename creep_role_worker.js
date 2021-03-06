var harvestAction = require('creep_action_harvest');
var deliverAction = require('creep_action_deliverEnergy');
var upgradeAction = require('creep_action_upgradeController');
var buildAction = require('creep_action_build');

var roleWorker = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.memory.working && creep.carry.energy == 0) {
            creep.memory.working = false;
            creep.say('harvesting');
        }
        if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
            creep.say('working');
        }

        if (creep.memory.working) {
            var target = buildAction.do(creep) || deliverAction.do(creep) || upgradeAction.do(creep);
            
            // If next target is far away and energy carried is low, get more energy
            var range = creep.pos.getRangeTo(target);
            if (range > creep.carry.energy * 1.1) {
                creep.memory.working = false;
                creep.say('Too far > harvest');
            }
        }
        else {
            harvestAction.do(creep, {mayUseLinks: false});
        }
    }
};

module.exports = roleWorker;