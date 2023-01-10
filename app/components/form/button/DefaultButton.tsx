const DefaultButton = ({ text }: { text: string }) => {
    return (
        <>
            <div className={'w-full flex'}>
                <button
                    className={
                        'w-full rounded-xl bg-valorant-red p-3 font-work-sans text-title-medium font-normal text-white'
                    }>
                    {text}
                </button>
            </div>
        </>
    );
};

export default DefaultButton;
