var gameInfo = require('game.info');

var gameManager = {
    
    createFlag: function(room, x, y, name, color1, color2) {
        if (Game.flags[name]) {
            Game.flags[name].remove();
        }
        return room.createFlag(x, y, name, color1, color2);
    },

    run: function () {
        // Check all rooms
        for (let roomName in Game.rooms) {
            var room = Game.rooms[roomName];
            if (!room.controller.my) {
                // If room is not mine, continue
                continue;
            }

            // If energy in room is running low
            if (gameInfo.getEnergyPercent(room) < 0.25) {

                // Check energy in containers
                var containersWithEnergy = room.find(FIND_STRUCTURES, {
                    filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                    i.store[RESOURCE_ENERGY] > 0
                });
                var energyInContainers = _.sum(containersWithEnergy, function (c) {
                    return c.store[RESOURCE_ENERGY]
                });
                if (energyInContainers > 500) continue;

                // Set home flag to room, so that the explorers deliver energy here
                this.createFlag(room, 25, 25, 'home', COLOR_GREEN, COLOR_YELLOW);
                Game.notify('Alert! Room ' + roomName + ' is in need of energy!');
            }
        }
    }
};

module.exports = gameManager;