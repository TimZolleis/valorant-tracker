import { LiveIndicator } from '~/components/common/indicator/LiveIndicator';
import { ServerRegions } from '~/models/static/ServerRegions';
import { DefaultTag } from '~/components/tag/DefaultTag';
import { TeamComponent } from '~/components/match/current/team/TeamComponent';
import { PreGameMatch } from '~/models/match/PreGameMatch';
import { getServerRegion } from '~/utils/match/match.client';

export const PregameComponent = ({ pregame }: { pregame: PreGameMatch }) => {
    return (
        <>
            <div className={'w-full p-5'}>
                <div className={'flex w-full'}>
                    <span className={'p-3 rounded-xl ring ring-1 ring-gray-600 '}>
                        <img
                            className={'h-6 animate-pulse'}
                            src='/resources/img/svg/pregame.svg'
                            alt=''
                        />
                    </span>
                </div>
                <div className={'mt-5'}>
                    <div className={'flex gap-2 items-center'}>
                        <p className={'font-inter text-title-medium text-white font-bold'}>
                            Pregame
                        </p>
                        <LiveIndicator />
                    </div>
                    <div className={'flex gap-2 items-center mt-1'}>
                        <DefaultTag
                            text={getServerRegion(pregame.matchDetails.GamePodID)}
                            color={'bg-fuchsia-800'}
                        />
                        <DefaultTag text={pregame.map.displayName} color={'bg-red-800'} />
                    </div>
                    <p className={'font-inter text-body-medium text-gray-400 font-normal mt-2'}>
                        Live game detected
                    </p>
                    <div>
                        <p className={'font-inter text-white font-medium text-label-large py-3'}>
                            Ally Players
                        </p>
                        <TeamComponent players={pregame.players} />
                    </div>
                </div>
            </div>
        </>
    );
};
