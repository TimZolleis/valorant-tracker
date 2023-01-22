import { PlayerComponent } from '~/components/match/current/team/PlayerComponent';
import { PlayerInMatch } from '~/models/player/PlayerDetails';
import { Link } from '@remix-run/react';

export const TeamComponent = ({ players }: { players: PlayerInMatch[] }) => {
    console.log(players);
    return (
        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-3'}>
            {players.map((player) => (
                <Link
                    to={`/player/${player.details.nameService.Subject}/details`}
                    prefetch={'intent'}
                    key={player.details.nameService.Subject}>
                    <PlayerComponent player={player} />
                </Link>
            ))}
        </div>
    );
};
