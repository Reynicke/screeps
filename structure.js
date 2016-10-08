
var structureTower = require('structure_tower');
var structureLink = require('structure_link');

var structure = {
    loop: function() {
        // Structure loop
        for (let name in Game.structures) {
            var structure = Game.structures[name];

            switch (structure.structureType) {
                case STRUCTURE_TOWER:
                    structureTower.run(structure);
                    break;
                case STRUCTURE_LINK:
                    structureLink.run(structure);
                    break;
            }
        }
    }
};

module.exports = structure;