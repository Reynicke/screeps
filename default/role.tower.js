var cron = require ('game.cron');

var roleBuilder = {

    /** @param {StructureTower} tower **/
    run: function (tower) {
        if (tower) {
            // Only check x% of the time
            if (cron.isItTime(35)) {
                
                // Find structures to repair
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                });

                if (closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }
            }

            // Attack
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
        }
    }
};

module.exports = roleBuilder;