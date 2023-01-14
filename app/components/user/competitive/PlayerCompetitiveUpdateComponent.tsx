import {
    ValorantCompetitiveUpdate,
    ValorantMatch,
} from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';
import PlayerMatchesHistoryComponent from '~/components/user/competitive/match/PlayerMatchesHistoryComponent';

const PlayerCompetitiveUpdateComponent = ({
    competitiveUpdate,
}: {
    competitiveUpdate: ValorantCompetitiveUpdate;
}) => {
    return (
        <div>
            <PlayerMatchesHistoryComponent matches={competitiveUpdate.Matches} />
        </div>
    );
};
export default PlayerCompetitiveUpdateComponent;
