import { ServerRegions } from '~/models/static/ServerRegions';

export function getServerRegion(gamePodId: string) {
    if (gamePodId.includes('madrid')) {
        return ServerRegions.MADRID;
    }
    if (gamePodId.includes('frankfurt')) {
        return ServerRegions.FRANKFURT;
    }
    if (gamePodId.includes('london')) {
        return ServerRegions.LONDON;
    }
    if (gamePodId.includes('paris')) {
        return ServerRegions.PARIS;
    }
    if (gamePodId.includes('tokyo')) {
        return ServerRegions.TOKYO;
    }
    if (gamePodId.includes('warsaw')) {
        return ServerRegions.WARSAW;
    } else return ServerRegions.UNKNOWN;
}
