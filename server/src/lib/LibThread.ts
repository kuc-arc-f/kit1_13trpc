import { exit } from 'process';
import LibConfig from '../config';
require('dotenv').config();
import LibPg from './LibPg';
const SEARCH_MAX_RECORD = 500;
//
const LibThread = {
  /**
  * getItems
  * @param
  *
  * @return object
  */  
  getItems :async function(req: any): Promise<any>
  {
    try {
      const retArr = { ret: LibConfig.NG_CODE, data: {}}
      console.log(req.body);
      const body = req.body;      
      const text = `
      SELECT public."Thread".id
      ,public."Thread"."chatId"
      ,public."Thread"."userId"
      ,public."Thread".title
      ,public."Thread".body
      ,public."Thread"."createdAt"
      ,public."Thread"."updatedAt"
      ,public."User".id as "UserId"
      ,public."User".name as "UserName"
      FROM public."Thread"
        LEFT OUTER JOIN public."User" ON
        (public."User".id = public."Thread"."userId")
      WHERE public."Thread"."chatPostId" = ${body.chatPostId}
      ORDER BY public."Thread".id DESC LIMIT ${SEARCH_MAX_RECORD}
      `;
      const result = await LibPg.get(text);
//console.log(result);
      retArr.ret = LibConfig.OK_CODE;
      retArr.data = result;
      return retArr;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItems:' +err);
    }          
  },
  /**
  * index_chats : スレッド リスト(chat単位)
  * @param
  *
  * @return object
  */  
  index_chats :async function(req: any): Promise<any>
  {
    try {
      const retArr = { ret: LibConfig.NG_CODE, data: {}}
      console.log(req.body);
      const body = req.body;      
      const text = `
      SELECT public."Thread".id
      ,public."Thread"."chatId"
      ,public."Thread"."chatPostId"
      ,public."Thread"."userId"
      ,public."Thread".title
      ,public."Thread".body
      ,public."Thread"."createdAt"
      ,public."Thread"."updatedAt"
      ,public."User".id as "UserId"
      ,public."User".name as "UserName"
      ,public."Chat".name as "ChatName"
      FROM public."Thread"
        LEFT OUTER JOIN public."User" ON
        (public."User".id = public."Thread"."userId")
        LEFT OUTER JOIN public."Chat" ON
        (public."Chat".id = public."Thread"."chatId")        
      WHERE public."Thread"."chatId" = ${body.chatId}
      ORDER BY public."Thread".id DESC LIMIT ${SEARCH_MAX_RECORD}
      `;
      const result = await LibPg.get(text);
//console.log(result);
      retArr.ret = LibConfig.OK_CODE;
      retArr.data = result;
      return retArr;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , index_chats:' +err);
    }          
  },  
  /**
  * search
  * @param
  *
  * @return object
  */  
   search: async function(req: any): Promise<any>
   {
     try {
       const retArr = { ret: LibConfig.NG_CODE, data: {}}
       console.log(req.body);
       const body = req.body;      
       const text = `
       SELECT public."ChatPost".id
       ,public."ChatPost"."chatId"
       ,public."ChatPost"."userId"
       ,public."ChatPost".title
       ,public."ChatPost".body
       ,public."ChatPost"."createdAt"
       ,public."ChatPost"."updatedAt"
       ,public."User".id as "UserId"
       ,public."User".name as "UserName"
       FROM public."ChatPost"
         LEFT OUTER JOIN public."User" ON
         (public."User".id = public."ChatPost"."userId")
       WHERE "chatId" = ${body.chatId}
       AND "body" like '%${body.seachKey}%'
       ORDER BY id DESC LIMIT ${SEARCH_MAX_RECORD}
       `;
       const result = await LibPg.get(text);
 //console.log(result);
       retArr.ret = LibConfig.OK_CODE;
       retArr.data = result;
       return retArr;      
     } catch (err) {
       console.error(err);
       throw new Error('Error , search:' +err);
     }          
   },  
  /**
  * getLastTime
  * @param
  *
  * @return object
  */      
  getLastTime :async function(req: any): Promise<any>
  {
    try {
      const retArr = { ret: LibConfig.NG_CODE, data: {}}
//console.log(req.body);
      const body = req.body;      
      const text = `
      SELECT public."ChatPost".id
      ,public."ChatPost"."createdAt"
      FROM public."ChatPost"
      WHERE "chatId" = ${body.chatId}
      ORDER BY id DESC LIMIT 1
      `;
      const result = await LibPg.get(text);
//console.log(result);
      let row = {};
      if(result.length > 0) {
        row = result[0];
      }
      retArr.ret = LibConfig.OK_CODE;
      retArr.data = row;
      return retArr;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getLastTime:' +err);
    }          
  },
  /**
  * getLastThread
  * @param chatId: number
  *
  * @return object
  */
  getLastThread :async function(chatId: number): Promise<any>
  {
    try {
//      const retArr = { ret: LibConfig.NG_CODE, data: {}}
//console.log(req.body);
      const text = `
      SELECT public."Thread".id
      ,public."Thread"."createdAt"
      FROM public."Thread"
      WHERE public."Thread"."chatId" = ${chatId}
      ORDER BY id DESC LIMIT 1
      `;
      const result = await LibPg.get(text);
//console.log(result);
      let row = {};
      if(result.length > 0) {
        row = result[0];
      }
      return row;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getLastThread:' +err);
    }          
  }, 
  /**
  * getItem
  * @param id: number
  *
  * @return Promise<any>
  */    
  getItem :async function(id: number): Promise<any>
  {
    try {
      const retArr = { ret: LibConfig.NG_CODE, data: {}}
      const text = `
      SELECT * FROM public."Thread" where id = ${id}
      `;
      const result = await LibPg.get(text);
      let data = {};
      if(result.length > 0){
        data = result[0];
      }
//console.log(data);
      retArr.ret = LibConfig.OK_CODE;
      retArr.data = data;
      return retArr;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItem:' +err);
    }    
  },
  /**
  * create
  * @param req: any
  *
  * @return object
  */   
  create :async function(req: any): Promise<any>
  {
    try {
      const body = req.body;
      console.log(req.body);
      const text = `
      INSERT INTO public."Thread" (title, body, "userId", "chatId", "chatPostId", "createdAt", "updatedAt") 
      VALUES($1, $2, $3, $4, $5, current_timestamp, current_timestamp) RETURNING *
      `;  
    const values = [body.title, body.body, body.userId, body.chatId, body.chatPostId]
    const result = await LibPg.execute(text, values);
//console.log(result);
      return {
        ret: LibConfig.OK_CODE, data: result
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error , create: '+ err);
    }    
  },
  updateTask :async function(args: any){
  },
  /**
  * delete
  * @param req: any
  *
  * @return object
  */    
  delete :async function(req: any): Promise<any>
  {
    try {
console.log(req.body);
      const body = req.body;
      const text = `
      DELETE FROM public."Thread" WHERE id = $1
      RETURNING *
      `;  
    const values = [body.id]
    const result = await LibPg.execute(text, values);
//console.log(result);
      return {
        ret: LibConfig.OK_CODE, data: result
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error , addTask: '+ err);
    }      
  },             
}
export default LibThread;
