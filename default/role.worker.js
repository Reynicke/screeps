var harvestAction = require ('action.harvest');
var deliverAction = require ('action.deliverEnergy');
var upgradeAction = require ('action.upgradeController');
var buildAction = require ('action.build');

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
            var target = deliverAction.do(creep) || buildAction.do(creep) || upgradeAction.do(creep);
            
            // If next target is far away and energy carried is low, drop it and get more energy
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