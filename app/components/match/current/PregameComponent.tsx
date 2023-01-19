import { LiveIndicator } from '~/components/common/indicator/LiveIndicator';
import { ServerRegions } from '~/models/static/ServerRegions';
import { DefaultTag } from '~/components/tag/DefaultTag';
import { ValorantPreGameWithDetails } from '~/routes/match/live';
import { AllyTeamComponent } from '~/components/match/current/team/AllyTeamComponent';

function getServerRegion(gamePodId: string) {
    if (gamePodId.includes('madrid')) {
        return ServerRegions.MADRID;
    }
    if (gamePodId.includes('frankfurt')) {
        return ServerRegions.FRANKFURT;
    }
    if (gamePodId.includes('london')) {
        return ServerRegions.LONDON;
    }
    if (gamePodId.includes('paris')) {
        return ServerRegions.PARIS;
    }
    if (gamePodId.includes('tokyo')) {
        return ServerRegions.TOKYO;
    }
    if (gamePodId.includes('warsaw')) {
        return ServerRegions.WARSAW;
    } else return ServerRegions.UNKNOWN;
}

export const PregameComponent = ({ pregame }: { pregame: ValorantPreGameWithDetails }) => {
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
                            text={getServerRegion(pregame.GamePodID)}
                            color={'bg-fuchsia-800'}
                        />
                        <DefaultTag text={pregame.Map?.displayName} color={'bg-red-800'} />
                    </div>
                    <p className={'font-inter text-body-medium text-gray-400 font-normal mt-2'}>
                        Live game detected
                    </p>
                    <div>
                        <p className={'font-inter text-white font-medium text-label-large py-3'}>
                            Ally Players
                        </p>
                        <AllyTeamComponent allyTeam={pregame.AllyTeam} />
                    </div>
                </div>
            </div>
        </>
    );
};
