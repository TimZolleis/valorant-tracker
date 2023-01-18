import useMeasure from 'react-use-measure';
import { ValorantCompetitiveUpdate } from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';
import { EloGraph } from '~/components/match/history/graph/EloGraph';
import { TierGraph } from '~/components/match/history/graph/TierGraph';

function calculatePercent(number: number, percent: number) {
    return (number / 100) * percent;
}

export const CompetitiveUpdateComponent = ({
    competitiveUpdate,
}: {
    competitiveUpdate: ValorantCompetitiveUpdate;
}) => {
    const [eloGraphWidthRef, eloGraphWidthBounds] = useMeasure();

    return (
        <div className={'w-full p-5'}>
            <div className={'flex w-full'}>
                <span className={'p-3 rounded-xl ring ring-1 ring-gray-600'}>
                    <img className={'h-6'} src='/resources/img/svg/trophy.svg' alt='' />
                </span>
            </div>
            <div className={'mt-5'}>
                <p className={'font-inter text-title-medium text-white font-bold'}>Rank History</p>
                <p className={'font-inter text-body-medium text-gray-400 font-normal'}>
                    See how your RR changed in the last few games
                </p>
            </div>

            <div className={'ring ring-1 ring-gray-400/20 p-3 rounded-lg mt-5'}>
                <div ref={eloGraphWidthRef}>
                    <EloGraph
                        width={eloGraphWidthBounds.width}
                        height={calculatePercent(eloGraphWidthBounds.width, 40)}
                        competitiveUpdate={competitiveUpdate}
                    />
                    <p className={'text-white font-bold font-inter text-title-medium'}>Total RR</p>
                </div>
            </div>
        </div>
    );
};
