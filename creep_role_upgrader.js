var actionHarvest = require('creep_action_harvest');
var actionUpgrade = require('creep_action_upgradeController');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
        }
        if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
            creep.memory.upgrading = true;
            creep.say('upgrading');
        }

        if (creep.memory.upgrading) {
            actionUpgrade.do(creep);
        }
        else {
            actionHarvest.do(creep);
        }
    }
};

module.exports = roleUpgrader;