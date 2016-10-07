

var creep = {

    /**
     *
     * @param {Creep} creep
     * @returns null | {RoomObject}
     */
    run: function (creep) {
        
        // If creep dies
        if (creep.ticksToLive <= 2) {
            Memory.creeps[creep.name] = undefined;
            creep.say('Oh no!');
            return null;
        }
        
        // Check if there is a flag with creeps name
        var myFlag = Game.flags[creep.name] || Game.flags[creep.memory.role];
        if (myFlag) {
            creep.moveTo(myFlag, {reusePath: 10});
            return myFlag;
        }
        
        // Check if creep is bound to it's spawn room
        var homeSpawn = Game.spawns[creep.memory.spawn];
        if (!creep.memory.wanderer && creep.pos.roomName != homeSpawn.pos.roomName) {
            creep.moveTo(homeSpawn, {reusePath: 30});
            return homeSpawn;
        }
        
            
        return null;    
    }
};

module.exports = creep;