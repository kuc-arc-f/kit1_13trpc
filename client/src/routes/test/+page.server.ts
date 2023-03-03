import { dev } from '$app/environment';
import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
    //@ts-ignore
    default: async ({ cookies, request}) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');
		if (!email) {
			return fail(400, { email, missing: true });
		}         
		if (!password) {
			return fail(400, { password, missing: true });
		}         
console.log("email=", email);       
console.log("password=", password);
        //TODO
        const user = {name: "name1111"};
//        cookies.set('sessionid', user);
        return {
            success: true,
            user: user,
        };
    }
};
