var actionHarvest = require('action.harvest');
var actionBuild = require('action.build');
var actionRepair = require('action.repair');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        let actionName = 'building';

        if (creep.memory[actionName] && creep.carry.energy == 0) {
            creep.memory[actionName] = false;
            creep.say(actionName);
        }
        if (!creep.memory[actionName] && creep.carry.energy == creep.carryCapacity) {
            creep.memory[actionName] = true;
            creep.say(actionName);
        }

        
        
        if (creep.memory.building) {
            actionRepair.do(creep) || actionBuild.do(creep);
        }
        else {
            actionHarvest.do(creep);
        }
    }
};

module.exports = roleBuilder;