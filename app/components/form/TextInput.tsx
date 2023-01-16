type TextInputProps = {
    label: string;
    id: string;

    onChange?: any;
};

export const TextInput = ({ label, id, onChange }: TextInputProps) => {
    return (
        <div className={'flex flex-col gap-2'}>
            <label className={'font-inter font-semibold text-label-large text-white'} htmlFor={id}>
                {label}
            </label>
            <input
                required={true}
                className={'p-3 rounded-lg ring ring-1 ring-gray-400 bg-transparent'}
                type='text'
                id={id}
                name={id}
                onChange={onChange ? (event) => onChange(event) : () => void 0}
            />
        </div>
    );
};
