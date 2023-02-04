import { PlayerStatistic } from '~/models/player/PlayerStatistic';
import { SmallCard } from '~/components/common/SmallCard';
import ContentContainer from '~/components/common/page/ContentContainer';
import { ValorantMediaCharacter } from '~/models/interfaces/valorant-media/ValorantMediaCharacter';

export const PlayerInMatchStatisticsComponent = ({ statistic }: { statistic: PlayerStatistic }) => {
    return (
        <>
            <div className={'grid grid-cols-1 md:grid-cols-3 gap-2 w-full items-stretch'}>
                <ContentContainer>
                    <SmallCard headline={'Winrate'}>
                        <p
                            className={`font-inter text-title-medium ${
                                statistic.totalStatistics.winRate > 30
                                    ? 'text-green-500'
                                    : 'text-red-500'
                            }`}>
                            {statistic.totalStatistics.winRate.toFixed(2)}%
                        </p>
                    </SmallCard>
                </ContentContainer>

                <ContentContainer>
                    <SmallCard headline={'Current rank'}>
                        <div className={'flex gap-2 items-center'}>
                            <img className={'h-10'} src={statistic.rank.tier.smallIcon} alt='' />
                            <div>
                                <p
                                    className={
                                        'font-inter text-title-medium text-gray-400 first-letter:capitalize'
                                    }>
                                    {statistic.rank.tier.tierName.toLowerCase()}
                                </p>
                                <p className={'font-inter text-label-small text-gray-600 -mt-1'}>
                                    {statistic.rank.rr}RR
                                </p>
                            </div>
                        </div>
                    </SmallCard>
                </ContentContainer>
                <ContentContainer>
                    <SmallCard headline={'Top rank'}>
                        <div className={'flex gap-2 items-center'}>
                            <img className={'h-10'} src={statistic.topRank.smallIcon} alt='' />
                            <div>
                                <p
                                    className={
                                        'font-inter text-title-medium text-gray-400 first-letter:capitalize'
                                    }>
                                    {statistic.topRank.tierName.toLowerCase()}
                                </p>
                            </div>
                        </div>
                    </SmallCard>
                </ContentContainer>
            </div>
        </>
    );
};
