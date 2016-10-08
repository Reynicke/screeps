var actionHarvest = require('creep_action_harvest');
var actionDeliver = require('creep_action_deliverEnergy');
var actionRepair = require('creep_action_repair');
var actionBuild = require('creep_action_build');
var actionUpgrade = require('creep_action_upgradeController');

var roleExplorer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        let actionName = 'exploring';
        
        if (!creep.memory.targetFlag) {
            creep.memory.targetFlag = 'explore';
        }
        
        
        if (creep.memory[actionName] && creep.carry.energy == 0) {
            creep.memory[actionName] = false;
            creep.memory.targetFlag = 'explore';
            creep.say(creep.memory.targetFlag);
        }
        if (!creep.memory[actionName] && creep.carry.energy == creep.carryCapacity) {
            creep.memory[actionName] = true;
            creep.memory.targetFlag = 'home';
            creep.say(creep.memory.targetFlag);
        }
        
        // Move to room of target flag before doing an action
        var targetFlag = Game.flags[creep.memory.targetFlag];
        if (targetFlag && creep.pos.roomName != targetFlag.pos.roomName) {
            creep.moveTo(targetFlag, {reusePath: 10});
            return;
        }
        
        if (creep.memory[actionName]) {
            actionDeliver.do(creep, {fillContainers: true}) || actionBuild.do(creep) || actionRepair.do(creep) || actionUpgrade.do(creep);
        }
        else {
            actionHarvest.do(creep);
        }
    }
};

module.exports = roleExplorer;