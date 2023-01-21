import { defer, LoaderFunction } from '@remix-run/node';
import { Suspense } from 'react';
import { Await, useAsyncValue, useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = () => {
    const testPromise = new Promise((res) => setTimeout(() => res('TestPromise'), 1000));

    return defer({
        testPromise,
    });
};

const TestPage = () => {
    const data = useLoaderData();
    return (
        <>
            <Suspense>
                <Await resolve={data.testPromise}>
                    <TestComponent />
                </Await>
            </Suspense>
        </>
    );
};

export default TestPage;

function TestComponent() {
    const value = useAsyncValue();
    return <p className={'text-white'}>{value}</p>;
}
