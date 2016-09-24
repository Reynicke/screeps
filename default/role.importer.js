var actionHarvest = require('action.harvest');
var actionDeliver = require('action.deliverEnergy');
var actionRepair = require('action.repair');
var actionBuild = require('action.build');
var actionUpgrade = require('action.upgradeController');

var roleExplorer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        let actionName = 'importing';
        var homeSpawn = creep.memory.spawn;
        var targetFlagName = 'import_' + homeSpawn;
        var target;

        if (!creep.memory.target) {
            creep.memory.target = targetFlagName;
        }


        if (creep.memory[actionName] && creep.carry.energy == 0) {
            creep.memory[actionName] = false;
            creep.memory.target = targetFlagName;
            creep.say(creep.memory.target);
        }
        if (!creep.memory[actionName] && creep.carry.energy == creep.carryCapacity) {
            creep.memory[actionName] = true;
            creep.memory.target = creep.memory.spawn;
        }
        
        target = creep.memory[actionName] ? Game.spawns[creep.memory.spawn] : Game.flags[targetFlagName];
        if (!target) {
            console.log(creep.name, 'is unable to find target', creep.memory.target);
            return;
        }

        // Move to room of target before doing an action
        if (creep.pos.roomName != target.pos.roomName) {
            creep.moveTo(target, {reusePath: 10});
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