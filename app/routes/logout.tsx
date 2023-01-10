import type {LoaderFunction} from "@remix-run/node";
import {destroySession} from "~/utils/session/session.server";


export const loader: LoaderFunction = async ({request}) => {
    return await destroySession(request, '/login')
}


export const LogoutPage = () => {
    return (
        <></>
    )
}