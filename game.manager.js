var gameInfo = require('game.info');

var gameManager = {
    
    maxAlarmTicks: 50,
    
    createFlag: function(room, x, y, name, color1, color2) {
        if (typeof room === 'string') {
            room = Game.rooms[room];
        }
        
        var flag = Game.flags[name];
        if (flag) {
            return flag.setColor(color1, color2) && flag.setPosition(new RoomPosition(x, y, room.name));
        }
        else {
            return room.createFlag(x, y, name, color1, color2);
        }
    },
    
    _checkResourcesForAlarm(room) {
        // If energy in room is running low
        if (gameInfo.getEnergyPercent(room) < 0.20) {

            // Check energy in containers
            var containersWithEnergy = room.find(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                i.store[RESOURCE_ENERGY] > 0
            });
            var energyInContainers = _.sum(containersWithEnergy, function (c) {
                return c.store[RESOURCE_ENERGY]
            });
            return energyInContainers < 500;
        }
    },

    run: function () {
        var alarms = false;
        
        // Check all rooms
        for (let roomName in Game.rooms) {
            var room = Game.rooms[roomName];
            if (room.controller && !room.controller.my) {
                // If room is not mine, continue
                continue;
            }
            
            // Check if room has resource problems
            if (this._checkResourcesForAlarm(room)) {
                Memory.alarmTick += 1;
                alarms = true;
            }

            // Reset ticks if no alarm
            if (!alarms) {
                Memory.alarmTick = 0;
            }
            
            // If there is alarm in X successive ticks, do something about it 
            if (Memory.alarmTick > this.maxAlarmTicks) {
                // Set home flag to room, so that the explorers deliver energy here
                this.createFlag(room, 25, 25, 'home', COLOR_GREEN, COLOR_YELLOW);
                Game.notify('Alert! Room ' + roomName + ' is in need of energy!');
                Memory.alarmTick = 0;
            }
        }
    }
};

module.exports = gameManager;