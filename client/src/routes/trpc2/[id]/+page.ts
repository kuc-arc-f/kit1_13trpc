import { error } from '@sveltejs/kit';
import LibConfig from '$lib/LibConfig';
import LibAuth from '$lib/LibAuth';
import LibDbSession from '$lib/LibDbSession';
import { trpc } from '../../../utils/trpc';

//
/** @type {import('./$types').PageLoad} */
export async function load({ params}) {
  try{
    console.log("id=", params.id);
		const task = await trpc.getTask.query(params.id);
console.log(task);    
    return {
        id: params.id,
        item: task,
    };  
  } catch (e) {
    console.error(e);
    throw new Error('Error , ');
  }
//    throw error(404, 'Not found');
}
/*
*/