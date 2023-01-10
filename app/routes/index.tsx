import { useOptionalUser } from '~/utils/hooks/user';
import { json, LoaderFunction } from '@remix-run/node';
import { getUserFromSession, requireUser } from '~/utils/session/session.server';
import { ValorantUser } from '~/models/user/ValorantUser';

type LoaderData = {
    user: ValorantUser;
};

export const loader: LoaderFunction = async ({ request }) => {
    const user = await requireUser(request);
    return json<LoaderData>({ user });
};

export default function Index() {
    const user = useOptionalUser();

    return <div>{user?.displayName}</div>;
}
