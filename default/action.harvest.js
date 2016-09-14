var actionHarvest = {

    /**
     *
     * @param {Creep} creep
     * @param {int} sourceIndex
     */
    do: function (creep, sourceIndex = 1) {

        // Determine target resource
        var sources = creep.room.find(FIND_SOURCES);
        var source = sources[sourceIndex];
        
        // Find dropped energy or container
        var droppedEnergy = this.findNearDroppedEnergy(creep);
        var container = this.findContainer(creep);

        if (droppedEnergy) {
            // Pick up dropped energy
            if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedEnergy);
            }
        }

        if (container && creep.harvest(source) == ERR_NOT_IN_RANGE) {
            // Pick up from container
            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        }
        
        else {
            //harvest if no dropped energy
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    },

    /**
     * 
     * @param creep
     * @param source
     * @returns {*}
     */
    findContainer: function(creep) {
        var container = creep.pos.findClosestByPath(
            FIND_STRUCTURES,
            {
                filter: (d) => {
                    return d.structureType == STRUCTURE_CONTAINER && (d.store[RESOURCE_ENERGY] / creep.pos.getRangeTo(d) > 50);
                }
            }
        );

        // Check if container or source is nearer
        /*if (container) {
            var rangeContainer = creep.pos.getRangeTo(container.pos);
            var rangeSrc  = creep.pos.getRangeTo(source.pos);
            if (rangeSrc < rangeContainer) {
                return null;
            }
        }*/

        return container;
    },

    /**
     * Finds dropped energy
     * @param creep
     * @returns {*}
     */
    findNearDroppedEnergy: function(creep) {
        var droppedEnergy = creep.pos.findClosestByPath(
            FIND_DROPPED_ENERGY,
            {
                filter: (d) => {
                    return (d.resourceType == RESOURCE_ENERGY)
                }
            }
        );

        // Check distance to drop
        if (droppedEnergy) {
            var rangeDrop = creep.pos.getRangeTo(droppedEnergy.pos);
            if (rangeDrop > 10) {
                return null;
            }
        }
        
        return droppedEnergy;
    }
};

module.exports = actionHarvest;