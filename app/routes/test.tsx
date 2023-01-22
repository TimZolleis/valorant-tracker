import { defer, json, LoaderFunction } from '@remix-run/node';
import { Suspense } from 'react';
import { Await, Outlet, useAsyncValue, useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async () => {
    const testData = 'TestData from Loader 1';
    return json({
        testData,
    });
};

const TestPage = () => {
    const data = useLoaderData();
    return (
        <>
            <div className={'bg-red-500 p-3'}>
                <p className={'text-white'}>Static from loader 1</p>
                <div className={'text-white'}>{data.testData}</div>
                <Outlet />
            </div>
        </>
    );
};

export default TestPage;
