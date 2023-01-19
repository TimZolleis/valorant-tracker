import { Form, useActionData } from '@remix-run/react';
import { TextInput } from '~/components/form/TextInput';
import { PasswordInput } from '~/components/form/PasswordInput';
import DefaultButton from '~/components/form/button/DefaultButton';
import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { RiotAuthenticationClient } from '~/utils/api/valorant/RiotAuthenticationClient';
import { createLoginSession } from '~/utils/session/session.server';
import FormError from '~/components/form/error/FormError';
import { WhiteButton } from '~/components/form/button/WhiteButton';

type ActionData = {
    error?: string;
};
export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const username = formData.get('username')?.toString();
    const password = formData.get('password')?.toString();
    if (!username || !password) {
        return json({
            error: 'Please provide username and password',
        });
    }
    try {
        const user = await new RiotAuthenticationClient().authorize(username, password);
        return createLoginSession(user, '/');
    } catch (exception: any) {
        return json({
            error: exception.message,
        });
    }
};

const LoginPage = () => {
    const actionData = useActionData<ActionData>();
    return (
        <>
            <Form method={'post'} className={'flex flex-col w-full items-center mt-5'}>
                <div className={' md:w-6/12 ring ring-1 ring-gray-600 rounded-xl p-10'}>
                    <h2
                        className={
                            'text-center font-inter font-bold text-headline-medium text-white'
                        }>
                        Login
                    </h2>
                    <p className={'font-inter text-label-medium text-gray-400 text-center'}>
                        Please login with your Riot Games credentials
                    </p>
                    <div className={'mt-5 space-y-5'}>
                        <TextInput label={'Username'} id={'username'} />
                        <PasswordInput label={'Password'} id={'password'} />
                        <FormError text={actionData?.error} />
                    </div>
                    <div className={'mt-5 w-full'}>
                        <WhiteButton doesSubmit={true}>
                            <p className={'text-body-medium'}>Login</p>
                        </WhiteButton>
                    </div>
                </div>
            </Form>
        </>
    );
};

export default LoginPage;
