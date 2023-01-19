import type { Puuid } from '~/models/interfaces/valorant-ingame/ValorantPlayer';

export function checkPuuid(puuid: Puuid) {
    if (checkUuidV1(puuid)) {
        return true;
    }
    if (checkUuidV2(puuid)) {
        return true;
    }
    if (checkUuidV3(puuid)) {
        return true;
    }
    if (checkUuidV4(puuid)) {
        return true;
    }
    if (checkUuidV5(puuid)) {
        return true;
    }

    return false;
}

function checkUuidV1(uuid: string) {
    return UUID_REGEX.V1.test(uuid);
}

function checkUuidV2(uuid: string) {
    return UUID_REGEX.V2.test(uuid);
}

function checkUuidV3(uuid: string) {
    return UUID_REGEX.V3.test(uuid);
}

function checkUuidV4(uuid: string) {
    return UUID_REGEX.V4.test(uuid);
}

function checkUuidV5(uuid: string) {
    return UUID_REGEX.V5.test(uuid);
}

const UUID_REGEX = {
    V1: /^[0-9A-F]{8}-[0-9A-F]{4}-[1][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    V2: /^[0-9A-F]{8}-[0-9A-F]{4}-[2][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    V3: /^[0-9A-F]{8}-[0-9A-F]{4}-[3][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    V4: /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    V5: /^[0-9A-F]{8}-[0-9A-F]{4}-[5][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
};
