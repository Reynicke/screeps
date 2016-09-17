var info = {

    roles: {},

    reset: function () {
        this.roles = {};
    },

    /** @param {Creep} creep **/
    registerCreep: function (creep) {
        // Track roles
        if (!this.roles[creep.memory.role]) {
            this.roles[creep.memory.role] = 0;
        }
        this.roles[creep.memory.role] += 1;


        // Track positions
        
        var posKey = creep.pos.roomName + '_' + creep.pos.x + '_' + creep.pos.y;
        if (!Memory.creepPositions) {
            Memory.creepPositions = {'test': 1};
            Memory.creepPositions[posKey] = 0;
        }
        if (!Memory.creepPositions[posKey]) {
            Memory.creepPositions[posKey] = 0;
        }

        Memory.creepPositions[posKey]++;
    },

    /**
     * Suggests roads depending on movement of creeps
     * Places flags on suggested fields
     * @returns {number}  number of suggestions
     */
    suggestRoads: function () {
        console.log('suggesting roads rd>... ');
        var flagName = 'rd>';
        var suggestChances = 40;
        var results = 0;
        
        // Remove all old suggestions
        for (let flag in Game.flags) {
            if (flag.indexOf(flagName) === 0) {
                Game.flags[flag].remove();
            }
        }
        
        // Sort fields by value
        var keysSorted = Object.keys(Memory.creepPositions).sort((a, b) => {
            return Memory.creepPositions[a] - Memory.creepPositions[b]
        });
        // Get the top most fields
        var fields = keysSorted.reverse().splice(0, suggestChances);
        for (let i = 0; i < fields.length; i++) {
            let posArr = fields[i].split('_');
            let room = Game.rooms[posArr[0]];
            if (!room) break;
            let pos = room.getPositionAt(posArr[1], posArr[2]);
            
            // Check if there is already a structure on this field
            let structure = room.lookForAt(LOOK_STRUCTURES, pos);
            if (!structure.length) {
                room.createFlag( Number(posArr[1]), Number(posArr[2]), flagName + Memory.creepPositions[fields[i]], COLOR_GREY, COLOR_WHITE );
                results++;
            }
        }

        // Reset stats in Memory
        Memory.creepPositions = null;
        
        console.log('... ' + results);
        return results;
    },

    /**
     * Returns number of creeps of given role
     * @param roleName
     * @returns {number}
     */
    getRoleCount: function (roleName) {
        var result = 0;
        if (this.roles[roleName]) {
            result = this.roles[roleName]
        }

        return result;
    }
};

module.exports = info;