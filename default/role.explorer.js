var actionHarvest = require('action.harvest');
var actionDeliver = require('action.deliverEnergy');

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
        if (creep.pos.roomName != targetFlag.pos.roomName) {
            creep.moveTo(targetFlag);
            return;
        }
        
        if (creep.memory[actionName]) {
            actionDeliver.do(creep);
        }
        else {
            actionHarvest.do(creep);
        }
    }
};

module.exports = roleExplorer;