export const QUEUE = {
    COMPETITIVE: 'competitive',
    CUSTOM: 'custom',
    DEATHMATCH: 'deathmatch',
    GGTEAM: 'ggteam',
    NEWMAP: 'newmap',
    ONEFA: 'onefa',
    SNOWBALL: 'snowball',
    SPIKERUSH: 'spikerush',
    UNRATED: 'unrated',
};

type Keys = keyof typeof QUEUE;
export type ValorantQueue = (typeof QUEUE)[Keys];
