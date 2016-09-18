var actionDeliver = {

    /** @param {Creep} creep **/
    do: function (creep) {
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