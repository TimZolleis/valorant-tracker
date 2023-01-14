export const PlayerRRDifferenceComponent = ({ difference }: { difference: number }) => {
    return (
        <>
            <div className={'flex items-start py-2'}>
                <div className={'flex items-center'}>
                    {difference > 0 && (
                        <>
                            <p className={'text-green-500 font-manrope text-label-large'}>
                                +{difference}
                            </p>
                            <img
                                className={'h-6'}
                                src='/resources/img/svg/arrow-up-green.svg'
                                alt=''
                            />
                        </>
                    )}
                    {difference < 0 && (
                        <>
                            <p className={'text-red-500 font-manrope text-label-large'}>
                                -{difference}
                            </p>
                            <img
                                className={'h-6'}
                                src='/resources/img/svg/arrow-down-red.svg'
                                alt=''
                            />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
