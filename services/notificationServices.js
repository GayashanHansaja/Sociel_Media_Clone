import { supabase } from "../lib/supabase";

 export const createNotification = async(notification)=>{

    try {
        const {data, error} = await supabase
        .from('notification')
        .insert(notification)

        .select()
        .single()
        

        if(error){
            console.log('Error notification:', error);
            return {success:false, msg: 'notification failed'};
        }

        return {success:true, data:data};
       
    } catch (error) {
        console.log('notification faild:', error);
        return {success:false, msg: 'notification failed'};
        
    }
  }

  export const fetchNotificaitons = async(reciverId)=>{

    try {
        const {data, error} = await supabase
        .from('notifications')

        .select(`*,
            user:users(id , name, image),
            postLikes(*),
            comments(*, user:users(id, name, image))`)
        .eq('id', postId)
        .order("created_at",{ascending:false ,foriegnTable:'comments'})
        .single();

        if(error){
            console.log('Error fetch postdetail :', error);
            return {success:false, msg: 'Postdetails fetching failed'};
        }

        return {success:true, data:data};
       
    } catch (error) {
        console.log('Error fetch post:', error);
        return {success:false, msg: 'Post creation failed'};
        
    }
  }
