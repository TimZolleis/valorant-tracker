import { PlayerComponent } from '~/components/match/current/team/PlayerComponent';
import { PlayerInMatch } from '~/models/player/PlayerDetails';

export const TeamComponent = ({ players }: { players: PlayerInMatch[] }) => {
    return (
        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-3'}>
            {players.map((player) => (
                <PlayerComponent key={player.details.nameService.Subject} player={player} />
            ))}
        </div>
    );
};
