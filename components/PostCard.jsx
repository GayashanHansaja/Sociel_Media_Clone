import { StyleSheet, Text, View ,TouchableOpacity, Share, Alert} from 'react-native'
import React from 'react'
import { theme } from '../helpers/theme'
import { hp, stripHtmlTags, wp  } from '../helpers/common'
import Avatar from './Avatar'
import moment from 'moment'
import Icon from '../assets/icons/Icon'
import RenderHtml from 'react-native-render-html'
import { Image } from 'expo-image'
import { downloadFile, getSupabaseFileUrl } from '../services/imageService'
import { createPostLike, removePostLikes } from '../services/postService'
import { useState,useEffect } from 'react'
import Loading from './Loading'
import { useNavigation } from '@react-navigation/native'

const textStyle ={
    color:theme.colors.textDark,
    fontSize:hp(1.7),
}

const tagStyle = {
    div:textStyle,
    p:textStyle,
    ol:textStyle,
    h1:{
        color:theme.colors.textDark,
    },
    h2:{
        color:theme.colors.textDark,
    }
}
const PostCard =({
    item,
    currentUser,
    navigate,
    hasShadow=true,
    showMoreIcon=true,
    showDelete=false,
    onDelete=()=>{},
    onEdit=()=>{}

})=>{
    const shadowStyles= {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.85,
        shadowRadius: 6,
        elevation:1

    }
    const navigation=useNavigation();

    //like things
    const [likes,setLikes]=useState([])
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        setLikes(item?.postLikes)
    }, [])
    const openPostDetails = () => {
        if(!showMoreIcon) return null;
        navigation.navigate('PostDetails', { postId: item?.id });
    }

    const onLike= async ()=>{

        if(liked){
            //remove like
            let updatedLikes=likes.filter(like=>like.userId !=currentUser?.id)

            setLikes([...updatedLikes])
            let res= await removePostLikes(item?.id, currentUser?.id);
            console.log('removed',res);
            if(!res.success){
                Alert.alert('post','something went wrong');
            }

        }else {
            //add like
            let data={
                userId:currentUser?.id,
    
                postId:item?.id
            }
            setLikes([...likes,data])
            let res= await createPostLike(data);
            console.log('added:',res);
            if(!res.success){
                Alert.alert('Like failed','something went wrong');
            }

        }

    }
    const liked=likes.filter(like=>like.userId==currentUser?.id)[0]? true:false;
    
   //share things
   const onShare =async ()=>{
    let content= {message: stripHtmlTags(item?.body)}
    if(item?.file){
        let url=await downloadFile(getSupabaseFileUrl(item?.file).uri);
        setLoading(false);
        content.url=url
    }
    Share.share(content);
   }

   const handlePostDelete = async () => {
    Alert.alert('Confirm','Are you sure!',[
                        {
                            text:'Cancel',
                            onPress:()=>console.log('no'),
                            style:'cancel'
                        },
                        {
                            text:'Delete',
                            onPress:()=>onDelete(item),
                            style:'descructive'
                        }
                    ])

   }

