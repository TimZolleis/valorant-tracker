import { Player, PlayerInMatch } from '~/models/player/PlayerDetails';
import { useLocation, useSearchParams } from '@remix-run/react';
import { Modal, useModal } from '~/components/common/page/Modal';
import React, { SetStateAction, useEffect, useState } from 'react';
import { WhiteButton } from '~/components/form/button/WhiteButton';
import { AnimatePresence, motion } from 'framer-motion';
import { PlayerInMatchStatisticsComponent } from '~/components/match/current/team/player/details/PlayerInMatchStatisticsComponent';
import {
    PlayerInMatchCharacterComponent,
    PlayerLastMatchPerformanceComponent,
} from '~/components/match/current/team/player/details/PlayerInMatchDetailsComponent';
import { CompetitiveUpdateComponent } from '~/components/match/history/CompetitiveUpdateComponent';
import ContentContainer from '~/components/common/page/ContentContainer';
import { MatchHistoryComponent } from '~/components/match/history/MatchHistoryComponent';

export const PlayerInMatchDetailsModal = ({
    players,
    initialIndex,
    playerIndex,
    showModal,
    toggleModal,
}: {
    players: PlayerInMatch[];
    initialIndex: number;
    playerIndex: number;
    showModal: boolean;
    toggleModal: any;
}) => {
    const [index, setIndex] = useState<number>(initialIndex);
    const [previousIndex, setPreviousIndex] = useState<number>(initialIndex ? initialIndex : 0);

    const direction = previousIndex > index ? -1 : 1;

    useEffect(() => {
        console.log(players);
        setIndex(playerIndex);
    }, [playerIndex]);

    const variants = {
        enter: (direction: number) => {
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0,
            };
        },
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => {
            return {
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0,
            };
        },
    };

    return (
        <div className={'z-50'}>
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
                    <motion.div key={index}>
                        <div className={'space-y-2'}>
                            <PlayerInMatchStatisticsComponent
                                statistic={players[index].statistics}
                            />
                            <div className={'grid grid-cols-1 md:grid-cols-2 gap-2 w-full'}>
                                <PlayerInMatchCharacterComponent
                                    character={players[index].character}
                                />
                                <PlayerLastMatchPerformanceComponent
                                    puuid={players[index].details.nameService.Subject}
                                    matchHistory={players[index].matchHistory}
                                />
                            </div>
                            <div className={'grid grid-cols-1 sm:grid-cols-2 gap-2'}>
                                <ContentContainer>
                                    <CompetitiveUpdateComponent
                                        competitiveUpdate={players[index].competitiveUpdate}
                                    />
                                </ContentContainer>
                                <ContentContainer>
                                    <MatchHistoryComponent history={players[index].matchHistory} />
                                </ContentContainer>
                            </div>
                        </div>
                    </motion.div>
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
