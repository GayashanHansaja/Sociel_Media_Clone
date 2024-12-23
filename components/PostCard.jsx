import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import { theme } from '../helpers/theme'
import { hp, wp  } from '../helpers/common'
import Avatar from './Avatar'
import moment from 'moment'
import Icon from '../assets/icons/Icon'
import RenderHtml from 'react-native-render-html'
import { color } from '@rneui/themed/dist/config'
import { Image } from 'expo-image'
import { getSupabaseFileUrl } from '../services/imageService'

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
    const openPostDetails = () => {}
    const liked=true;
    const likes=[]

    const createdAt= moment(item?.created_ad).format('MMM DD');
  return (
    <View style={[styles.container, hasShadow && shadowStyles]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
            <Avatar
                size={hp(4.5)}
                uri={item?.user?.image}
                rounded={theme.radius.md}
                />
            <View  style ={{gap:2}}>

                <Text style={styles.username}>{item?.user?.name}</Text>
                <Text style={styles.postTime}>{createdAt}</Text>

            </View>
        </View>
            <TouchableOpacity onPress={openPostDetails}>
                <Icon name="menu" size={hp(3.4)} strokeWidth={3} color={theme.colors.text} />
            </TouchableOpacity>
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
                <TouchableOpacity style={styles.footerButton}>
                    <Icon name='heart' size={hp(2.5)} strokeWidth={1.9} fill={liked? 'red' : 'transparent'}  color={liked? 'red' : theme.colors.textDark} />
                    <Text style={styles.count}>{/* {likes?.length} */}1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.footerButton}>
                    <Icon name='comment' size={hp(2.5)} strokeWidth={1.9} color={theme.colors.text} />
                    <Text style={styles.count}>{item?.comments_count}</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.footerButton}>
                <Icon name='share' size={hp(2.5)} strokeWidth={1.9} color={theme.colors.text} />
            </TouchableOpacity>
            </View>
    </View>
  )
}

export default PostCard

const styles = StyleSheet.create({
    container: {
        gap: 10,
        marginBottom: 15,
        borderRadius: theme. radius.xxl*1.1,
        borderCurve: 'continuous',
        padding: 10,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: theme. colors.gray,
        shadowColor: '#000'
    },
        
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
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
        gap: 10,
        // marginBottom: 10T
    },
        
    postMedia: {
        height: hp(40),
        width: '100%',
        borderRadius: theme. radius.xl,
        borderCurve: 'continuous'
    }, 
    postBody: {
        marginLeft: 5,
    },
        
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
        
    footerButton: {
        marginLeft: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
        
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18,
    },
        
    count: {
        color: theme. colors.text,
        fontSize: hp(1.8)
    },
})