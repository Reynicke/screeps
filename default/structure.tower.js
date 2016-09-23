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
            if (cron.isItTime(30) && tower.energy / tower.energyCapacity >= 0.5) {
                
                // Find structures to repair
                /*var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax
                });*/
                var targets = tower.room.find(FIND_STRUCTURES, {
                    filter: object => object.hits < object.hitsMax
                });

                if (targets) {
                    // Pick a random target from the top 3
                    targets.sort((a, b) => a.hits - b.hits);
                    let index = Math.round(Math.random() * Math.min(targets.length, 3)) - 1;
                    tower.repair(targets[index]);
                }
            }
        }
    }
};

module.exports = structureTower;