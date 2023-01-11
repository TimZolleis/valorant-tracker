import type { Region } from '~/models/static/Region';

export const ENDPOINTS = {
    AUTH: 'https://auth.riotgames.com',
    REAUTH: 'https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1',
    ENTITLEMENTS: 'https://entitlements.auth.riotgames.com',
    BASE: (region: Region) => `https://pd.${region}.a.pvp.net`,
    SHARED: (region: Region) => `https://shared.${region}.a.pvp.net`,
    PARTY: (region: Region) => `https://glz-${region}-1.${region}.a.pvp.net`,
};
