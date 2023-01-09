import type {Region} from "~/models/static/Region";

export const ENDPOINTS = {
    AUTH: "https://auth.riotgames.com",
    ENTITLEMENTS: "https://entitlements.auth.riotgames.com",
    BASE: (region: Region) => `https://pd.${region}.a.pvp.net`,
    SHARED: (region: Region) => `https://shared.${region}.a.pvp.net`,
    PARTY: (region: Region) => `https://glz-${region}-1.${region}.a.pvp.net`,
}



