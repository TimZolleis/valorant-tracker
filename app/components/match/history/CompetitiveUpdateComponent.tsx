import useMeasure from 'react-use-measure';
import { ValorantCompetitiveUpdate } from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';
import { EloGraph } from '~/components/match/history/graph/EloGraph';
import { TierGraph } from '~/components/match/history/graph/TierGraph';
import { CardContainer } from '~/components/common/page/CardContainer';

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
        <CardContainer
            headline={'Rank History'}
            subtext={`See how your RR changed in the last ${competitiveUpdate.Matches.length} games`}
            imageUrl={'/resources/img/svg/trophy.svg'}>
            <div className={'ring ring-1 ring-gray-400/20 p-3 rounded-lg'}>
                <div ref={eloGraphWidthRef}>
                    <EloGraph
                        width={eloGraphWidthBounds.width}
                        height={calculatePercent(eloGraphWidthBounds.width, 40)}
                        competitiveUpdate={competitiveUpdate}
                    />
                    <p className={'text-white font-bold font-inter text-title-medium'}>Total RR</p>
                </div>
            </div>
        </CardContainer>
    );
};
