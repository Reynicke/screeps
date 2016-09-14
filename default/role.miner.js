var actionHarvest = require('action.harvest');

var roleMiner = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (!creep.memory.myContainer) {
            // Find my container
            var otherMiners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');
            var containers = creep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_CONTAINER}});
            //var container = _.filter(containers, (container) => container.pos.isNearTo(otherMiners[0].pos));

            var container = _.filter(containers, function(container) {
                for (let c in otherMiners) {
                    var containerHasMiner = container.pos.isEqualTo(otherMiners[c].pos);
                    if (containerHasMiner) {
                        return false;
                    }
                    
                }
                return true;
            });


            // Remember my container and dont search again
            var myContainer = creep.pos.findInRange(FIND_STRUCTURES, 0,
                {filter: {structureType: STRUCTURE_CONTAINER}});
            if (myContainer.length) {
                creep.memory.myContainer = myContainer;
            }

            creep.moveTo(container[0]);
        }


        else {
            var source = creep.pos.findClosestByRange(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        
        
        

    }
};

module.exports = roleMiner;