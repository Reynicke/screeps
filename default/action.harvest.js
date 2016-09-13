var actionHarvest = {

    /**
     * 
     * @param {Creep} creep
     * @param {int} sourceIndex
     */
    do: function (creep, sourceIndex = 1) {
        var sources = creep.room.find(FIND_SOURCES);
        var source = sources[sourceIndex];
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
        creep.memory.lastAction = 'harvest';
    }
};

module.exports = actionHarvest;