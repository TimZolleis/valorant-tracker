import { Player, PlayerInMatch } from '~/models/player/PlayerDetails';
import { useLocation, useSearchParams } from '@remix-run/react';
import { Modal, useModal } from '~/components/common/page/Modal';
import React, { SetStateAction, useEffect, useState } from 'react';
import { WhiteButton } from '~/components/form/button/WhiteButton';
import { AnimatePresence, motion } from 'framer-motion';

export const PlayerInMatchDetailsModal = ({
    players,
    initialIndex,
}: {
    players: PlayerInMatch[];
    initialIndex?: number;
}) => {
    const { showModal, toggleModal } = useModal(true);
    const [index, setIndex] = useState<number>(initialIndex ? initialIndex : 0);

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
                            index={index}
                            setIndex={setIndex}
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

const SelectPlayerElement = ({
    player,
    index,
    setIndex,
    maxIndex,
}: {
    player: Player;
    index: number;
    setIndex: React.Dispatch<SetStateAction<number>>;
    maxIndex: number;
}) => {
    const subtractIndex = () => {
        if (index > 0) setIndex(index - 1);
    };

    const addIndex = () => {
        if (index < maxIndex) setIndex(index + 1);
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
            <div className={'flex text-title-medium'}>
                <p className={'text-title-medium'}>
                    {player.details.nameService.GameName}{' '}
                    <span className={'text-gray-400'}>#{player.details.nameService.TagLine}</span>
                </p>
            </div>
        </div>
    );
};
