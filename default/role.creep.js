

var creep = {

    /**
     *
     * @param {Creep} creep
     * @returns null | {RoomObject}
     */
    run: function (creep) {
        
        // If creep dies
        if (creep.ticksToLive <= 1) {
            Memory.creeps[creep.name] = undefined;
            creep.say('Oh no!');
        }
        
        // Check if there is a flag with creeps name
        var myFlag = Game.flags[creep.name];
        if (myFlag) {
            creep.moveTo(myFlag);
            return myFlag;
        }
        
        // Check if creep is bound to it's spawn room
        if (!creep.memory.wanderer && creep.pos.roomName != Game.spawns[creep.memory.spawn].pos.roomName) {
            let homeSpawn = Game.spawns[creep.memory.spawn];
            creep.moveTo(homeSpawn, {reusePath: 30});
            return homeSpawn;
        }
        
            
        return null;    
    }
};

module.exports = creep;