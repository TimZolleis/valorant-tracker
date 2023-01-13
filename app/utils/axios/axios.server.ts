import { CookieJar } from 'tough-cookie';
import { wrapper } from 'axios-cookiejar-support';
import type { CookieAgent } from 'http-cookie-agent/http';
import { HttpsCookieAgent } from 'http-cookie-agent/http';
import type * as https from 'https';
import axios from 'axios';
import {
    AuthenticationTokens,
    Entitlement,
} from '~/models/interfaces/authentication/AuthenticationTokens';

export function getLoginClient(jar: CookieJar = new CookieJar()) {
    const client = wrapper(
        axios.create({
            httpAgent: getAgent(jar),
            httpsAgent: getAgent(jar),
            headers: { ...getDefaultHeaders() },
        })
    );
    return { cookieJar: jar, client };
}

function getAgent(jar: CookieJar): CookieAgent<https.Agent> {
    return new HttpsCookieAgent({
        ciphers: [
            'TLS_CHACHA20_POLY1305_SHA256',
            'TLS_AES_128_GCM_SHA256',
            'TLS_AES_256_GCM_SHA384',
            'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256',
        ].join(':'),
        honorCipherOrder: true,
        minVersion: 'TLSv1.2',
        cookies: { jar },
    });
}

export function getDefaultHeaders() {
    return {
        'content-type': AXIOS_CONSTANTS.CONTENT_TYPE,
        'user-agent': AXIOS_CONSTANTS.USER_AGENT,
    };
}

const AXIOS_CONSTANTS = {
    USER_AGENT: 'RiotClient/60.0.10.4802528.4749685 rso-auth (Windows;10;;Professional, x64)',
    CONTENT_TYPE: 'application/json',
    CIPHERS: [
        'TLS_CHACHA20_POLY1305_SHA256',
        'TLS_AES_128_GCM_SHA256',
        'TLS_AES_256_GCM_SHA384',
        'TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256',
    ],
};

export function getAuthorizationHeader(accessToken: AuthenticationTokens) {
    return {
        Authorization: `Bearer ${accessToken}`,
    };
}

export function getEntitlementsHeader(entitlementsToken: Entitlement) {
    return {
        'X-Riot-Entitlements-JWT': entitlementsToken,
    };
}
