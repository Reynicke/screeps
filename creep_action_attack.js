var actionBuild = {

    defaultConfig: {
        
    },
    
    /** 
     * @param {Creep} creep
     * @param {Object} config
     **/
    do: function (creep, config = this.defaultConfig) {
        
        var target = 
            creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS) /*|| 
            creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES, {filter: (structure) => structure.structureType != STRUCTURE_CONTROLLER})*/;


        if (target) {
            creep.say('attack!');

            // Attack close or ranged
            var success = !creep.attack(target) || !creep.rangedAttack(target);
            if (!success) {
                creep.moveTo(target);
            }
            
            return target;
        }

        return null;
    }
};

module.exports = actionBuild;