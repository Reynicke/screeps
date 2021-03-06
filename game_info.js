var info = {

    roles: {},
    rolesPerRoom: {},
    rolesPerSpawn: {},

    reset: function () {
        this.roles = {};
        this.rolesPerRoom = {};
        this.rolesPerSpawn = {};
    },

    /** @param {Creep} creep **/
    registerCreep: function (creep) {
        
        // Track roles
        var roomName = creep.pos.roomName;
        var spawnName = creep.memory.spawn;
        var role = creep.memory.role;
        
        if (!this.rolesPerRoom[roomName]) {
            this.rolesPerRoom[roomName] = {};
        }
        if (!this.rolesPerRoom[roomName][role]) {
            this.rolesPerRoom[roomName][role] = 0;
        }
        if (!this.rolesPerSpawn[spawnName]) {
            this.rolesPerSpawn[spawnName] = {};
        }
        if (!this.rolesPerSpawn[spawnName][role]) {
            this.rolesPerSpawn[spawnName][role] = 0;
        }
        if (!this.roles[role]) {
            this.roles[role] = 0;
        }
        
        this.rolesPerRoom[roomName][role] += 1;
        this.rolesPerSpawn[spawnName][role] += 1;
        this.roles[role] += 1;


        // Track positions
        var posKey = creep.pos.roomName + '_' + creep.pos.x + '_' + creep.pos.y;
        if (!Memory.creepPositions) {
            Memory.creepPositions = {};
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
        var suggestChances = ~~(_.sum(this.roles) * 2.5);
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
                //room.createFlag( Number(posArr[1]), Number(posArr[2]), flagName + Memory.creepPositions[fields[i]], COLOR_GREY, COLOR_WHITE );
                Memory.gameManager.createFlag(room, Number(posArr[1]), Number(posArr[2]), flagName + Memory.creepPositions[fields[i]], COLOR_GREY, COLOR_WHITE);
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
     * @param spawnName
     * @returns {number}
     */
    getRoleCount: function (roleName, spawnName = null) {
        var result = 0;
        if (!spawnName && this.roles[roleName]) {
            result = this.roles[roleName];
        }
        else if (this.rolesPerSpawn[spawnName] && this.rolesPerSpawn[spawnName][roleName]) {
            result = this.rolesPerSpawn[spawnName][roleName];
        }

        return result;
    },

    /**
     * Gets percentage of available energy in a room
     * @param {Room} room
     * @returns {number}
     */
    getEnergyPercent: function(room) {
        return room.energyAvailable / room.energyCapacityAvailable;
    },

    /**
     * Returns if given room has at least one construction sites
     * @param {Room} room
     * @returns {boolean}
     */
    roomHasConstructionSite: function(room) {
        var sites = room.find(FIND_CONSTRUCTION_SITES);
        return !!sites.length;
    }
    
};

module.exports = info;