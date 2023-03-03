import { dev } from '$app/environment';
export const prerender = true;

import { error } from '@sveltejs/kit';
import LibAuth from '$lib/LibAuth';
import LibDbSession from '$lib/LibDbSession';
import { PUBLIC_API_URL } from '$env/static/public'

//type
type TPostItem = {
  id: number,
  title: string,
  content: string,
  createdAt: string,
  categoryName: string, 
}
//
const getList = async function (): Promise<any> 
{
  try {   
    let postItem: any[] = [];
    const url = PUBLIC_API_URL + "/chats/index";
    const response = await fetch(url);
    const json = await response.json();
    postItem = json.data;
//console.log(postItem);
    return postItem;
  } catch (e) {
    console.error(e);
  }
}
//
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    let items = [];
    items = await getList();
console.log(items);
    return {
      items: items,
    };
//    throw error(404, 'Not found');
}
/*
*/
