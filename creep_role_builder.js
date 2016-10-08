var actionHarvest = require('creep_action_harvest');
var actionBuild = require('creep_action_build');
var actionRepair = require('creep_action_repair');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        let actionName = 'building';

        if (creep.memory[actionName] && creep.carry.energy == 0) {
            creep.memory[actionName] = false;
            creep.say('harvesting');
        }
        if (!creep.memory[actionName] && creep.carry.energy == creep.carryCapacity) {
            creep.memory[actionName] = true;
            creep.say(actionName);
        }
        
        if (creep.memory.building) {
            actionBuild.do(creep) || actionRepair.do(creep);
        }
        else {
            actionHarvest.do(creep);
        }
    }
};

module.exports = roleBuilder;