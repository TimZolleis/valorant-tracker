const FormError = ({ text }: { text?: string }) => {
    if (text) {
        return (
            <>
                {}
                <div className={'rounded-lg bg-red-100 p-3 ring ring-1 ring-red-500'}>
                    <p className={'text-red-500'}>{text}</p>
                </div>
            </>
        );
    } else return null;
};
export default FormError;
