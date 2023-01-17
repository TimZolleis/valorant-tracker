import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { WhiteAreaGraph } from '~/components/common/graph/WhiteAreaGraph';
import { ValorantCompetitiveUpdate } from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';
import { DateTime } from 'luxon';

type EloData = {
    elo: number;
    matchTime: string;
};

const ELO_CONSTANTS = {
    RADIANT_ELO_ADDITION: 2100,
    RANK_ELO_ADDITION: -300,
};

function getCompetitiveUpdateData(competitiveUpdate: ValorantCompetitiveUpdate): EloData[] {
    return competitiveUpdate.Matches.sort((a, b) => a.MatchStartTime - b.MatchStartTime).map(
        (match) => {
            const elo = calculateElo(match.TierAfterUpdate, match.RankedRatingAfterUpdate);
            const matchTime = DateTime.fromMillis(match.MatchStartTime)
                .toFormat('dd.MM')
                .toString();
            return { elo, matchTime };
        }
    );
}

function calculateElo(tier: number, rankedRating: number) {
    if (tier >= 24) {
        return ELO_CONSTANTS.RADIANT_ELO_ADDITION + rankedRating;
    } else {
        return tier * 100 + ELO_CONSTANTS.RANK_ELO_ADDITION + rankedRating;
    }
}
type EloGraphProps = {
    width: number;
    height: number;
    competitiveUpdate: ValorantCompetitiveUpdate;
};
export const EloGraph = ({ width, height, competitiveUpdate }: EloGraphProps) => {
    const data = getCompetitiveUpdateData(competitiveUpdate);

    return (
        <WhiteAreaGraph
            width={width}
            height={height}
            data={data}
            grid={true}
            xAxis={true}
            margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
            graphDataKey={'elo'}
            xAxisDataKey={'matchTime'}
        />
    );
};
