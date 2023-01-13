import { useOptionalUser } from '~/utils/hooks/user';
import { json, LoaderFunction } from '@remix-run/node';
import { getUserFromSession, requireUser } from '~/utils/session/session.server';
import { AuthenticatedValorantUser } from '~/models/user/AuthenticatedValorantUser';

type LoaderData = {
    user: AuthenticatedValorantUser;
};

export const loader: LoaderFunction = async ({ request }) => {
    const user = await requireUser(request);
    return json<LoaderData>({ user });
};

export default function Index() {
    const user = useOptionalUser();

    return <div>{user?.displayName}</div>;
}
