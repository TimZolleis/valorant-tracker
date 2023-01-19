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
            <input
                required={true}
                placeholder={label}
                className={
                    'py-2.5 px-3 text-white font-inter rounded ring ring-1 ring-gray-600 bg-transparent placeholder:font-inter focus:outline-none'
                }
                type={type}
                id={id}
                name={id}
                onChange={onChange ? (event) => onChange(event) : () => void 0}
            />
        </div>
    );
};
