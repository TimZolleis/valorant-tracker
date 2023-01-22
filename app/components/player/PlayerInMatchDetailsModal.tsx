import { PlayerInMatch } from '~/models/player/PlayerDetails';
import { useSearchParams } from '@remix-run/react';
import { Modal, useModal } from '~/components/common/page/Modal';
import { useEffect, useState } from 'react';

export const PlayerInMatchDetailsModal = () => {
    const { showModal, toggleModal } = useModal(true);
    const [searchParams] = useSearchParams();

    let index = searchParams.get('player');
    if (!index) {
        index = '0';
    }

    const players = [
        {
            playerName: 'RNG LOL',
            gameTag: 'LOLZ',
        },
        {
            playerName: 'RNG ljdglsk',
            gameTag: '3221e',
        },
        {
            playerName: 'RNG sadadsad',
            gameTag: 'asfda',
        },
        {
            playerName: 'RNG LOasdewwL',
            gameTag: 'LOLZ',
        },
    ];

    return (
        <div>
            <Modal
                showModal={showModal}
                toggleModal={toggleModal}
                titleElement={
                    <SelectPlayerElement
                        playerName={players[parseInt(index)].playerName}
                        gameTag={players[parseInt(index)].gameTag}
                        maxIndex={players.length - 1}
                    />
                }>
                <p className={'text-white'}>Test Modal</p>
            </Modal>
        </div>
    );
};

export const SelectPlayerElement = ({
    playerName,
    gameTag,
    maxIndex,
}: {
    playerName: string;
    gameTag: string;
    maxIndex: number;
}) => {
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
        <div className={'w-full flex'}>
            <div className={'flex'}>
                <button onClick={() => subtractIndex()}>
                    <img className={'h-6'} src='/resources/img/svg/chevron-left.svg' alt='' />
                </button>
                <button onClick={() => addIndex()}>
                    <img className={'h-6'} src='/resources/img/svg/chevron-right.svg' alt='' />
                </button>
            </div>
            <div className={'flex'}>
                <p>{playerName}</p>#<p className={'text-gray-400'}>{gameTag}</p>
            </div>
        </div>
    );
};
