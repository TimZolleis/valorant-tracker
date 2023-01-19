type TextInputProps = {
    label: string;
    id: string;

    onChange?: any;
};

export const TextInput = ({ label, id, onChange }: TextInputProps) => {
    return (
        <div className={'flex flex-col gap-2 '}>
            <input
                required={true}
                placeholder={label}
                className={
                    'py-2.5 px-3 text-white font-inter rounded ring ring-1 ring-gray-600 bg-transparent placeholder:font-inter focus:outline-none'
                }
                type='text'
                id={id}
                name={id}
                onChange={onChange ? (event) => onChange(event) : () => void 0}
            />
        </div>
    );
};
