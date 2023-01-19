import {
    ValorantAllyTeam,
    ValorantPlayer,
} from '~/models/interfaces/valorant-ingame/ValorantPreGame';
import { PlayerComponent } from '~/components/match/current/team/PlayerComponent';
import { PlayerWithData } from '~/utils/player/player.server';
import { useEffect } from 'react';

interface AllyTeamWithData extends ValorantAllyTeam {
    Players: PlayerWithData[];
}

export const AllyTeamComponent = ({ allyTeam }: { allyTeam: AllyTeamWithData }) => {
    return (
        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-3'}>
            {allyTeam.Players.map((player) => (
                <PlayerComponent key={player.Subject} player={player} />
            ))}
        </div>
    );
};
