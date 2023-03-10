import { WhiteAreaGraph } from '~/components/common/graph/WhiteAreaGraph';
import { ValorantCompetitiveUpdate } from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';
import { DateTime } from 'luxon';
import { ValorantMediaCompetitiveTier } from '~/models/interfaces/valorant-media/ValorantMediaCompetitiveTier';
import { useMatchesData } from '~/utils/hooks/matches';

type TierData = {
    tier: number;
    matchTime: string;
};

function getTierData(competitiveUpdate: ValorantCompetitiveUpdate): TierData[] {
    return competitiveUpdate.Matches.sort((a, b) => a.MatchStartTime - b.MatchStartTime).map(
        (match) => {
            const tier = match.TierAfterUpdate;
            const matchTime = DateTime.fromMillis(match.MatchStartTime)
                .toFormat('dd.MM')
                .toString();
            return { tier, matchTime };
        }
    );
}

type TierGraphProps = {
    width: number;
    height: number;
    competitiveUpdate: ValorantCompetitiveUpdate;
};
export const TierGraph = ({ width, height, competitiveUpdate }: TierGraphProps) => {
    const matchesData = useMatchesData('routes/index');
    const competitiveTier = matchesData?.competitiveTier as ValorantMediaCompetitiveTier;
    const data = getTierData(competitiveUpdate);
    return (
        <WhiteAreaGraph
            width={width}
            height={height}
            data={data}
            margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
            graphDataKey={'tier'}
            xAxisDataKey={'matchTime'}
        />
    );
};
