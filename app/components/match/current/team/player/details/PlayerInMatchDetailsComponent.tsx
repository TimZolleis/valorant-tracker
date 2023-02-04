import { ValorantMediaCharacter } from '~/models/interfaces/valorant-media/ValorantMediaCharacter';
import ContentContainer from '~/components/common/page/ContentContainer';
import { SmallCard } from '~/components/common/SmallCard';
import { MatchHistory } from '~/models/match/MatchHistory';
import React from 'react';
import { DefaultTag } from '~/components/tag/DefaultTag';
import { Puuid } from '~/models/interfaces/valorant-ingame/ValorantPlayer';
import { Match } from '~/models/match/Match';

function findPlayer(lastMatch: Match, puuid: Puuid) {
    return lastMatch.details.players.find((player) => {
        return player.subject === puuid;
    });
}

export const PlayerInMatchCharacterComponent = ({
    character,
}: {
    character?: ValorantMediaCharacter;
}) => {
    return (
        <ContentContainer>
            <SmallCard headline={'Player character'}>
                <div className={'flex gap-2 items-center'}>
                    <div className={'p-2 ring ring-1 ring-gray-600/40 rounded-lg'}>
                        <img
                            className={'h-12'}
                            src={
                                character?.displayIconSmall
                                    ? character?.displayIconSmall
                                    : '/resources/img/svg/question-mark.svg'
                            }
                            alt=''
                        />
                    </div>
                    <p className={'font-inter text-title-large text-white font-bold'}>
                        {character?.displayName ? character?.displayName : 'NOT PICKED'}
                    </p>
                </div>
            </SmallCard>
        </ContentContainer>
    );
};

export const PlayerLastMatchPerformanceComponent = ({
    matchHistory,
    puuid,
}: {
    matchHistory: MatchHistory;
    puuid: string;
}) => {
    const lastMatch = matchHistory.matches[0];
    return (
        <ContentContainer>
            <SmallCard headline={'Last game'}>
                <div className={'w-full gap-2 grid grid-cols-1 md:grid-cols-2'}>
                    <ContentContainer>
                        <div className={'p-3'}>
                            <p className={'font-inter text-label-small text-gray-400'}>
                                Game stats
                            </p>
                            <div className={'flex w-full gap-4 items-center'}>
                                <div
                                    className={
                                        'flex gap-2 justify-between font-inter text-white text-title-medium'
                                    }>
                                    {lastMatch.details.teams
                                        .sort((a, b) =>
                                            b.teamId === lastMatch.playerTeam.teamId ? 1 : -1
                                        )
                                        .map((team, index) => (
                                            <React.Fragment key={team.teamId}>
                                                <p>{team.roundsWon}</p>
                                                {index === 0 ? <p>-</p> : null}
                                            </React.Fragment>
                                        ))}
                                </div>
                                <div>
                                    {lastMatch.playerTeam.won ? (
                                        <DefaultTag color={'bg-green-800'} text={'Won'} />
                                    ) : (
                                        <DefaultTag color={'bg-red-800'} text={'Lost'} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </ContentContainer>

                    <ContentContainer>
                        <div className={'divide-gray-400 divide-x flex w-full p-3'}>
                            <PlayerPerformanceComponent lastMatch={lastMatch} puuid={puuid} />
                        </div>
                    </ContentContainer>
                </div>
            </SmallCard>
        </ContentContainer>
    );
};

const PlayerPerformanceComponent = ({ lastMatch, puuid }: { lastMatch: Match; puuid: Puuid }) => {
    const player = findPlayer(lastMatch, puuid);
    return (
        <div className={'text-white'}>
            <p className={'font-inter text-label-small text-gray-400'}>KDA</p>
            <div className={'flex gap-2 font-inter text-gray text-title-medium'}>
                <p>{player?.stats.kills}</p>
                <span className={'text-gray-400'}>/</span>
                <p>{player?.stats.deaths}</p>
                <span className={'text-gray-400'}>/</span>
                <p>{player?.stats.assists}</p>
            </div>
        </div>
    );
};
