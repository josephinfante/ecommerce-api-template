import * as uuid from 'uuid';

function generateUUID(): string {
    return uuid.v4();
}

function isUUIDValid(uuidStr: string): boolean {
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidPattern.test(uuidStr);
}

function generateUniqueUUID(): string {
    let newUUID = generateUUID();
    while (!isUUIDValid(newUUID)) {
        newUUID = generateUUID();
    }
    return newUUID;
}

export { generateUniqueUUID };
