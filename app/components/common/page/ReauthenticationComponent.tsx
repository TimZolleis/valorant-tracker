import { useEffect } from 'react';
import ContentContainer from '~/components/common/page/ContentContainer';
import { WhiteButton } from '~/components/form/button/WhiteButton';
import { useNavigate } from 'react-router';
import { ROUTES } from '~/config/Routes';

export const ReauthenticationComponent = () => {
    const navigate = useNavigate();
    const reauthenticate = () => {
        navigate('/reauth');
    };

    return (
        <ContentContainer>
            <div className={'w-full p-10'}>
                <div className={'space-y-1 flex flex-col w-full items-center'}>
                    <h2
                        className={
                            'font-inter text-white font-semibold text-center text-headline-small'
                        }>
                        Oops...!
                    </h2>
                    <p
                        className={
                            'font-inter text-body-medium text-gray-400 font-normal text-center max-w-2xl'
                        }>
                        It looks like something went wrong with fetching your data. You can try
                        automatic Reauthentication with RiotGames in order to fix that
                    </p>
                </div>
                <div className={'mt-5 w-full flex justify-center'}>
                    <div>
                        <WhiteButton doesSubmit={false} onClick={() => reauthenticate()}>
                            <p>Reauthenticate</p>
                        </WhiteButton>
                    </div>
                </div>
            </div>
        </ContentContainer>
    );
};
