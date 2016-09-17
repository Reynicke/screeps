var cron = {
    
    watch: function(time, fn) {
        
    },
    
    isItTime: function(time) {
        return Memory.cronTick <= time;
    },
    
    tick: function() {
        if (!Memory.cronTick) {
            Memory.cronTick = 1;
        }

        Memory.cronTick = Memory.cronTick >= 100 ? 1 : Memory.cronTick + 1;
        //console.log('cron', Memory.cronTick);
    }
    
};

module.exports = cron;