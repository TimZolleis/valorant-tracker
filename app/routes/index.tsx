import { useOptionalUser } from '~/utils/hooks/user';
import { useEffect } from 'react';

export default function Index() {
    const user = useOptionalUser();
    return <div>{user?.displayName}</div>;
}
