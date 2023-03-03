import { dev } from '$app/environment';
import { fail } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import Test2 from './Test2';

/** @type {import('./$types').Actions} */
export const actions = {
  //@ts-ignore
  default: async ({ cookies, request}) => {
      try{
        const data = await request.formData();
        const name = data.get('name');
        if (!name) {
          return fail(400, { name, missing: true });
        }         
console.log("name=", name);       
        await Test2.addPost(name);
      } catch (e) {
        console.error(e);
        return fail(400, { name: "", missing: true });
      }        
// throw redirect(307, '/');
      return {
        success: true,
        user: {},
      };
  }
};
