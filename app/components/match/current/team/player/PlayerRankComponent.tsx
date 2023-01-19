import { PlayerRank } from '~/utils/player/rank.server';

export const PlayerRankComponent = ({ rank }: { rank: PlayerRank }) => {
    return (
        <div className={'flex gap-1  items-center'}>
            <div>
                <img className={'h-6'} src={rank.tier?.smallIcon} alt='' />
            </div>
            <div>
                <p className={'font-inter text-white text-label-medium first-letter:capitalize'}>
                    {rank.tier?.tierName.toLowerCase()}
                </p>
            </div>
        </div>
    );
};
