import { decode } from 'base64-arraybuffer'
import * as FileSystem from 'expo-file-system'
import { cache } from 'react'
import { supabase } from '../lib/supabase'
import { supabaseUrl } from '../helpers/dbconnect'


export const getUserImageSource= imagePath =>{
    if(imagePath){
        return getSupabaseFileUrl(imagePath)
    }else{
        return require('../assets/defaultUser.png')
    }
}

export const getSupabaseFileUrl= filePath =>{
    if(filePath){
        return{uri:`${supabaseUrl} /storage/v1/object/public/uploads/${filePath}`}
    }else{
        console.log('No file path')
    }
}

export const uploadFile =async (folderName ,fileUri ,isImage =true) =>{
    try {
        let fileName  =getFilePath (folderName ,isImage);

        const fileBase64 =await FileSystem.readAsStringAsync(fileUri, 
            {encoding: FileSystem.EncodingType.Base64});
            let imageData =decode (fileBase64);//array buffer

            let {data ,error} =await supabase 
            .storage
            .from('uploads')
            .upload(fileName,imageData, {

                cacheControl: '3600',
                upsert:false,
                contentType:isImage? 'image/*':'video/*'
            })


            if(error){
                console.log("Error uploading file:", error);

                return {success:false, message: 'File upload failed'};
            }
            console.log("File uploaded successfully:", data);

            return {success:true, data:data.path};
    }catch (error){
        console.log("Error uploading file:", error);

        return {success:false, message: 'File upload failed'};
    }
}

export const getFilePath =(folderName, isImage) =>{
    return `/${folderName}/${(new Date()).getTime()}${isImage? '.png':'.mp4'}`;
}