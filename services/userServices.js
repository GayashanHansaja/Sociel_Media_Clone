import { supabase } from '../lib/supabase';
export const getUserDAta = async (userId) =>{
    try {
        const {data ,error} = await supabase 
        .from('users')
        .select ()
        .eq('id', userId)
        .single();

        if (error) throw error;

        return {success:true, data};
    } catch (error) {
        console.log('Got error',error);
        return {success:false ,msg:error.message};
    }
}