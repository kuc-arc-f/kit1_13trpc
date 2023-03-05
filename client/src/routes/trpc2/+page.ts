import { error } from '@sveltejs/kit';
import { trpc } from '../../utils/trpc';

//
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  try {   
    const taskList = await trpc.getTaskList.query();
    //const userList = await trpc.getUserList.query();
    console.log(taskList);    
    return {
      userList: taskList,
    };  
  } catch (e) {
    console.error(e);
  }  
//    throw error(404, 'Not found');
}
