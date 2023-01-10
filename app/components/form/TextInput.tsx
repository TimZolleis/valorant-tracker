type TextInputProps = {
    label: string;
    id: string;

    onChange?: any;
};

export const TextInput = ({ label, id, onChange }: TextInputProps) => {
    return (
        <div className={'flex flex-col gap-2'}>
            <label className={'font-work-sans font-semibold text-label-large'} htmlFor={id}>
                {label}
            </label>
            <input
                required={true}
                className={'p-3 rounded-xl bg-neutral-100 ring ring-1 ring-slate-200'}
                type='text'
                id={id}
                name={id}
                onChange={onChange ? (event) => onChange(event) : () => void 0}
            />
        </div>
    );
};
