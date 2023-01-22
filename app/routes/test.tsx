import { defer, json, LoaderFunction } from '@remix-run/node';
import { Modal, useModal } from '~/components/common/page/Modal';
import { PlayerInMatchDetailsModal } from '~/components/player/PlayerInMatchDetailsModal';

export const loader: LoaderFunction = async () => {
    const testData = 'TestData from Loader 1';
    return json({
        testData,
    });
};

const TestPage = () => {
    const { showModal, toggleModal } = useModal(true);
    return (
        <>
            <PlayerInMatchDetailsModal />
        </>
    );
};

export default TestPage;
