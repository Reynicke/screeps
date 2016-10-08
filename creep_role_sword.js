var actionAttack = require('creep_action_attack');


var roleSword = {

    /** @param {Creep} creep **/
    run: function (creep) {
        let range = 10;


        // Move near target flag room
        var targetFlag = Game.flags['military'];
        if (targetFlag && !creep.pos.inRangeTo(targetFlag, 5)) {
            creep.moveTo(targetFlag, {reusePath: 10});
        }
        
        // Attack!
        var target = actionAttack.do(creep, {range: range});
        
    }
};

module.exports = roleSword;