var actionBuild = {

    /** @param {Creep} creep **/
    do: function (creep) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            var target = targets[0];
            if (creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
            
            return target;
        }

        return null;
    }
};

module.exports = actionBuild;