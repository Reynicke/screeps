
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

        // Find dropped energy or container
        var droppedEnergy = this.findCloseDroppedEnergy(creep);
        var container = this.findContainer(creep);

        if (droppedEnergy) {
            // Pick up dropped energy
            if (creep.pickup(droppedEnergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(droppedEnergy);
                target = droppedEnergy;
            }
        }

        else if (container) {
            // Pick up from container
            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
                target = container;
            }
        }

        else {
            // harvest 
            // Determine target resource
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
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
    findContainer: function (creep) {
        var filter, container,
            minAmount = 50;

        if (this.config.mayUseLinks) {
            filter = (d) => {
                var storedEnergy = (d.store && d.store[RESOURCE_ENERGY]) || d.energy;
                return (d.structureType == STRUCTURE_CONTAINER || d.structureType == STRUCTURE_LINK) &&
                    (storedEnergy / creep.pos.getRangeTo(d) > minAmount);
            }
        }
        else {
            filter = (d) => {
                var storedEnergy = (d.store && d.store[RESOURCE_ENERGY]);
                return d.structureType == STRUCTURE_CONTAINER && (storedEnergy / creep.pos.getRangeTo(d) > minAmount);
            }
        }
        
        container = creep.pos.findClosestByPath(
            FIND_STRUCTURES,
            {
                filter: filter
            }
        );

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