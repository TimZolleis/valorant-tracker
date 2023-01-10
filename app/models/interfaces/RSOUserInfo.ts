import type { Region } from '~/models/static/Region';
import { ReferenceImplicitGlobal } from '@typescript-eslint/scope-manager/dist/referencer/Reference';

export interface Pw {
    cng_at: number;
    reset: boolean;
    must_reset: boolean;
}

export interface Acct {
    type: number;
    state: string;
    adm: boolean;
    game_name: string;
    tag_line: string;
    created_at: number;
}

export interface Affinity {
    pp: Region;
}

export interface RSOUserInfo {
    country: string;
    sub: string;
    email_verified: boolean;
    player_plocale?: any;
    country_at: number;
    pw: Pw;
    phone_number_verified: boolean;
    account_verified: boolean;
    ppid?: any;
    player_locale: string;
    acct: Acct;
    age: number;
    jti: string;
    affinity: Affinity;
}
