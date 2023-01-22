import { PlayerStatistic } from '~/models/player/PlayerStatistic';
import { SmallCard } from '~/components/common/SmallCard';

export const PlayerWinrateComponent = ({ statistic }: { statistic: PlayerStatistic }) => {
    return (
        <div>
            <p className={'font-inter text-gray-400 font-medium text-headline-medium'}>
                {statistic.totalStatistics.winRate.toFixed(2)}%
            </p>
        </div>
    );
};
