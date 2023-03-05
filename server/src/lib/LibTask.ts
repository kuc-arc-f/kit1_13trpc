import LibConfig from '../config';
require('dotenv').config();
import LibPg from './LibPg';

const  LibTask = {
  /**
  * 
  * @param
  *
  * @return
  */   
  getItems :async function(){
    try {
      const text = `
       SELECT * FROM public."Task" ORDER BY id DESC LIMIT 100
      `;
      const client = LibPg.getClient();
      const res = await client.query(text);
      client.end();
//console.log(res.rows);
      return res.rows;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItems:' +err);
    }          
  },    
  /**
  * 
  * @param
  *
  * @return
  */  
  getItem :async function(id: number){
    try {
      const text = `
      SELECT * FROM public."Task" where id = ${id}
      `;
      const client = LibPg.getClient();
      const res = await client.query(text);
      client.end();
      const data = res.rows[0];
//      console.log(data);
      return data;      
    } catch (err) {
      console.error(err);
      throw new Error('Error , getItem:' +err);
    }    
  },
  /**
  * 
  * @param
  *
  * @return
  */  
  addTask :async function(req: any){
    try {
console.log(req);
      const text = `
      INSERT INTO public."Task" (title, content, "userId", "createdAt", "updatedAt") 
      VALUES($1, $2, 0, current_timestamp, current_timestamp) RETURNING *
      `;      
      const values = [req.title, req.content ]
      const client = LibPg.getClient();
      const res = await client.query(text, values);
      client.end();
      const result = res.rows[0];
//console.log(result);
      return {
        ret: LibConfig.OK_CODE, data: result 
      };
//      return res.rows[0];
    } catch (err) {
      console.error(err);
      throw new Error('Error , addTask: '+ err);
    }    
  },
  updateTask :async function(args: any){
  },  
  /**
  * 
  * @param
  *
  * @return
  */  
  deleteTask :async function(id: number){
    try {
  console.log(id);
//  return;
      const text = `
      DELETE FROM public."Task" where id = $1
      RETURNING *
      `;
      const client = LibPg.getClient();
      const values = [id]
      const result = await LibPg.execute(text, values);
      client.end();
//console.log(result);
      return {
        ret: LibConfig.OK_CODE, data: result
      };
    } catch (err) {
      console.error(err);
      throw new Error('Error , deleteTask:' +err);
    }        
  },             
}
export default LibTask;
