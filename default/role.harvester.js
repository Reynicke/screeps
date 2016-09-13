var harvestAction = require ('action.harvest');
var deliverAction = require ('action.deliverEnergy');
var upgradeAction = require ('action.upgradeController');
var buildAction = require ('action.build');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var lastAction = creep.memory.lastAction;
        
        // Harvest mode
        if (creep.carry.energy == 0 && creep.memory.action != 'harvest') {
            creep.memory.action = 'harvest';
            creep.say('harvesting...');
        }

        // Switch from harvest mode to something else
        if (creep.carry.energy == creep.carryCapacity && creep.memory.action == 'harvest') {
            creep.memory.action = 'browsing';
            creep.say('browsing...');
        }
        
        
        if (creep.memory.action === 'harvest') {
            harvestAction.do(creep);
        }
        else {
            creep.memory.action = 'deliver';
            var canDeliver = deliverAction.do(creep);
            
            if (!canDeliver) {
                creep.memory.action = 'build';
                var canBuild = buildAction.do(creep);
                //creep.say('building...');
            }
            
            if (!canBuild && creep.memory.action == 'build') {
                creep.memory.action = 'upgrade';
                upgradeAction.do(creep);
                //creep.say('upgrading...');
            }

            //deliverAction.do(creep) || buildAction.do(creep) || upgradeAction.do(creep);
        }
        
        /*if (lastAction != creep.memory.action) {
            creep.memory.action = lastAction;
            creep.say('now: ' + lastAction);
        }*/
    }
};

module.exports = roleHarvester;