var actionBuild = {

    /** @param {Creep} creep **/
    do: function (creep) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (targets.length) {
            creep.memory.lastAction = 'build';
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }

        return targets.length > 0;
    }
};

module.exports = actionBuild;