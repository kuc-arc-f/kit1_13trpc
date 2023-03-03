import LibDbSession from '$lib/LibDbSession';
import LibConfig from '$lib/LibConfig';
import { PUBLIC_API_URL } from '$env/static/public'
//
const Test2 = {
  /**
   * get:
   * @param key: any
   *
   * @return
   */      
  addPost : async function(name: string) : Promise<any>
  {
    try{
      const url = PUBLIC_API_URL + "/chats/create";
      const item = {
        name: name,
        content : '',
        userId:  0,
      }
      const body = JSON.stringify(item);		
      const res = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
        body: body
      });
      if (res.status !== 200) {
        throw new Error(await res.text());
      }
      const json = await res.json()
console.log(json);      
      if (json.ret !== 'OK') {
        throw new Error("Error, json.ret <> OK");
      }
    } catch (e) {
      console.error(e);
    }
  },  

}
export default Test2;
