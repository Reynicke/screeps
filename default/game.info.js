var info = {

    getRoleCount: function(roleName) {
        var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == roleName);
        return creeps.length;
    }
};

module.exports = info;