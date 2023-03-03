
import { error } from '@sveltejs/kit';
//import LibSqlite from '$lib/LibSqlite';
import Chat from '../../Chat';
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
export async function load({ params }) {
console.log("id=", params.id);
  const item = await Chat.get(Number(params.id))
  console.log(item);
  return {
      id: item.id,
      name: item.name,
    };  
//    throw error(404, 'Not found');
}
