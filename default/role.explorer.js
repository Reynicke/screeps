var actionHarvest = require('action.harvest');
var actionUpgrade = require('action.upgradeController');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        let actionName = 'exploring';
        
        if (creep.memory[actionName] && creep.carry.energy == 0) {
            creep.memory[actionName] = false;
            creep.say('harvesting');
        }
        if (!creep.memory[actionName] && creep.carry.energy == creep.carryCapacity) {
            creep.memory[actionName] = true;
            creep.say(actionName);
        }
        
        let target = Game.flags['invade'];
        if (target) {
            creep.moveTo(target);
        }

        /*
        if (creep.memory[actionName]) {
            actionUpgrade.do(creep);
        }
        else {
            actionHarvest.do(creep);
        }
        */
    }
};

module.exports = roleUpgrader;