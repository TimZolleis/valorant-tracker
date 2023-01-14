import type { PlayerRank } from '~/utils/player/rank.server';
import { PlayerRRDifferenceComponent } from '~/components/user/competitive/PlayerRRDifferenceComponent';

export const PlayerRankComponent = ({
    rank,
    rankDifference,
}: {
    rank: PlayerRank;
    rankDifference: number;
}) => {
    return (
        <>
            <div className={'flex gap-2'}>
                <div className={'flex gap-2'}>
                    <img className={'h-16'} src={rank.tier?.largeIcon} alt='' />
                    <div>
                        <p
                            className={
                                'font-manrope text-white text-headline-medium first-letter:capitalize'
                            }>
                            {rank.tier?.tierName.toLowerCase()}
                        </p>
                        <p className={'font-manrope -mt-2 text-gray-400'}>{rank.rr}RR</p>
                    </div>
                </div>
                <PlayerRRDifferenceComponent difference={rankDifference} />
            </div>
        </>
    );
};
