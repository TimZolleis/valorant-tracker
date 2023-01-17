import { MatchHistory } from '~/routes';

export const MatchScoreComponent = ({ history }: { history: MatchHistory }) => {
    return (
        <div
            className={
                'bg-mud p-5 ring ring-1 ring-gray-600 rounded-lg flex gap-5 items-center hover:cursor-pointer hover:ring-gray-300'
            }>
            <div className={'flex w-full justify-between'}>
                {history.matchDetails.teams
                    .sort((a, b) => (b.teamId === history.playerTeam?.teamId ? 1 : -1))
                    .map((team, index) => (
                        <>
                            <div key={team.teamId}>
                                <p
                                    key={team.teamId}
                                    className={'text-white font-inter font-bold text-title-small'}>
                                    {team.roundsWon}
                                </p>
                            </div>
                            {index === 0 && (
                                <p key={index} className={'text-white font-inter font-bold'}>
                                    -
                                </p>
                            )}
                        </>
                    ))}
            </div>
            <div>
                {!history.playerTeam?.won && (
                    <div
                        className={
                            'font-inter text-label-medium flex w-full items-center justify-center text-red-300 rounded-full px-3 bg-red-800/20'
                        }>
                        <p>Lost</p>
                    </div>
                )}
                {history.playerTeam?.won && (
                    <div
                        className={
                            'font-inter text-label-medium flex w-full items-center justify-center text-green-500 rounded-full px-3 bg-green-800/20'
                        }>
                        <p>Won</p>
                    </div>
                )}
            </div>
        </div>
    );
};
