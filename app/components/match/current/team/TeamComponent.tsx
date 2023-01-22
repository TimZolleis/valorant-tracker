import { PlayerComponent } from '~/components/match/current/team/PlayerComponent';
import { PlayerInMatch } from '~/models/player/PlayerDetails';
import { Link } from '@remix-run/react';
import { Modal, useModal } from '~/components/common/page/Modal';

export const TeamComponent = ({ players }: { players: PlayerInMatch[] }) => {
    const { showModal, toggleModal } = useModal();
    return (
        <>
            <Modal showModal={showModal} toggleModal={toggleModal}>
                <div className={'text-white'}>
                    <p>Modal</p>
                </div>
            </Modal>
            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-3'}>
                {players.map((player) => (
                    <div key={player.details.nameService.Subject} onClick={toggleModal}>
                        <PlayerComponent player={player} />
                    </div>
                ))}
            </div>
        </>
    );
};
