import { ReactNode } from 'react';

type ButtonProps = {
    children: ReactNode;

    disabled?: boolean;
    doesSubmit: boolean;
    onClick?: any;
};

export const WhiteButton = ({ children, doesSubmit, onClick, disabled = false }: ButtonProps) => {
    return (
        <button
            className={
                'rounded-lg bg-white w-full p-3 font-inter font-medium text-black text-label-medium'
            }
            type={doesSubmit ? 'submit' : 'button'}
            disabled={disabled}
            onClick={onClick ? (event) => onClick(event) : () => void 0}>
            {children}
        </button>
    );
};
