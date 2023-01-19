import { Player } from '~/models/interfaces/valorant-ingame/ValorantPreGame';
import { PlayerWithData } from '~/utils/player/player.server';
import { PlayerRankComponent } from '~/components/match/current/team/player/PlayerRankComponent';
import { PlayerRankDirectionComponent } from '~/components/match/current/team/player/PlayerRankDirectionComponent';

export const PlayerComponent = ({ player }: { player: PlayerWithData }) => {
    return (
        <div className={'flex w-full ring ring-1 ring-gray-600 p-3 rounded-xl'}>
            <div className={'flex items-start gap-3'}>
                <div className={'ring ring-1 ring-gray-800 p-2 rounded-lg bg-mud'}>
                    <img
                        src={
                            player.character
                                ? player.character?.displayIconSmall
                                : '/resources/img/svg/question-mark.svg'
                        }
                        className={'rounded w-12'}
                        alt=''
                    />
                </div>
                <div>
                    <p className={'text-white font-inter font-semibold text-label-large'}>
                        {player.PlayerIdentity.nameService.GameName}{' '}
                        <span className={'text-gray-400 text-label-medium'}>
                            #{player.PlayerIdentity.nameService.TagLine}
                        </span>
                    </p>
                    <div className={'flex items-center'}>
                        <PlayerRankComponent rank={player.rank} />
                        <PlayerRankDirectionComponent
                            competitiveUpdate={player.competitiveUpdate}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
