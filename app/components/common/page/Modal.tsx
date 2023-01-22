import React, { ReactNode, useState } from 'react';

export const Modal = ({
    showModal,
    toggleModal,
    titleElement,
    children,
}: {
    showModal: boolean;
    toggleModal: any;
    titleElement: ReactNode;
    children: ReactNode;
}) => {
    return (
        <>
            {showModal ? (
                <>
                    <main
                        onClick={() => toggleModal()}
                        className={
                            'bg-black bg-opacity-30 p-3 fixed lg:px-60 left-0 top-0 right-0 bottom-0 flex flex-col items-center justify-center'
                        }>
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className={
                                'rounded-xl flex flex-col ring ring-1 ring-gray-600 bg-black md:px-5 md:py-5 w-full md:w-9/12'
                            }>
                            <div
                                className={
                                    'text-white font-bold font-inter text-headline-small border-b border-gray-600/40 pb-2'
                                }>
                                {titleElement}
                            </div>
                            <div className={'mt-5'}>{children}</div>
                        </div>
                    </main>
                </>
            ) : null}
        </>
    );
};

export function useModal(showInitial: boolean = false) {
    const [showModal, setShowModal] = useState(showInitial);
    function toggleModal() {
        setShowModal(!showModal);
    }

    return { showModal, toggleModal };
}
