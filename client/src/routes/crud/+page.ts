import { dev } from '$app/environment';
import { error } from '@sveltejs/kit';
import LibAuth from '$lib/LibAuth';
import LibConfig from '$lib/LibConfig';
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
const getList = async function (): Promise<any> 
{
  try {   
//console.log("PUBLIC_API_URL=", PUBLIC_API_URL);    
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
//console.log(items);
    return {
      items: items,
    };
//    throw error(404, 'Not found');
  }
/*
*/