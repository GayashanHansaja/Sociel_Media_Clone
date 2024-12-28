import { supabase } from "../lib/supabase";

 export const createNotification = async(notification)=>{

    try {
        const {data, error} = await supabase
        .from('notifications')
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
           sender: senderId(id,name,image)`)
        .eq('reciverId', reciverId)
        .order("created_at",{ascending:false });
  

        if(error){
            console.log('Error fetch notifications :', error);
            return {success:false, msg: 'notifications fetching failed'};
        }

        return {success:true, data:data};
       
    } catch (error) {
        console.log('Error fetch notifications:', error);
        return {success:false, msg: 'notifications creation failed'};
        
    }
  }
