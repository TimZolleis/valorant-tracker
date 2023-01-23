import { Player, PlayerInMatch } from '~/models/player/PlayerDetails';
import { useSearchParams } from '@remix-run/react';
import { Modal, useModal } from '~/components/common/page/Modal';
import { useEffect, useState } from 'react';
import { WhiteButton } from '~/components/form/button/WhiteButton';
import { AnimatePresence, motion } from 'framer-motion';

export const PlayerInMatchDetailsModal = ({ players }: { players: PlayerInMatch[] }) => {
    const { showModal, toggleModal } = useModal(true);
    const [searchParams] = useSearchParams();
    const [index, setIndex] = useState<number>(0);
    useEffect(() => {
        const searchParamsIndex = searchParams.get('index');
        if (searchParamsIndex) {
            setIndex(parseInt(searchParamsIndex));
        }
    }, [searchParams]);

    return (
        <div>
            <WhiteButton onClick={toggleModal} doesSubmit={false}>
                <p>Toggle modal</p>
            </WhiteButton>
            <AnimatePresence>
                <Modal
                    showModal={showModal}
                    toggleModal={toggleModal}
                    titleElement={
                        <SelectPlayerElement
                            player={players[index]}
                            maxIndex={players.length - 1}
                        />
                    }>
                    <p className={'text-white'}>Test Modal</p>
                </Modal>
            </AnimatePresence>
        </div>
    );
};

const SelectPlayerElement = ({ player, maxIndex }: { player: Player; maxIndex: number }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [index, setIndex] = useState(0);
    const subtractIndex = () => {
        if (index > 0) setIndex(index - 1);
    };

    const addIndex = () => {
        if (index < maxIndex) setIndex(index + 1);
    };

    useEffect(() => {
        updateSearchParams();
    }, [index]);

    const updateSearchParams = () => {
        searchParams.set('player', index.toString());
        setSearchParams(searchParams);
    };

    return (
        <div className={'w-full flex gap-2'}>
            <div className={'flex gap-1'}>
                <button onClick={() => subtractIndex()}>
                    <img className={'h-6'} src='/resources/img/svg/chevron-left.svg' alt='' />
                </button>
                <button onClick={() => addIndex()}>
                    <img className={'h-6'} src='/resources/img/svg/chevron-right.svg' alt='' />
                </button>
            </div>
            <div className={'flex'}>
                <p className={'text-headline-small'}>{player.details.nameService.GameName}</p>#
                <p className={'text-gray-400'}>{player.details.nameService.TagLine}</p>
            </div>
        </div>
    );
};
