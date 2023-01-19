export const PageHeader = ({ text }: { text: string }) => {
    return (
        <div>
            <h2 className={' text-white font-inter font-bold text-headline-large py-3'}>{text}</h2>
        </div>
    );
};
