import { LiveIndicator } from '~/components/common/indicator/LiveIndicator';
import { DefaultTag } from '~/components/tag/DefaultTag';
import { TeamComponent } from '~/components/match/current/team/TeamComponent';
import {
    ValorantCoreGame,
    ValorantCoreGamePlayer,
} from '~/models/interfaces/valorant-ingame/ValorantCoreGame';
import { CoreGameMatch } from '~/models/match/CoreGameMatch';
import { getServerRegion } from '~/utils/match/match.client';
import { useOptionalUser } from '~/utils/hooks/matches';
import { PlayerInMatch } from '~/models/player/PlayerDetails';
import { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';

function getTeams(user: AuthenticatedValorantUser, players: PlayerInMatch[]) {
    const userPlayer = players.find((player) => {
        const playerInCurrentMatch = player.currentMatchDetails as ValorantCoreGamePlayer;
        return playerInCurrentMatch.PlayerIdentity.Subject === user.puuid;
    });

    const allyTeam = players.filter((player) => {
        const playerInCurrentMatch = player.currentMatchDetails as ValorantCoreGamePlayer;
        console.log(playerInCurrentMatch);
        const isInTeam =
            playerInCurrentMatch.TeamID ===
            (userPlayer as ValorantCoreGamePlayer | undefined)?.TeamID;

        // @ts-ignore
        return playerInCurrentMatch.TeamID === userPlayer?.currentMatchDetails.TeamID;
    });

    const enemyTeam = players.filter((player) => {
        const playerInCurrentMatch = player.currentMatchDetails as ValorantCoreGamePlayer;
        // @ts-ignore
        return playerInCurrentMatch.TeamID !== userPlayer?.currentMatchDetails.TeamID;
    });

    return { allyTeam, enemyTeam };
}

export const CoregameComponent = ({ coregame }: { coregame: CoreGameMatch }) => {
    const user = useOptionalUser();
    const teams = getTeams(user!, coregame.players);
    console.log(teams);
    return (
        <>
            <div className={'w-full p-5'}>
                <div className={'flex w-full'}>
                    <span className={'p-3 rounded-xl ring ring-1 ring-gray-600 '}>
                        <img
                            className={'h-6 animate-pulse'}
                            src='/resources/img/svg/pregame.svg'
                            alt=''
                        />
                    </span>
                </div>
                <div className={'mt-5'}>
                    <div className={'flex gap-2 items-center'}>
                        +
                        <p className={'font-inter text-title-medium text-white font-bold'}>
                            Coregame
                        </p>
                        <LiveIndicator />
                    </div>
                    <div className={'flex gap-2 items-center mt-1'}>
                        <DefaultTag
                            text={getServerRegion(coregame.matchDetails.GamePodID)}
                            color={'bg-fuchsia-800'}
                        />
                        <DefaultTag text={coregame.map.displayName} color={'bg-red-800'} />
                    </div>
                    <p className={'font-inter text-body-medium text-gray-400 font-normal mt-2'}>
                        Live game detected
                    </p>
                    <div>
                        <p className={'font-inter text-white font-medium text-label-large py-3'}>
                            Players
                        </p>
                        <div className={'grid  gap-2'}>
                            <div>
                                <p
                                    className={
                                        'font-inter text-white font-medium text-label-large py-3'
                                    }>
                                    Ally Team
                                </p>
                                <TeamComponent players={teams.allyTeam} />
                            </div>
                            <div>
                                <p
                                    className={
                                        'font-inter text-white font-medium text-label-large py-3'
                                    }>
                                    Enemy Team
                                </p>
                                <TeamComponent players={teams.enemyTeam} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
