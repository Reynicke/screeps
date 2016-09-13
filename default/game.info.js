var info = {

    roles: {},
    
    reset: function() {
        this.roles = {};
    },

    /** @param {Creep} creep **/
    registerCreep: function(creep) {
        if (!this.roles[creep.memory.role]) {
            this.roles[creep.memory.role] = 0;
        }
        this.roles[creep.memory.role] += 1;
    },

    /**
     * Returns number of creeps of given role
     * @param roleName
     * @returns {number}
     */
    getRoleCount: function(roleName) {
        var result = 0;
        if (this.roles[roleName]) {
            result = this.roles[roleName]
        }

        return result;
    }
};

module.exports = info;