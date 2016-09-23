var actionDeliver = {

    // Define default behavior
    defaultConfig: {
        fillContainers: false
    },

    config: this.defaultConfig,

    /** 
     * @param {Creep} creep
     * @param {Object} config
     **/
    do: function (creep, config = this.defaultConfig) {
        this.config = config;
        
        // Find nearest structure, that is not full of energy
        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_TOWER ||
                    (structure.structureType == STRUCTURE_LINK)) 
                    && structure.energy < structure.energyCapacity;
            }
        });
        
        if (this.config.fillContainers && !target) {
            // Try to find an empty container or storage
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_STORAGE)
                         && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                }
            });
        }

        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            
            return target;
        }
        
        return null;
    }
};

module.exports = actionDeliver;