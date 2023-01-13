import { LoaderFunction } from '@remix-run/node';
import { requireUser, updateSession } from '~/utils/session/session.server';
import { RiotReauthenticationClient } from '~/utils/api/valorant/RiotReauthenticationClient';

export const loader: LoaderFunction = async ({ request }) => {
    const user = await requireUser(request);
    const reauthenticationClient = await new RiotReauthenticationClient().init(user);
    const reauthenticatedUser = await reauthenticationClient.reauthenticate();
    return await updateSession(request, reauthenticatedUser, '/');
};
export const ReauthenticationPage = () => {
    return (
        <div>
            <p>Trying to reauthenticate...</p>
        </div>
    );
};
