var gameInfo = require('game.info');
var gameCreepRoles = require('game.creepRoles');


var names = ['Liam', 'Milan', 'Elias', 'Levi', 'Julian', 'Jonas', 'Linus', 'Daniel', 'Alex', 'Luca', 'Jan', 'Samuel', 'Tim', 'David', 'Michael', 'Lukas',
    'Anna', 'Lina', 'Laura', 'Emilia', 'Mila', 'Julia', 'Lea', 'Vanessa', 'Sarah', 'Lena', 'Amelie', 'Elena', 'Lara', 'Nina', 'Leonie', 'Mia', 'Alina', 'Juna', 'Lisa',
    'Kevin', 'Chantal', 'Maurice', 'Lenny'
];


function createName(role) {
    role = role.replace(/[aeiou]/g, '').substr(0, 5);
    var name = names[Math.round(Math.random() * (names.length - 1))];
    return role + ' ' + name;
}


var factory = {

    /**
     * Spawns creeps depending on needed role
     * @param {Object} config   {'Spawn1': {
     *                              {'worker': 4 }
     *                          }}
     * @returns {*}
     */
    autoSpawn: function(config) {
        for (var spawn in config) {
            var room = Game.spawns[spawn].room;
            for (let role in config[spawn]) {
                let roleDefinition = gameCreepRoles.getDefinition(role, room.energyAvailable);
                let isRoleGlobal = roleDefinition.global;
                let roomName = isRoleGlobal ? null : room.name;
                let demandInRoom = config[spawn][role];

                // Check defined demand
                if (gameInfo.getRoleCount(role, roomName) < demandInRoom) {
                    // Spawn a creep
                    let success = this.spawnCreep(roleDefinition.body, role, spawn);
                    if (success) {
                        return;
                    }
                }
            }
        }
    },

    spawnCreep: function (parts, role, spawn = 'Spawn1') {
        var name = createName(role);

        var success = Game.spawns[spawn].createCreep(parts, name, {role: role, spawn: spawn});
        if (isNaN(success)) {
            console.log(spawn, Game.spawns[spawn].pos, 'spawned ' + role + ': ' + name, parts);
            return true;
        }

        return false;
    }
};

module.exports = factory;