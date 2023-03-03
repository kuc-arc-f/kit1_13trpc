import { error } from '@sveltejs/kit';
import LibConfig from '$lib/LibConfig';
import LibAuth from '$lib/LibAuth';
import LibDbSession from '$lib/LibDbSession';
import ChatPost from '../ChatPost';
import Chat from '../Chat';
//type
type IPostItem = {
  id: number,
  title : string,
  content : string,
  category : string,
  createdAt: string,
}
//
/** @type {import('./$types').PageLoad} */
export async function load({ params}) {
  try{
    console.log("id=", params.id);
    const item = await Chat.get(Number(params.id))
console.log(item);
    return {
        id: params.id,
        item: item,
    };  
  } catch (e) {
    console.error(e);
    throw new Error('Error , ');
  }
//    throw error(404, 'Not found');
}
/*
*/