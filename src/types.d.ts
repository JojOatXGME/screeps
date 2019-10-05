// --- Memory roots ----------------------------------------------------

interface CreepMemory {
    role: string;
    upgrading: boolean;
    building: boolean;
    lastPosition?: PersistedRoomPosition;
}

interface FlagMemory {
}

interface PowerCreepMemory {
}

interface RoomMemory {
    roadStats?: RoadStats;
}

interface SpawnMemory {
}

// --- common.ts -------------------------------------------------------

interface PersistedRoomPosition {
    roomName: string;
    x: number;
    y: number;
}

// --- roadservice.ts --------------------------------------------------

interface RoadStats {
    [tileIndex: number]: number;
}
