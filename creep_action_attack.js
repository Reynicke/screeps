var actionBuild = {

    defaultConfig: {
        range: 5
    },
    
    /** 
     * @param {Creep} creep
     * @param {Object} config
     **/
    do: function (creep, config = this.defaultConfig) {
        var range = config.range;
        
        var target = 
            creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS) || 
            creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {filter: (structure) => structure.structureType != STRUCTURE_CONTROLLER});
        
        //console.log(target);

        if (target) {
            if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            
            return target;
        }

        return null;
    }
};

module.exports = actionBuild;