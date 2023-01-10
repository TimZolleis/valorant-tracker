import type { DateTime } from 'luxon';

export interface ValorantMediaApiVersionResponse {
    manifestId: string;
    branch: string;
    version: string;
    buildVersion: string;
    engineVersion: string;
    riotClientVersion: string;
    riotClientBuild: string;
    buildDate: DateTime;
}
