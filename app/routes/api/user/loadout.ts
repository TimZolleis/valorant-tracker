import { LoaderFunction } from '@remix-run/node';
import { getUserFromSession } from '~/utils/session/session.server';

export const loader: LoaderFunction = ({ request }) => {
    const user = getUserFromSession(request);
};
