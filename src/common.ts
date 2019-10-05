let lastPositions: Map<Creep, PersistedRoomPosition> = new Map();

export function update(creep: Creep) {
    if (creep.memory.lastPosition != null) {
        lastPositions.set(creep, creep.memory.lastPosition);
    }
    creep.memory.lastPosition = toPersistedPosition(creep.pos);
}

export function getLastPos(creep: Creep): RoomPosition {
    let persistedPosition = lastPositions.get(creep);
    if (persistedPosition == null) {
        return creep.pos;
    }
    else {
        return toNativePosition(persistedPosition);
    }
}

function toNativePosition(pos: PersistedRoomPosition): RoomPosition {
    return new RoomPosition(pos.x, pos.y, pos.roomName);
}

function toPersistedPosition(pos: RoomPosition): PersistedRoomPosition {
    return {x: pos.x, y: pos.y, roomName: pos.roomName};
}
