import { MatchComponent } from '~/components/match/MatchComponent';
import { CardContainer } from '~/components/common/page/CardContainer';
import { MatchHistory } from '~/models/match/MatchHistory';

export const MatchHistoryComponent = ({ history }: { history: MatchHistory }) => {
    const limitedHistory = history.matches.slice(0, 5);
    return (
        <CardContainer
            headline={'Match History'}
            subtext={'Your current history of games'}
            imageUrl={'/resources/img/svg/history.svg'}>
            <div className={'grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3'}>
                {limitedHistory.map((match) => (
                    <MatchComponent key={match.details.matchInfo.matchId} match={match} />
                ))}
            </div>
        </CardContainer>
    );
};
