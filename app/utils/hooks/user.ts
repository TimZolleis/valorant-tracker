import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import is from '@sindresorhus/is';
import set = is.set;

export const useReauthentication = <T>(promise: Promise<T>) => {
    const [hasRedirected, setHasRedirected] = useState<boolean>(false);
    promise
        .catch((err) => {
            return true;
        })
        .then((res) => {
            if (typeof res === 'boolean') {
                setHasRedirected(res);
            }
        });
    const navigate = useNavigate();
    useEffect(() => {
        console.log(hasRedirected);
    }, [hasRedirected]);
};
