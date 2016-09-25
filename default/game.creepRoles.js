
var roleDefinitions = {

    /**
     * Generates dynamic creep definition
     * 
     * @param role
     * @param energyAvailable
     * @returns {Object}  {global: bool, body: []}
     */
    getDefinition: function (role, energyAvailable) {
        if (!this._definitions[role]) return null;

        var bodies = this._definitions[role].body;
        var ndx = bodies.length;
        while (ndx--) {
            var body = bodies[ndx];
            let cost = this._calc(body);
            if (cost < energyAvailable) {
                break;
            }
        }
        
        return {
            global: this._definitions[role].global || false,
            body: body
        };
    },

    _calc: function(body) {
        var self = this;
        return _.reduce(body, function (sum, bodyPart) {
            return sum + self._cost(bodyPart);
        }, 0);
    },

    _cost: function(bodyPart) {
        var cost = {
            move: 50,
            work: 100,
            carry: 50,
            attack: 80,
            ranged_attack: 150,
            heal: 250,
            claim: 600,
            tough: 10
        };
        return cost[bodyPart];
    },

    _definitions: {
        'worker': {
            body: [
                [WORK, CARRY, MOVE],
                [WORK, CARRY, CARRY, MOVE, MOVE]
            ]
        },

        'miner': {
            body: [
                [WORK, WORK, MOVE],
                [WORK, WORK, WORK, MOVE],
                [WORK, WORK, WORK, WORK, MOVE],
                [WORK, WORK, WORK, WORK, WORK, MOVE]
            ]
        },

        'transporter': {
            body: [
                [CARRY, MOVE],
                [CARRY, CARRY, MOVE, MOVE],
                [CARRY, CARRY, CARRY, MOVE, MOVE],
                [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
            ]
        },

        'upgrader': {
            body: [
                [WORK, CARRY, MOVE],
                [WORK, CARRY, CARRY, MOVE],
                [WORK, WORK, CARRY, CARRY, CARRY, MOVE],
                [WORK, WORK, WORK, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE]
            ]
        },

        'builder': {
            body: [
                [WORK, CARRY, MOVE],
                [WORK, CARRY, CARRY, MOVE],
                [WORK, CARRY, CARRY, MOVE, MOVE]
            ]
        },

        'explorer': {
            body: [
                [WORK, CARRY, MOVE],
                [WORK, CARRY, CARRY, MOVE, MOVE],
                [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
            ],
            global: true
        },

        'invader': {
            body: [
                [CLAIM, MOVE],
                [CLAIM, CLAIM, MOVE]
            ],
            global: true
        },
        
        'importer': {
            body: [
                [WORK, CARRY, MOVE],
                [WORK, CARRY, CARRY, MOVE, MOVE],
                [WORK, WORK, CARRY, CARRY, MOVE, MOVE],
                [WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE]
            ]
        }
    }

};

module.exports = roleDefinitions;