import { WhiteButton } from '~/components/form/button/WhiteButton';
import { MatchHistory } from '~/routes';
import { useEffect } from 'react';

export const MatchHistoryComponent = ({ history }: { history: MatchHistory[] }) => {
    useEffect(() => {
        console.log(history);
    }, []);

    return (
        <div className={'w-full p-5'}>
            <div className={'flex w-full'}>
                <span className={'p-3 rounded-xl ring ring-1 ring-gray-600'}>
                    <img className={'h-8'} src='/resources/img/svg/history.svg' alt='' />
                </span>
            </div>
            <div className={'mt-5'}>
                <p className={'font-inter text-title-large text-white font-bold'}>Match History</p>
                <p className={'font-inter text-body-medium text-gray-400 font-normal'}>
                    Your current history of games. Change gamemode to filter by different gamemodes,
                    set All to see all
                </p>
            </div>

            <div className={'grid grid-cols-3 gap-3'}>
                {history.map((history) => (
                    <div key={history.matchDetails.matchInfo.matchId}>
                        <p className={'text-white'}>{history.map?.displayName}</p>
                        <img className={' w-40 rounded'} src={history.map?.splash} alt='' />
                    </div>
                ))}
            </div>
        </div>
    );
};
