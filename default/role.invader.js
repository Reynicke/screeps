var roleInvader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var actionName = 'invading';
        var targetFlag = 'invade';


        // Move to flag
        if (!creep.memory[actionName]) {
            var target = Game.flags[targetFlag];
            if (target) {
                if (creep.pos.isNearTo(target)) {
                    creep.memory[actionName] = true;
                    creep.say(actionName);
                }
                else {
                    creep.moveTo(target);
                }
            }
        }
        else {
            // Claim controller
            var controller = creep.room.controller;
            if (controller && !controller.my) {
                if (controller.owner) {
                    if (creep.attackController(controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(controller);
                    }
                }
                else {
                    if (creep.claimController(controller) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(controller);
                    }
                }
            }
        }
    }
};

module.exports = roleInvader;