import {Region} from "~/models/static/Region";
import {AccessToken} from "~/models/interfaces/AccessToken";
import {Entitlement} from "~/models/interfaces/Entitlement";
import {Puuid} from "~/models/interfaces/Player";


export class ValorantUser {

    username: string;
    displayName: string;
    accessToken: AccessToken;
    entitlement: Entitlement;
    region: Region
    puuid: Puuid;


    async authorize() {


    }


}