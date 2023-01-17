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
    const [eloGraphRef, eloGraphBounds] = useMeasure();
    const [tierGraphRef, tierGraphBounds] = useMeasure();

    return (
        <div className={'w-full p-5'}>
            <div className={'flex w-full'}>
                <span className={'p-3 rounded-xl ring ring-1 ring-gray-600'}>
                    <img className={'h-8'} src='/resources/img/svg/trophy.svg' alt='' />
                </span>
            </div>
            <div className={'mt-5'}>
                <p className={'font-inter text-title-large text-white font-bold'}>Rank History</p>
                <p className={'font-inter text-body-medium text-gray-400 font-normal'}>
                    See how your RR changed in the last few games
                </p>
            </div>
            <div className={'ring ring-1 ring-gray-400/20 p-5 rounded-lg mt-5'}>
                <div ref={eloGraphRef}>
                    <EloGraph
                        width={eloGraphBounds.width}
                        height={calculatePercent(eloGraphBounds.width, 40)}
                        competitiveUpdate={competitiveUpdate}
                    />
                    <p className={'text-white font-bold font-inter text-title-medium'}>Total RR</p>
                </div>
            </div>

            <div className={'grid grid-cols-2 gap-3'}>
                <div className={'ring ring-1 ring-gray-400/20 p-5 rounded-lg mt-5'}>
                    <div ref={tierGraphRef}>
                        <TierGraph
                            width={tierGraphBounds.width}
                            height={calculatePercent(tierGraphBounds.width, 40)}
                            competitiveUpdate={competitiveUpdate}
                        />
                        <p className={'text-white font-bold font-inter text-title-medium'}>Rank</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
