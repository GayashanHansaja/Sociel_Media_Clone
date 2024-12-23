  import { supabase } from "../lib/supabase";
import { uploadFile } from "./imageService";

  export const createUpdatePost = async(post)=>{

    try {
        //upload  image
        if(post.file && typeof post.file== 'object'){
            let isImage = post?.file?.type == 'image';
            let folderName =isImage ? 'postImages ': 'postVideos';
            let fileResult = await uploadFile(folderName, post?.file?.uri, isImage);
            if(fileResult.success){
                post.file = fileResult.data;
            }else{
                return fileResult;
            }
        }

        const{data, error} = await supabase
        .from('posts')
        .upsert(post)
        .select()
        .single();

        if(error){
            console.log('Error creating post:', error);
            return {success:false, msg: 'Post creation failed'};
        }
    } catch (error) {
        console.log('Error creating post:', error);
        return {success:false, msg: 'Post creation failed'};
        
    }
  }

  export const fetchPosts = async(limit=10)=>{

    try {
        const {data, error} = await supabase
        .from('posts')

        .select(`*,
            user:users(id , name, image)`)
        .order('created_at', {ascending:false})
        .limit(limit);

        if(error){
            console.log('Error fetch post:', error);
            return {success:false, msg: 'Post fetching failed'};
        }

        return {success:true, data:data};
       
    } catch (error) {
        console.log('Error fetch post:', error);
        return {success:false, msg: 'Post creation failed'};
        
    }
  }