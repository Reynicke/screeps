var actionBuild = {

    /** @param {Creep} creep **/
    do: function (creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
        });

        targets.sort((a,b) => a.hits - b.hits);

        if(targets.length > 0) {
            creep.memory.lastAction = 'repair';
            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }

        return targets.length > 0;
    }
};

module.exports = actionBuild;