var structureLink = {

    /** @param {StructureLink} link **/
    run: function (link) {

        // Abort if still in cooldown 
        if (link.cooldown) return;

        // Find other link
        var targets = link.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return structure.structureType == STRUCTURE_LINK && (link.energy - structure.energy) > (link.energyCapacity / 2);
            }
        });

        if (targets.length) {
            let targetLink = targets[0];
            let amount = Math.min(Math.round(link.energy / 2), targetLink.energyCapacity - targetLink.energy);
            if (amount > 0) {
                link.transferEnergy(targetLink, amount);
            }
        }

    }
};

module.exports = structureLink;