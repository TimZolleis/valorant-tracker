import type { MatchDetails } from '~/routes/match/$matchId';
import { ValorantMatch } from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';
import MatchComponent from '~/components/user/competitive/match/MatchComponent';

const PlayerMatchesHistoryComponent = ({ matches }: { matches: ValorantMatch[] }) => {
    return (
        <>
            <div className={'flex flex-col gap-2'}>
                {matches.map((match) => (
                    <MatchComponent key={match.MatchID} match={match} />
                ))}
            </div>
        </>
    );
};

export default PlayerMatchesHistoryComponent;
