import * as common from './common';
import * as roadservice from './roadservice';
import * as roleBuilder from './role.builder';
import * as roleHarvester from './role.harvester';
import * as roleUpgrader from './role.upgrader';

export function loop() {
    console.log("Tick: " + Game.time);

    for (const name in Memory.creeps) {
        if (name in Game.creeps) {
            let creep = Game.creeps[name];
            common.update(creep);
            if (!common.getLastPos(creep).isEqualTo(creep.pos)) {
                roadservice.develop(creep.pos);
            }
        }
        else {
            // Automatically delete memory of missing creeps
            delete Memory.creeps[name];
        }
    }

    var tower = Game.getObjectById('TOWER_ID') as StructureTower;
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }

    roadservice.degrade();
}
