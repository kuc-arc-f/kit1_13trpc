import { exit } from 'process';
import LibConfig from '../config';
import LibThread from './LibThread';

require('dotenv').config();
import LibPg from './LibPg';
const SEARCH_MAX_RECORD = 500;
//
interface ILastPostItem {
  id: number,
  createdAt: any,
  thread: any,
}

//
const LibChatPost = {
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
      SELECT public."ChatPost".id
      ,public."ChatPost"."chatId"
      ,public."ChatPost"."userId"
      ,public."ChatPost".title
      ,public."ChatPost".body
      ,public."ChatPost"."createdAt"
      ,public."ChatPost"."updatedAt"
      ,public."User".id as "UserId"
      ,public."User".name as "UserName"
      ,public."Chat".name as "ChatName"
      FROM public."ChatPost"
        LEFT OUTER JOIN public."User" ON
        (public."User".id = public."ChatPost"."userId")
      LEFT OUTER JOIN public."Chat" ON
      (public."Chat".id = public."ChatPost"."chatId")
      WHERE "chatId" = ${body.chatId}
      ORDER BY id DESC LIMIT ${SEARCH_MAX_RECORD}
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
console.log(req.body);
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
      let row: ILastPostItem = {id: 0, createdAt:null, thread: {}};
      if(result.length > 0) {
        row = result[0];
      }
      //thread
      const thread = await LibThread.getLastThread(Number(body.chatId));
//console.log(thread);
      row.thread = thread;
      retArr.ret = LibConfig.OK_CODE;
      retArr.data = row;
      return retArr;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getLastTime:' +err);
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
      WHERE "ChatPost".id = ${id}
      `;
      //SELECT * FROM public."ChatPost" where id = ${id}
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
console.log(req.body);
      const body = req.body;
      const text = `
      INSERT INTO public."ChatPost" (title, body, "userId", "chatId", "createdAt", "updatedAt") 
      VALUES($1, $2, $3, $4, current_timestamp, current_timestamp) RETURNING *
      `;  
    const values = [body.title, body.body, body.userId, body.chatId]
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
      let text = `
      DELETE FROM public."ChatPost" WHERE id = $1
      RETURNING *
      `;  
      let values = [body.id]
      let result = await LibPg.execute(text, values);
//console.log(result);
      text = `
      DELETE FROM public."Thread" WHERE public."Thread"."chatPostId" = $1
      RETURNING *
      `; 
      values = [body.id]
      result = await LibPg.execute(text, values);
      return {
        ret: LibConfig.OK_CODE, data: result
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error , delete: '+ err);
    }      
  },             
}
export default LibChatPost;
