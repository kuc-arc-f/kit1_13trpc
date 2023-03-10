import { error } from '@sveltejs/kit';
import { trpc } from '../../utils/trpc';

//
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  try {   
    const userList = await trpc.getUserList.query();
    console.log(userList);    
    //console.log("PUBLIC_API_URL=", PUBLIC_API_URL);    
    return {
      userList: userList,
    };  
  } catch (e) {
    console.error(e);
  }  
//    throw error(404, 'Not found');
}
