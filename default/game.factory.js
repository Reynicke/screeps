
function createName(role) {
    return role + '_' + (Math.random().toString(32).substr(2));
}


var factory = {

    spawnCreep: function(parts, role) {
        var name = createName(role.substr(0, 4));
        
        var success = Game.spawns['Spawn1'].createCreep(parts, name, {role: role});
        if (isNaN(success)) {
            console.log('spawned ' + role + ': ' + name);
        }
    }
};

module.exports = factory;