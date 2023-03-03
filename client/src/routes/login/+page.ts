import { error } from '@sveltejs/kit';
import LibDbSession from '$lib/LibDbSession';
import LibConfig from '$lib/LibConfig';

//type

/**
* loginCheck
* @param
*
* @return
*/ 
const loginCheck = async function () {
    try {
        console.log("testGet");
        const d = await LibDbSession.get(LibConfig.SESSION_KEY_USER);
console.log(d);
    } catch (e) {
        console.error(e);
    }
}
//
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
//    await loginCheck();
    return {
    };  
//    throw error(404, 'Not found');
}
