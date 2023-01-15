export const RankHistoryComponent = () => {
    return (
        <div className={'w-full p-5'}>
            <div className={'flex w-full'}>
                <span className={'p-3 rounded-xl ring ring-1 ring-gray-600'}>
                    <img className={'h-8'} src='/resources/img/svg/trophy.svg' alt='' />
                </span>
            </div>
            <div className={'mt-5'}>
                <p className={'font-inter text-title-large text-white font-bold'}>Rank History</p>
                <p className={'font-inter text-body-medium text-gray-400 font-normal'}>
                    See how your RR changed in the last few games
                </p>
            </div>
        </div>
    );
};
