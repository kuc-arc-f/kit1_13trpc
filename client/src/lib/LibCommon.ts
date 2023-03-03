import moment from 'moment';

const LibCommon = {
  /* postgres, date format */
  converDateString: function(value: any): string
  {
    try{
      let ret = "";
//      let dtObj = new Date(Number(value));
      let dtObj = new Date(value);
      let dt = moment(dtObj);      
      ret = dt.format("YYYY-MM-DD");
      return ret;
    } catch (e) {
      console.log(e);
      throw new Error('error, test1');
    }
  },
  /**
  * converDatetimeString
  * @param
  *
  * @return string
  */    
  converDatetimeString: function(value: any): string
  {
    try{
      let ret = "";
      let dtObj = new Date(value);
      let dt = moment(dtObj);      
      ret = dt.format("YYYY-MM-DD HH:mm");
      return ret;
    } catch (e) {
      console.log(e);
      throw new Error('error, converDatetimeString');
    }
  },
  /**
  * converMmddTimeString : MM/DD HH:MI
  * @param
  *
  * @return string
  */    
   converMmddTimeString: function(value: any): string
   {
     try{
       let ret = "";
       let dtObj = new Date(value);
       let dt = moment(dtObj);      
       ret = dt.format("MM-DD HH:mm");
       return ret;
     } catch (e) {
       console.log(e);
       throw new Error('error, converMmddTimeString');
     }
   },  
  /**
  * getDatetimeArray
  * @param items: array
  *
  * @return array | null
  */      
   getDatetimeArray: function(items: any[]): any
  {
    try{
      const ret: any[] = [];
      items.forEach(function (item: any){
        let dtObj = new Date(item.createdAt);
        let dt = moment(dtObj);      
        let dtStr = dt.format("YYYY-MM-DD HH:mm");        
//console.log(item.createdAt);
        item.dt_str = dtStr;
        ret.push(item);
      });
      return ret;
    } catch (e) {
      console.log(e);
      throw new Error('error, getDatetimeArray');
    }
  },
  /**
  * getMmddhmmArray
  * @param items: array
  *
  * @return array | null
  */      
   getMmddhmmArray: function(items: any[]): any
  {
    try{
      const ret: any[] = [];
      items.forEach(function (item: any){
        let dtObj = new Date(item.createdAt);
        let dt = moment(dtObj);      
        let dtStr = dt.format("MM-DD HH:mm");        
//console.log(item.createdAt);
        item.dt_str = dtStr;
        ret.push(item);
      });
      return ret;
    } catch (e) {
      console.log(e);
      throw new Error('error, getDatetimeArray');
    }
  },
  /**
  * getDateArray
  * @param items: array
  *
  * @return array | null
  */      
   getDateArray: function(items: any[]): any
  {
    try{
      const ret: any[] = [];
      items.forEach(function (item: any){
        let dtObj = new Date(item.createdAt);
        let dt = moment(dtObj);      
        let dtStr = dt.format("YYYY-MM-DD");        
//console.log(item.createdAt);
        item.dt_str = dtStr;
        ret.push(item);
      });
      return ret;
    } catch (e) {
      console.log(e);
      throw new Error('error, getDateArray');
    }
  },  
  /**
  * sendNotify
  * @param
  *
  * @return string | null
  */    
  getBrowserType: function(): string
  {
    let ret = "";
    const agent = window.navigator.userAgent.toLowerCase()

    if (agent.indexOf("msie") != -1 || agent.indexOf("trident") != -1) {
      console.log("ブラウザはInternet Explorerです。")
    } else if (agent.indexOf("edg") != -1 || agent.indexOf("edge") != -1) {
      console.log("ブラウザはEdgeです。")
    } else if (agent.indexOf("opr") != -1 || agent.indexOf("opera") != -1) {
      console.log("ブラウザはOperaです。")
    } else if (agent.indexOf("chrome") != -1) {
//      console.log("ブラウザはChromeです。");
      ret = "chrome";
    } else if (agent.indexOf("safari") != -1) {
      console.log("ブラウザはSafariです。")
    } else if (agent.indexOf("firefox") != -1) {
      console.log("ブラウザはFireFoxです。")
    } else if (agent.indexOf("opr") != -1 || agent.indexOf("opera") != -1) {
      console.log("ブラウザはOperaです。")
    }    
    return ret;
  },
  /**
  * textToLink: URL文字を A tagに変換
  * @param
  *
  * @return string | null
  */   
  textToLink: function(comment: string): string
  {
      try{
      // 正規表現でURLを抽出
      const regexp_url = /(https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+)/g;
//      let linkedComment = comment.replace(regexp_url, '<a href="$1">$1</a>');
      let linkedComment = comment.replace(regexp_url, '<a href="$1" target="_blank">$1</a>');
      // 正規表現で#を抽出
      const regexp_hash = /#+([a-zA-Z0-9亜-熙ぁ-んァ-ヶー-龥朗-鶴.\-_]+)/g;
      linkedComment = linkedComment.replace(
      regexp_hash,
      '<a href="/search?q=$1&type=hash">#$1</a>'
      );
      // 正規表現で@を抽出
      const regexp_at = /@+([a-zA-Z0-9亜-熙ぁ-んァ-ヶー-龥朗-鶴.\-_]+)/g;
      linkedComment = linkedComment.replace(
      regexp_at,
      '<a href="/search?q=$1&type=at">@$1</a>'
      );
      return linkedComment;    
    } catch (e) {
      console.log(e);
      throw new Error('error, textToLink');
    }
  },  
  /**
  * replaceBrString
  * @param
  *
  * @return string | null
  */ 
  replaceBrString: function(value: string): string
  {
    try{
      if(typeof(value) === 'undefined'){
        return "";
      }
      let contentValue = value;
      contentValue = contentValue.replace(/\r?\n/g, '\n');
      contentValue = contentValue.replace(/\n/g, '<br />\n');
      contentValue = this.textToLink(contentValue);
      return contentValue;
    } catch (e) {
      console.log(e);
      throw new Error('error, replaceBrString');
    }
  },
}
export default LibCommon
