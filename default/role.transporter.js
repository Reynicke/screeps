var harvestAction = require ('action.harvest');
var deliverAction = require ('action.deliverEnergy');
var upgradeAction = require ('action.upgradeController');

var roleTransporter = {

    /** @param {Creep} creep **/
    run: function (creep) {
        let actionName = 'working';
        
        if (creep.memory[actionName] && creep.carry.energy == 0) {
            creep.memory[actionName] = false;
            creep.say('harvesting');
        }
        if (!creep.memory[actionName] && creep.carry.energy == creep.carryCapacity) {
            creep.memory[actionName] = true;
            creep.say(actionName);
        }

        if (creep.memory[actionName]) {
            var target = deliverAction.do(creep) || upgradeAction.do(creep);

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

module.exports = roleTransporter;