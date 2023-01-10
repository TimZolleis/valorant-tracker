import { useState } from 'react';

type PasswordInputProps = {
    label: string;
    id: string;

    onChange?: any;
};

type TextType = 'text' | 'password';

export const PasswordInput = ({ label, id, onChange }: PasswordInputProps) => {
    const [type, setType] = useState<TextType>('password');

    const toggleVisibility = () => {
        switch (type) {
            case 'text': {
                setType('password');
                return;
            }
            case 'password': {
                setType('text');
                return;
            }
        }
    };

    return (
        <div className={'flex flex-col gap-2'}>
            <label className={'font-work-sans font-bold'} htmlFor={id}>
                {label}
            </label>
            <input
                required={true}
                className={'p-3 rounded-xl bg-neutral-100 ring ring-1 ring-slate-200'}
                type={type}
                id={id}
                name={id}
                onChange={onChange ? (event) => onChange(event) : () => void 0}
            />
        </div>
    );
};
