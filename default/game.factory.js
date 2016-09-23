var gameInfo = require('game.info');


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

    globalSpawnCoolDown: 0,

    /**
     * Spawns creeps depending on needed role
     * @param {Object} config   {'Spawn1': {
     *                              {'worker': {
     *                                  num: 4,
     *                                  body: [WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
     *                                  global: false
     *                               }
     *                          }}
     * @returns {*}
     */
    autoSpawn: function (config) {
        this.globalSpawnCoolDown += this.globalSpawnCoolDown > 0 ? -1 : 0;

        for (var spawn in config) {
            var room = Game.spawns[spawn].room;
            for (let role in config[spawn]) {
                let isRoleGlobal = config[spawn][role].global;
                let roomName = isRoleGlobal ? null : room.name;

                // Check defined demand
                if (gameInfo.getRoleCount(role, roomName) < config[spawn][role].num) {
                    // Break if on cooldown
                    if (isRoleGlobal && this.globalSpawnCoolDown > 0) break;

                    // Spawn a creep
                    let success = this.spawnCreep(config[spawn][role].body, role, spawn);
                    
                    // Set cooldown, if role is global to prevent multiple creeps
                    if (isRoleGlobal && success && Game.spawns[spawn].spawning) {
                        this.globalSpawnCoolDown = Game.spawns[spawn].spawning.remainingTime + 1;
                    }
                    break;
                }
            }
        }
    },

    spawnCreep: function (parts, role, spawn = 'Spawn1') {
        var name = createName(role);

        var success = Game.spawns[spawn].createCreep(parts, name, {role: role, spawn: spawn});
        if (isNaN(success)) {
            console.log(spawn, Game.spawns[spawn].pos, 'spawned ' + role + ': ' + name);
            return true;
        }

        return false;
    }
};

module.exports = factory;