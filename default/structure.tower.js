var cron = require ('game.cron');

var structureTower = {

    /** @param {StructureTower} tower **/
    run: function (tower) {
        if (tower) {
            // Attack
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
                return;
            }
            
            // Repair only x% of the time and only if tower has spare energy
            if (cron.isItTime(25) && tower.energy / tower.energyCapacity >= 0.5) {
                
                // Find structures to repair
                /*var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                });*/
                var targets = tower.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax
                });

                if (targets) {
                    targets.sort((a, b) => a.hits - b.hits);
                    var closestDamagedStructure = targets[0];
                    tower.repair(closestDamagedStructure);
                }
            }
        }
    }
};

module.exports = structureTower;