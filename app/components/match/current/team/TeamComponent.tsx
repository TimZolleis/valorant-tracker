import { PlayerComponent } from '~/components/match/current/team/PlayerComponent';
import { PlayerInMatch } from '~/models/player/PlayerDetails';
import { Link } from '@remix-run/react';
import { Modal, useModal } from '~/components/common/page/Modal';
import { PlayerInMatchDetailsModal } from '~/components/player/PlayerInMatchDetailsModal';
import { useState } from 'react';

export const TeamComponent = ({ players }: { players: PlayerInMatch[] }) => {
    const { showModal, toggleModal } = useModal();
    const [playerIndex, setPlayerIndex] = useState<number>(0);

    const showPlayer = (index: number) => {
        setPlayerIndex(index);
        toggleModal();
    };

    return (
        <>
            <PlayerInMatchDetailsModal
                players={players}
                showModal={showModal}
                toggleModal={toggleModal}
                initialIndex={playerIndex}
                playerIndex={playerIndex}
            />
            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-3'}>
                {players.map((player, index) => (
                    <div key={player.details.nameService.Subject} onClick={() => showPlayer(index)}>
                        <PlayerComponent player={player} />
                    </div>
                ))}
            </div>
        </>
    );
};
