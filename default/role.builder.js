var actionHarvest = require('action.harvest');
var actionBuild = require('action.build');
var actionRepair = require('action.repair');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('building');
        }

        
        
        if (creep.memory.building) {
            actionRepair.do(creep) || actionBuild.do(creep);
        }
        else {
            actionHarvest.do(creep, 0);
        }
    }
};

module.exports = roleBuilder;