/*     const onShare = async () => {
        try {
          let content = { message: stripHtmlTags(item?.body) }; // Initialize the share content with the post body.
      
          // Check if there is an image or video file to share.
          if (item?.file) {
            const fileUrl = getSupabaseFileUrl(item?.file).uri; // Get the full file URL.
            const localFileUri = await downloadFile(fileUrl); // Download the file locally.
      
            if (localFileUri) {
              content.url = localFileUri; // Add the local file URI to the share content.
            } else {
              console.warn('Failed to download the file.');
            }
          }
      
          // Share the content.
          const result = await Share.share(content);
      
          if (result.action === Share.sharedAction) {
            console.log('Content shared successfully.');
          } else if (result.action === Share.dismissedAction) {
            console.log('Share dismissed.');
          }
        } catch (error) {
          console.error('Error sharing post:', error);
        }
      }; */
      
    const createdAt= moment(item?.created_ad).format('MMM DD');
  return (
    <View style={[styles.container/* , hasShadow && shadowStyles */]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
            <Avatar
                size={hp(4.5)}
                uri={item?.user?.image}
                rounded={theme.radius.xl}
                />
            <View  style ={{gap:2}}>

                <Text style={styles.username}>{item?.user?.name}</Text>
                <Text style={styles.postTime}>{createdAt}</Text>

            </View>
        </View>
        <View>
            {
                showMoreIcon && (

            <TouchableOpacity onPress={openPostDetails}>
                <Icon name="menu" size={hp(3.4)} strokeWidth={3} color={theme.colors.text} />
            </TouchableOpacity>
                )
            }
            {
                showDelete && currentUser.id == item?.userId && (
                    <View style ={styles.actions}>
                        <TouchableOpacity onPress={()=>onEdit(item)}>

                            <Icon name='edit' size={hp(2.5)} strokeWidth={1.9} color={theme.colors.text} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handlePostDelete}>
                            <Icon name='delete' size={hp(2.5)} strokeWidth={1.9} color='red' />
                        </TouchableOpacity>
                    </View>

                )
            } 
            </View>
      </View>
      {/* body of post */}

      <View style={styles.content}>
        <View style={styles.postBody}>
            {
                item?.body && (
                    <RenderHtml contentWidth={wp(80)} source={{html:item?.body}}
                    tagsStyles={tagStyle}/>
                    
                )

            }
        </View>


        {/* post image */}
        {
            item?.file && item?.file?.includes('postImages') && (
                <Image
                    source={getSupabaseFileUrl(item?.file)}
                    transition={100}
                    style={styles.postMedia}
                    contentFit='cover'
                    />
            )
        }
{/* post videos */}
        {
            item?.file && item?.file?.includes('postVideo') && (
                <Image
                    source={getSupabaseFileUrl(item?.file)}
                    transition={100}
                    style={styles.postMedia}
                    useNativeControls
                    resizeMode='cover'
                    isLooping
                    />
            )
        }
      </View>

        {/* footer */}
        <View style={styles.footer}>
            <View style={styles.actions}>
                <TouchableOpacity onPress={onLike}style={styles.footerButton}>
                    <Icon name='heart' size={hp(2.5)} strokeWidth={1.9} fill={liked? 'red' : 'transparent'}  color={liked? 'red' : theme.colors.textDark} />
                    <Text style={styles.count}>{likes?.length}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openPostDetails}style={styles.footerButton}>
                    <Icon name='comment' size={hp(2.5)} strokeWidth={1.9} color={theme.colors.text} />
                    <Text style={styles.count}>{item?.comments[0]?.count}</Text>
                </TouchableOpacity>
            </View>
            <View>
                {
                    loading ?(
                        <Loading size='small'/>
                    ):(
            <TouchableOpacity onPress={onShare} style={styles.footerButton}>
                <Icon name='share' size={hp(2.5)} strokeWidth={1.9} color={theme.colors.text} />
            </TouchableOpacity>

                    )
                }
            </View>
            </View>
    </View>
  )
}

export default PostCard

const styles = StyleSheet.create({
    container: {
        gap: 10,
        marginBottom: 45,
        borderRadius: theme. radius.xxl*1.1,
        borderCurve: 'continuous',
        
        paddingVertical: 5,
        backgroundColor: 'white',
/*         borderWidth: 0.5, */
    /*     borderColor: theme. colors.gray, */
       /*  shadowColor: '#000' */
    },
        
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingLeft: 10
    },
        
    username: {
        fontSize: hp(1.7),
        color: theme. colors.textDark,
        fontWeight: theme.fonts.medium,
    },
        
    postTime: {
        fontSize: hp(1.4),
        color: theme.colors.textLight,
        fontweight: theme.fonts.medium,
    },
        
    content: {
        gap: 4,
        // marginBottom: 10T
    },
        
    postMedia: {
        height: hp(35),
        width: '100%',
        borderRadius: theme. radius.sm,
        borderCurve: 'continuous'
    }, 
    postBody: {
        marginLeft: 5,
    },
        
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
        
    footerButton: {
        marginLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap:3
    },
        
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginLeft: 10
    },
        
    count: {
        color: theme. colors.text,
        fontSize: hp(1.8)
    },
})