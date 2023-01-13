import type { PlayerRegion } from '~/models/static/PlayerRegion';

export const ENDPOINTS = {
    AUTH: 'https://auth.riotgames.com',
    REAUTH: 'https://auth.riotgames.com/authorize?redirect_uri=https%3A%2F%2Fplayvalorant.com%2Fopt_in&client_id=play-valorant-web-prod&response_type=token%20id_token&nonce=1',
    ENTITLEMENTS: 'https://entitlements.auth.riotgames.com',
    BASE: (region: PlayerRegion) => `https://pd.${region}.a.pvp.net`,
    SHARED: (region: PlayerRegion) => `https://shared.${region}.a.pvp.net`,
    PARTY: (region: PlayerRegion) => `https://glz-${region}-1.${region}.a.pvp.net`,
};
