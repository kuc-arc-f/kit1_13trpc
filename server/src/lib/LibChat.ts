import { exit } from 'process';
import LibConfig from '../config';
require('dotenv').config();
import LibPg from './LibPg';

const  LibChat = {
  /**
  * getItems
  * @param
  *
  * @return object
  */  
  getItems :async function(): Promise<any>
  {
    try {
      const retArr = { ret: LibConfig.NG_CODE, data: {}}
      const text = `
       SELECT * FROM public."Chat" ORDER BY id DESC LIMIT 100
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
  * @param req: any
  *
  * @return object
  */  
   search :async function(req: any): Promise<any>
   {
     try {
       const body = req.body;
//console.log(body);
       const retArr = { ret: LibConfig.NG_CODE, data: {}}
       const text = `
        SELECT * FROM public."Chat"
         WHERE
         name like '%${body.seachKey}%'
         ORDER BY id DESC LIMIT 100
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
      SELECT * FROM public."Chat" where id = ${id}
      `;
      const result = await LibPg.get(text);
      let data = {};
      if(result.length > 0){
        data = result[0];
      }
console.log(data);
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
      INSERT INTO public."Chat" (name, content, "userId", "createdAt", "updatedAt") 
      VALUES($1, $2, $3, current_timestamp, current_timestamp) RETURNING *
      `;  
    const values = [body.name, body.content, body.userId]
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
  /**
  * update
  * @param req: any
  *
  * @return object
  */     
  update :async function(req: any): Promise<any>
  {
    try {
      console.log(req.body);
      const body = req.body;
      const text = `
      UPDATE public."Chat" SET name = $1,
      content = $2,
      "updatedAt" = current_timestamp
      WHERE id = $3
      RETURNING *
      `;  
      const values = [body.name, body.content, body.id]
      const result = await LibPg.execute(text, values);
console.log(result);
      return {
        ret: LibConfig.OK_CODE, data: result 
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error , update: '+ err);
    }    
  },  
  /**
  * update
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
      DELETE FROM public."Chat" WHERE id = $1
      RETURNING *
      `;  
      const values = [body.id]
      const result = await LibPg.execute(text, values);
console.log(result);
      return {
        ret: LibConfig.OK_CODE, data: result
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error , delete: '+ err);
    }     
  },             
}
export default LibChat;
