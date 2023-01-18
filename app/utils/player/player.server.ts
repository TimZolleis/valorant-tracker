import { ValorantMediaCharacterApi } from '~/utils/api/valorant-media/ValorantMediaCharacterApi';
import { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';
import { Player } from '~/models/interfaces/valorant-ingame/ValorantPreGame';
import { ValorantPlayerApiClient } from '~/utils/api/valorant/ValorantPlayerApiClient';
import { Puuid } from '~/models/interfaces/valorant-ingame/ValorantPlayer';
import { getCurrentCompetitiveTiers, getPlayerRank, PlayerRank } from '~/utils/player/rank.server';
import { getCompetitiveUpdates } from '~/utils/player/history.server';
import { ValorantMediaCharacter } from '~/models/interfaces/valorant-media/ValorantMediaCharacter';
import { ValorantNameService } from '~/models/interfaces/valorant-ingame/ValorantNameService';
import { ValorantCompetitiveUpdate } from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';

export type PlayerData = {
    character?: ValorantMediaCharacter;
    playerName: ValorantNameService;
    rank: PlayerRank;
    competitiveUpdate: ValorantCompetitiveUpdate;
};

export async function getPlayerCharacter(characterUuid: string) {
    return await new ValorantMediaCharacterApi().getCharacter(characterUuid);
}

async function getPlayerData(user: AuthenticatedValorantUser, player: Player) {
    let character = undefined;
    if (player.CharacterID) {
        character = await getPlayerCharacter(player.CharacterID);
    }
    const playerNameArray = await new ValorantPlayerApiClient(user).getPlayerNames([
        player.Subject,
    ]);
    const playerName = playerNameArray[0];
    return { character, playerName };
}

export async function getPlayersData(user: AuthenticatedValorantUser, players: Player[]) {
    const { activeSeason, competitiveTier } = await getCurrentCompetitiveTiers(user);
    const playersData = await Promise.all(
        players.map(async (player) => {
            const [{ character, playerName }, rank, competitiveUpdate] = await Promise.all([
                getPlayerData(user, player),
                getPlayerRank(user, player.Subject, activeSeason, competitiveTier),
                getCompetitiveUpdates(user, player.Subject, 10),
            ]);
            return {
                character,
                playerName,
                rank,
                competitiveUpdate,
            };
        })
    );
    return playersData;
}
