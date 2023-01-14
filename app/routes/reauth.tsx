import { LoaderFunction } from '@remix-run/node';
import { requireUser, updateSession } from '~/utils/session/session.server';
import { RiotReauthenticationClient } from '~/utils/api/valorant/RiotReauthenticationClient';

export const loader: LoaderFunction = async ({ request }) => {
    const user = await requireUser(request);
    const reauthenticationClient = await new RiotReauthenticationClient().init(user);
    console.log('Trying to reauthenticate');
    const reauthenticatedUser = await reauthenticationClient.reauthenticate();
    console.log('Reauth successful, new User', reauthenticatedUser);
    return await updateSession(request, reauthenticatedUser);
};
export const ReauthenticationPage = () => {
    return (
        <div>
            <p>Trying to reauthenticate...</p>
        </div>
    );
};
