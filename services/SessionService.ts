'use server';

import { routes } from '@/config/routes';
import TMDBRequestTokenDto from '@/models/dto/TMDBAuthenticationDto';
import { authTMDB } from '@/services/AxiosService';
import dayjs from 'dayjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

type UserPayload = {
    user: string;
    expires: Date;
    locale: string;
    tmdbToken: string;
};

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const encrypt = async (payload: UserPayload): Promise<string> => {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(payload.expires)
        .sign(secret);
};

const decrypt = async (token: string): Promise<UserPayload> => {
    const { payload } = await jwtVerify(token, secret, {
        algorithms: ['HS256'],
    });
    return payload as UserPayload;
};

const createSession = async (locale: string): Promise<void> => {
    const user = crypto.randomUUID();
    const reqToken = await authTMDB<TMDBRequestTokenDto>(
        routes.authentication.token.new,
    );
    const expires = dayjs().add(12, 'h').toDate();
    const session = await encrypt({
        user,
        expires,
        locale,
        tmdbToken: reqToken.data.request_token,
    });

    const requestCookies = await cookies();
    requestCookies.set('session', session, {
        expires,
        secure: true,
    });
};

const getSession = async (): Promise<UserPayload | null> => {
    const requestCookies = await cookies();
    const session = requestCookies.get('session')?.value;

    if (!session) {
        return null;
    }

    return await decrypt(session);
};

const getLocale = async (): Promise<string> => {
    const session = await getSession();

    if (!session) {
        return 'US';
    }

    return session.locale;
};

export { createSession, getSession, getLocale };
