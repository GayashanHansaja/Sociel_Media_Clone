  import { supabase } from "../lib/supabase";
import { uploadFile } from "./imageService";

  export const createUpdatePost = async(post)=>{

    try {
        //upload  image
        if(post.file && typeof post.file== 'object'){
            let isImage = post?.file?.type == 'image';
            let folderName =isImage ? 'postImages': 'postVideos';
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

        return {success:true, data:data};
    } catch (error) {
        console.log('Error creating post:', error);
        return {success:false, msg: 'Post creation failed'};
        
    }
  }

  export const fetchPosts = async(limit=4)=>{

    try {
        const {data, error} = await supabase
        .from('posts')

        .select(`*,
            user:users(id , name, image),
            postLikes(*)`)
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

  export const createPostLike = async(postLike)=>{

    try {
        const {data, error} = await supabase
        .from('postLikes')
        .insert(postLike)

        .select()
        .single()
        

        if(error){
            console.log('Error insert like:', error);
            return {success:false, msg: 'Like failed'};
        }

        return {success:true, data:data};
       
    } catch (error) {
        console.log('like faild:', error);
        return {success:false, msg: 'Like failed'};
        
    }
  }

  export const removePostLikes = async(postId ,userId)=>{

    try {
        const {error} = await supabase
        .from('postLikes')
        .delete()
        .eq('postId', postId)
        .eq('userId', userId);
        

        if(error){
            console.log('error remove like', error);
            return {success:false, msg: 'Like failed'};
        }

        return {success:true};
       
    } catch (error) {
        console.log('like remove faild:', error);
        return {success:false, msg: 'Like remove failed'};
        
    }
  }

  