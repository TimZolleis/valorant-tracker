import { ValorantMatch } from '~/models/interfaces/valorant-ingame/ValorantCompetitiveUpdate';
import { useFetcher } from '@remix-run/react';
import { useEffect } from 'react';
import { MatchDetails } from '~/routes/match/$matchId';

const MatchComponent = ({ match }: { match: ValorantMatch }) => {
    const matchFetcher = useFetcher<MatchDetails>();

    useEffect(() => {
        if (matchFetcher.type === 'init') {
            console.log('Requesting match data for', match.MatchID);
            matchFetcher.load(`/match/${match.MatchID}`);
        }
    }, []);

    useEffect(() => {
        console.log(matchFetcher.data);
    }, [matchFetcher.data]);

    return (
        <>
            <div className={'rounded-xl p-4'}>
                <img className={'rounded-lg'} src={matchFetcher?.data?.map?.listViewIcon} alt='' />
                <p className={'text-white font-manrope text-headline-medium font-bold p-3'}>
                    {matchFetcher.data?.map?.displayName}
                </p>
            </div>
        </>
    );
};

export default MatchComponent;
