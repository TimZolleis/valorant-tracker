import { ValorantCompetitiveUpdate } from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';

type Direction = 'up' | 'down' | 'neutral';

function calculateDirection(competitiveUpdate: ValorantCompetitiveUpdate) {
    let totalRR = 0;
    competitiveUpdate.Matches.map((match) => {
        totalRR += match.RankedRatingEarned;
    });
    return {
        direction: totalRR >= 0 ? 'up' : 'down',
        totalRR,
    };
}

export const PlayerRankDirectionComponent = ({
    competitiveUpdate,
}: {
    competitiveUpdate: ValorantCompetitiveUpdate;
}) => {
    const competitiveDirection = calculateDirection(competitiveUpdate);

    return (
        <>
            {competitiveDirection.direction === 'up' && (
                <div className={'flex items-center'}>
                    <img className={'h-4'} src='/resources/img/svg/arrow-up-green.svg' alt='' />
                    <p className={'text-green-500 font-inter text-label-small'}>
                        +{competitiveDirection.totalRR}
                    </p>
                </div>
            )}
            {competitiveDirection.direction === 'down' && (
                <div className={'flex items-center'}>
                    <img className={'h-4'} src='/resources/img/svg/arrow-down-red.svg' alt='' />
                    <p className={'text-red-500 font-inter text-label-small'}>
                        {competitiveDirection.totalRR}
                    </p>
                </div>
            )}
        </>
    );
};
