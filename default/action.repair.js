var actionBuild = {

    /** @param {Creep} creep **/
    do: function (creep) {

        var mode = 'closest';
        if (mode == 'closest') {
            
            // Repair closest target
            var success = false;
            var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });

            if (target) {
                if (creep.repair(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
                success = true;
            }

            return success;
        }
            
            
        else {
            
            // Repair target with fewest hits
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: object => object.hits < object.hitsMax
            });

            targets.sort((a, b) => a.hits - b.hits);

            if (targets.length > 0) {
                creep.memory.lastAction = 'repair';
                if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }

            return targets.length > 0;
        }
    }
};

module.exports = actionBuild;