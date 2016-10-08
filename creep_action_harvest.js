
var actionHarvest = {

    // Define default behavior
    defaultConfig: {
        mayUseLinks: true
    },
    
    config: this.defaultConfig,
    
    /**
     * @param {Creep} creep
     * @param {Object} [config]
     * @returns {Structure}
     */
    do: function (creep, config = this.defaultConfig) {
        this.config = config;
        var target = null;
        var moveOptions = {reusePath: 20};

        // Find dropped energy or container
        var droppedEnergy = this.findCloseDroppedEnergy(creep);
        var container = this.findContainer(creep);

        if (droppedEnergy) {
            // Pick up dropped energy
            if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedEnergy, moveOptions);
                target = droppedEnergy;
            }
        }

        else if (container) {
            // Pick up from container
            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container, moveOptions);
                target = container;
            }
        }

        else {
            // harvest 
            // Determine target resource
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, moveOptions);
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
    findContainer: function (creep) {
        var filter, container,
            minAmount = 30;

        // TODO make mayUseLinks dependent on distance
        if (this.config.mayUseLinks) {
            filter = (d) => {
                let storedEnergy = (d.store && d.store[RESOURCE_ENERGY]) || d.energy;
                return (d.structureType == STRUCTURE_CONTAINER || d.structureType == STRUCTURE_LINK) && (storedEnergy > minAmount);
            }
        }
        else {
            filter = (d) => {
                let storedEnergy = (d.store && d.store[RESOURCE_ENERGY]);
                return d.structureType == STRUCTURE_CONTAINER && (storedEnergy > minAmount);
            }
        }
        
        container = creep.pos.findClosestByPath(FIND_STRUCTURES, {filter: filter});
        
        // If no suitable container was found
        if (!container) {
            // Try looking in storage
            let storage = creep.room.find(FIND_MY_STRUCTURES, {filter: (s) => {
                return s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > minAmount}
            });
            
            if (storage.length) {
                container = storage[0];
            }
        }

        return container;
    },

    /**
     * Finds dropped energy
     * @param creep
     * @returns {*}
     */
    findCloseDroppedEnergy: function (creep) {
        var droppedEnergy = creep.pos.findClosestByPath(
            FIND_DROPPED_ENERGY,
            {
                filter: (e) => {
                    return creep.pos.getRangeTo(e.pos) < 10 && e.energy >= 25;
                }
            }
        );
        return droppedEnergy;
    }
};

module.exports = actionHarvest;