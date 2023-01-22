import { Player } from '~/models/player/PlayerDetails';
import ContentContainer from '~/components/common/page/ContentContainer';
import { SmallCard } from '~/components/common/SmallCard';
import { PlayerRankComponent } from '~/components/match/current/team/player/PlayerRankComponent';
import { PlayerWinrateComponent } from '~/components/player/statistics/PlayerWinrateComponent';

export const PlayerStatisticsComponent = ({ player }: { player: Player }) => {
    return (
        <div className={'grid grid-cols-2 md:grid-cols-4 gap-2'}>
            <ContentContainer>
                <SmallCard headline={'Rank'}>
                    <PlayerRankComponent rank={player.statistics.rank} />
                </SmallCard>
            </ContentContainer>

            <ContentContainer>
                <SmallCard headline={'Winrate'}>
                    <PlayerWinrateComponent statistic={player.statistics} />
                </SmallCard>
            </ContentContainer>
        </div>
    );
};
