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
            deliverAction.do(creep) || buildAction.do(creep) || upgradeAction.do(creep);
        }
        else {
            harvestAction.do(creep);
        }
    }
};

module.exports = roleWorker;