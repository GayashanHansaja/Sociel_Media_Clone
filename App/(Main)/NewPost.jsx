import { SafeAreaView, StyleSheet, Text, View ,ScrollView, TouchableOpacity, Image, Pressable } from 'react-native'
import React, { useRef, useState } from 'react'
import { theme } from '../../helpers/theme'
import { hp,wp } from '../../helpers/common'
import TextEditor from '../../components/TextEditor'
import Avatar from '../../components/Avatar'
import { useAuth } from '../../context/AuthContext'
import { useNavigation } from '@react-navigation/native'
/* import { TouchableOpacity } from 'react-native' */
import Icon from '../../assets/icons/Icon'
import Button from '../../components/Button'
import * as ImagePicker from 'expo-image-picker'
import { getSupabaseFileUrl } from '../../services/imageService'
import { Video } from 'expo-av'
import { Alert } from 'react-native'
import { createUpdatePost } from '../../services/postService'
import { BottomSheet } from '@rneui/themed'



const NewPost = () => {
  const {user} = useAuth();
  const bodyRef =useRef();
  const editorRef =useRef(null);
  const navigation = useNavigation();
  const [Loading,setLoading] = useState(false);
  const [file ,setFile] = useState(file)

  const onPick = async (isImage) => {

    let mediaConfig = {
      mediaTypes: ['images'/* , 'videos' */],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    }
    
    if(!isImage){
      mediaConfig={
        mediaTypes: [/* 'images',  */'videos'],
        allowsEditing:true,
      }

    }
    let result = await ImagePicker.launchImageLibraryAsync(mediaConfig);
    console.log('file:' ,result.assets[0]);
    if(!result.canceled){
      setFile(result.assets[0]);
    }
  }
  const isLocalFile= file =>{
    if(!file) return null;
    if(typeof file == 'object') return true;
      return false;
    
  }
  const getFileType = file=>{
    if(!file) return null;

    if(isLocalFile(file)){
      return file.type;
    }

    if(file.includes('postImage')){
      return 'image';
    }
    return 'video';
  }

  const getFileUri= file =>{
    if(!file) return null;
    if(isLocalFile(file)){

      return file.uri;
    }
    return getSupabaseFileUrl(file)?.uri;
  }

  const onsubmit = async () => {
    if(!bodyRef.current && !file){
      Alert.alert('post','Please add some content or media to post');
      return;
  }

  let data ={
    file,
    body:bodyRef.current,
    userId:user?.id,
  }

  setLoading(true);

  let res =await createUpdatePost(data);

  setLoading(false);

  if(res.success){
    setFile(null);
    bodyRef.current = '';
    editorRef.current?.setContentHTML('');
    navigation.goBack();
  }else{
    Alert.alert('post',res.msg);
  }
  
}
console.log('file uri:',getFileUri(file));
  return (
    <SafeAreaView style={[styles.SafeAreaView, {backgroundColor:'white'}]}>
      {/* <View style={styles.container}> */}
        <ScrollView contentContainerStyle={{gap:20}}>
          {/* avatar */}
          <View style={styles.header}>
            <Avatar
             uri={user?.image} 
             size={hp(6.5)} 
             rounded={theme.radius.xl}/>

             <View style={{gap:2}}>
                <Text style={styles.username}>{user && user.name}</Text>
                <Text style={styles.publicText}>AnyOne</Text>
             </View>
          </View>

          <View style={styles.textEditor}>
              <TextEditor editorRef={editorRef} onChange={body => bodyRef.current= body}/>
          </View>
          {
            file && (
              <View style={styles.file}>
                {
                  getFileType(file) == 'video'? (
                    <Video 
                      style={{flex:1}}
                      source={{
                        uri:getFileUri(file)
                      }}
                      useNativeControls
                      resizeMode='cover'
                      isLooping/>
                  ):(
                    <Image source ={{uri:getFileUri(file)}} resizeMode ='cover' style={{flex:1}}/>
                  )
                }

                <Pressable style={styles.closeIcon} onPress={()=>setFile(null)}>
                  <Icon name='delete' size={20} color='white' />
                </Pressable>
              </View>
            )
          }

          <View style={styles.media}>
            <Text style={styles.addImageText}>
              Add your Postt
            </Text>
            <View style={styles.mediaIcons}>
              <TouchableOpacity onPress={() => onPick(true)}>
                <Icon name="Image" size={30} color={theme.colors.accent} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onPick(false)}>
                <Icon name="Camera" size={30} color={theme.colors.accent} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
        <Button
          buttonStyle={{ height: hp(6.2) }}
          title="Post"
          loading={Loading}
          hasShadow={false}
          onPress={onsubmit}
        />
      </View>
      {/* </View> */}

    </SafeAreaView>
  )
}

export default NewPost

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    paddingHorizontal: wp(1),
  },
  container:{
    flex: 1,
    marginBottom: 30,
    paddingHorizontal: wp(4),
    gap: 20
  },

  title: {
    // marginBottom: 10,
    fontSize: hp(2.5),
    fontWeight: theme. fonts.semibold,
    color: theme.colors.text,
    textAlign: 'center'
  },
    
    header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: hp(1.5),
    },
  username: {
    fontSize: hp(2.2),
    fontWeight: theme. fonts.semibold,
    color: theme. colors.text,
  },
    
    avatar: {
    height: hp(6.5),
    width: hp(6.5),
    borderRadius: theme. radius.xl,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
    },
    
    publicText: {
    fontSize: hp(1.7),
    fontWeight: theme. fonts.medium,
    color: theme. colors.textLight,
    },
  textEditor: {
    // marginTop: 10,
    },
    
  media: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    padding: 12,
    paddingHorizontal: 18,
    borderRadius: theme. radius.xl,
    borderCurve: 'continuous',
    borderColor: theme.colors.textLight,
    marginBottom: 20
    },
    
  mediaIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
    },
    
  addImageText: {
    fontSize: hp(1.9),
    fontWeight: theme. fonts.semibold,
    color: theme.colors.text,
    },
  

  imageIcon: {
    // backgroundColor: theme.colors.gray,
    borderRadius: theme. radius.md,
    // padding: 6,
    },
  file: {
    height: hp(30),
    width: '100%',
    borderRadius: theme. radius.xl,
    overflow: 'hidden',
    borderCurve: 'continuous'
    },
    video: {},
    
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 50,
    padding: 5,
    backgroundColor: 'rgba(100,0,0,0.6)',
    // shadowColor: theme.colors.textLight,
    // shadowOffset: {width: 0, height: 3},
    // shadowOpacity: 0.6,
    // shadowRadius: 8
    
    }
})