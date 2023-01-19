import { WhiteButton } from '~/components/form/button/WhiteButton';
import { MatchHistory } from '~/routes';
import { useEffect } from 'react';
import { MatchScoreComponent } from '~/components/match/MatchScoreComponent';
import { CardContainer } from '~/components/common/page/CardContainer';

export const MatchHistoryComponent = ({ history }: { history: MatchHistory[] }) => {
    return (
        <CardContainer
            headline={'Match History'}
            subtext={'Your current history of games'}
            imageUrl={'/resources/img/svg/history.svg'}>
            <div className={'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3'}>
                {history.map((history) => (
                    <MatchScoreComponent
                        key={history.matchDetails.matchInfo.matchId}
                        history={history}
                    />
                ))}
            </div>
        </CardContainer>
    );
};
