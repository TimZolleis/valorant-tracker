import type { PlayerRank } from '~/utils/player/rank.server';

export const PlayerRankComponent = ({ rank }: { rank: PlayerRank }) => {
    return (
        <>
            <div className={'flex gap-2'}>
                <img className={'h-16'} src={rank.tier?.largeIcon} alt='' />
                <div>
                    <p className={'font-manrope font-extrabold text-headline-medium'}>
                        {rank.tier?.tierName}
                    </p>
                    <p className={'font-manrope -mt-2 text-gray-500'}>{rank.rr}RR</p>
                </div>
            </div>
        </>
    );
};
