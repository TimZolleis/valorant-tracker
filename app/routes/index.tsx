import { useOptionalUser } from '~/utils/hooks/user';
import { useEffect } from 'react';

export default function Index() {
    const user = useOptionalUser();
    useEffect(() => {});
    return <div>{user?.displayName}</div>;
}
