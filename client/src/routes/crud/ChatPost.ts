import LibDbSession from '$lib/LibDbSession';
import LibConfig from '$lib/LibConfig';
import { PUBLIC_API_URL } from '$env/static/public'
//
const ChatPost = {
  /**
   * getList:
   * @param key: any
   *
   * @return
   */ 
  getList: async function(chatId: number): Promise<any>
  {
    try {
//  console.log("PUBLIC_API_URL=", PUBLIC_API_URL);
        let items = [];
        const item = {
          chatId: chatId,
          userId : 0,
        }
        const url = PUBLIC_API_URL + "/chat_posts/index";
        const body = JSON.stringify(item);
        const res = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},      
          body: body
        });
        const json = await res.json()  
        items = json.data
//    console.log(json)	      
      return items;
    } catch (e) {
      console.error(e);
    }
  },
}
export default ChatPost;
