import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, event: { request }, resolve }) => {
    const url = new URL(request.url);

    if (event.url.pathname.startsWith('/api')) {
        if (event.request.method === 'OPTIONS') {
            return new Response(null, {
                headers: {
                    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': '*',
                }
            });
        }
    }

    const response = await resolve(event);
    response.headers.append('Access-Control-Allow-Origin', `*`);

    return response;
};