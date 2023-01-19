import { AllyTeam, Player } from '~/models/interfaces/valorant-ingame/ValorantPreGame';
import { PlayerComponent } from '~/components/match/current/team/PlayerComponent';
import { PlayerWithData } from '~/utils/player/player.server';
import { useEffect } from 'react';

interface AllyTeamWithData extends AllyTeam {
    Players: PlayerWithData[];
}

export const TeamComponent = ({ team }: { team: AllyTeamWithData }) => {
    useEffect(() => {
        console.log(team);
    });

    return (
        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-3'}>
            {team.Players.map((player) => (
                <PlayerComponent key={player.Subject} player={player} />
            ))}
        </div>
    );
};
