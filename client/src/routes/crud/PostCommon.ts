import LibDbSession from '$lib/LibDbSession';
import LibConfig from '$lib/LibConfig';
//
const PostCommon = {
  /**
   * getPost:
   * @param key: any
   *
   * @return
   */ 
  getPost: async function(): Promise<any>
  {
    try {
      let ret = false;
      return ret;
    } catch (e) {
      console.error(e);
    }
  },

}
export default PostCommon;
