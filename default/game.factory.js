
var names = [ 'Liam', 'Milan', 'Elias', 'Levi', 'Julian', 'Jonas', 'Linus', 'Daniel', 'Alex', 'Luca', 'Jan', 'Samuel', 'Tim', 'David', 'Michael', 'Lukas',
    'Anna', 'Lina', 'Laura', 'Emilia', 'Mila', 'Julia', 'Lea', 'Vanessa', 'Sarah', 'Lena', 'Amelie', 'Elena', 'Lara', 'Nina', 'Leonie', 'Mia', 'Alina', 'Juna', 'Lisa'
    ];


function createName(role) {
    role = role.substr(0, 4);
    var name = names[Math.round(Math.random() * names.length)];
    return role + '_' + name;
}


var factory = {

    spawnCreep: function(parts, role) {
        var name = createName(role);
        
        var success = Game.spawns['Spawn1'].createCreep(parts, name, {role: role});
        if (isNaN(success)) {
            console.log('spawned ' + role + ': ' + name);
        }
    }
};

module.exports = factory;