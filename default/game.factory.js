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

    /**
     * Spawns creeps depending on needed role
     * @param {Object} config   {'worker': {
     *                              num: 4,
     *                              body: [WORK, CARRY, CARRY, MOVE, MOVE, MOVE]
     *                          }}
     * @returns {*}
     */
    autoSpawn: function (config) {
        for (let role in config) {
            if (gameInfo.getRoleCount(role) < config[role].num) {
                return this.spawnCreep(config[role].body, role);
            }
        }
    },

    spawnCreep: function (parts, role) {
        var name = createName(role);

        var success = Game.spawns['Spawn1'].createCreep(parts, name, {role: role});
        if (isNaN(success)) {
            console.log('spawned ' + role + ': ' + name);
            return true;
        }

        return false;
    }
};

module.exports = factory;