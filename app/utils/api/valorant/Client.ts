import { AxiosInstance } from 'axios';
import { Region } from '~/models/static/Region';
import { ValorantUser } from '~/models/user/ValorantUser';
import { getLoginClient } from '~/utils/axios/axios.server';

export class ValorantApiClient {
    axios: AxiosInstance;
    user: ValorantUser;
    region: Region;
}
