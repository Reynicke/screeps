var actionHarvest = {

    /**
     * @param {Creep} creep
     * @returns {Structure}
     */
    do: function (creep) {
        var target = null;

        // Find dropped energy or container
        var droppedEnergy = this.findCloseDroppedEnergy(creep);
        var container = this.findContainer(creep);

        // Determine target resource
        var source = creep.pos.findClosestByPath(FIND_SOURCES);

        if (droppedEnergy) {
            // Pick up dropped energy
            if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedEnergy);
                target = droppedEnergy;
            }
        }

        if (container && creep.harvest(source) == ERR_NOT_IN_RANGE) {
            // Pick up from container
            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
                target = container;
            }
        }
        
        else {
            // harvest 
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
                target = source;
            }
        }
        
        return target;
    },

    /**
     * 
     * @param creep
     * @returns {StructureContainer}
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
    findCloseDroppedEnergy: function(creep) {
        /*var droppedEnergy = creep.pos.findClosestByPath(
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
        
        return droppedEnergy;*/

        //var droppedEnergy = creep.pos.findInRange(FIND_DROPPED_ENERGY, 15);
        //return droppedEnergy[0];


        var droppedEnergy = creep.pos.findClosestByPath(
            FIND_DROPPED_ENERGY,
            {
                filter: (e) => {
                    return creep.pos.getRangeTo(e.pos) < 10;
                }
            }
        );
        return droppedEnergy;
        
    }
};

module.exports = actionHarvest;