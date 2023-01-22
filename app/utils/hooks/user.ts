import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export function useReauthenticationPromise<T>(promise: Promise<T>) {
    const navigate = useNavigate();
    useEffect(() => {
        promise.catch((err) => {
            console.log('Error', err);
            if (err instanceof Response && err.headers.get('location')) {
                const url = err.headers.get('location');
                if (url) {
                    navigate(url);
                }
            }
        });
    }, []);
}
