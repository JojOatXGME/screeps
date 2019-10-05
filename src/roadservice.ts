const DEBUG = true;

const ROOM_WIDTH = 50;
const ROOM_HEIGHT = 50;

const STEP_SIZE = 60;
const IS_USED_THRESHOLD = 1 * STEP_SIZE + 1;
const CONSTRUCTION_THRESHOLD = 4 * STEP_SIZE;

export function develop(pos: RoomPosition) {
    let room = Game.rooms[pos.roomName];
    let roadStats = room.memory.roadStats;
    let tileIndex = getTileIndex(pos);
    if (roadStats == null) {
        roadStats = new Uint16Array(ROOM_WIDTH * ROOM_HEIGHT);
        room.memory.roadStats = roadStats;
    }

    let remainder = roadStats[tileIndex] % STEP_SIZE;
    if (remainder > STEP_SIZE / 2) {
        roadStats[tileIndex] += (STEP_SIZE - remainder) + STEP_SIZE;
        if (roadStats[tileIndex] < STEP_SIZE) {
            roadStats[tileIndex] = 65535; // Prevent overflow
        }
    }
    else {
        roadStats[tileIndex] += (STEP_SIZE - remainder);
    }

    if (DEBUG) {
        room.visual.rect(pos.x - 0.5, pos.y - 0.5, 1, 1, {
            fill: getHeatmapColor(roadStats[tileIndex]),
            opacity: 0.3,
        });
    }
    if (roadStats[tileIndex] >= CONSTRUCTION_THRESHOLD && !isOccupied(pos)) {
        let ret = Game.rooms[pos.roomName].createConstructionSite(pos, STRUCTURE_ROAD)
        if (ret != OK && ret != ERR_INVALID_TARGET) {
            console.error("Cannot construction road: ", pos);
        }
    }
}

export function isStillUsed(pos: RoomPosition): boolean {
    let roadStats = Game.rooms[pos.roomName].memory.roadStats;
    return roadStats != null && roadStats[getTileIndex(pos)] >= IS_USED_THRESHOLD;
}

export function degrade() {
    for (let roomName in Memory.rooms) {
        let roadStats = Memory.rooms[roomName].roadStats;
        let empty = true;
        if (roadStats == null) {
            continue;
        }
        for (let i = 0; i < ROOM_WIDTH * ROOM_HEIGHT; ++i) {
            if (roadStats[i] > 1) {
                roadStats[i] -= 1;
                empty = false;
            }
            else {
                roadStats[i] = 0;
            }
        }
        if (empty) {
            delete Memory.rooms[roomName].roadStats;
        }
    }
}

function isOccupied(pos: RoomPosition): boolean {
    if (Game.rooms[pos.roomName].lookForAt(LOOK_CONSTRUCTION_SITES, pos).length != 0) {
        return true;
    }
    if (Game.rooms[pos.roomName].lookForAt(LOOK_STRUCTURES, pos).length != 0) {
        return true;
    }
    return false;
}

function getTileIndex(pos: RoomPosition): number {
    return pos.y * ROOM_WIDTH + pos.x;
}

function getHeatmapColor(val: number): string {
    let rel = val / CONSTRUCTION_THRESHOLD;
    if (rel <= 0.5) {
        return "#00" + ratioToHexByte(2 * rel) + "00";
    }
    else {
        return "#" + ratioToHexByte(2 * (rel - 0.5)) + "0000";
    }
}

function ratioToHexByte(ratio: number): string {
    if (ratio < 0.0 || ratio > 1.0) {
        return ratio < 0.0 ? "00" : "FF";
    }
    return ("00" + Math.round(ratio * 255).toString(16)).slice(-2);
}
