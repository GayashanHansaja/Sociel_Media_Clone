import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { startTransition, useEffect,useRef,useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { createComment, fetchPostsDetails } from '../../services/postService'
import { theme } from '../../helpers/theme'
import { hp, wp } from '../../helpers/common'
import PostCard from '../../components/PostCard'
import { useAuth } from '../../context/AuthContext'
import { useNavigation } from '@react-navigation/native'
import Loading from '../../components/Loading'
import Input from '../../components/Input'
import { Icon } from '@rneui/themed'
import CommentItem from '../../components/CommentItem'


const PostDetails = () => {
  const route = useRoute()
  const {user}=useAuth();
  const navigation=useNavigation();
  const [startLoading, setStartLoading] = useState(true)
  const inputRef =useRef (null)
  const commentRef =useRef ('')
  const [loading, setLoading] = useState(false)

  const { postId } = route.params || {};

  const [post, setPost] = useState(null)

  useEffect(()=>
{
    getPostDetails();
},[]);

const getPostDetails=async()=>{
    //fetch post details here
    let res=await fetchPostsDetails(postId);
    if(res.success){
        setPost(res.data);}
        setStartLoading(false);
}
const onNewComment =async () => {
  if(!commentRef.current) return null;
  let data={
    userId: user?.id,
    postId:post?.id,
    text: commentRef.current
}
    
    //add comment here
    setLoading(true);
    let res= await createComment(data);

    setLoading(false);
    if(res.success){
      inputRef?.current?.clear();
      commentRef.current="";
    }else{
      Alert.alert('comment',res.msg);
    }

}
if(startLoading){
    return (
        <View style={styles.center}>
            <Loading />
        </View>
    )
}
if(!post){
    return (
        <View style={[styles.center,{justifyContent:'flex-start',marginTop:100}]}>
            <Text style={styles.notFound}>Post not found</Text>
        </View>
    )
}
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        <PostCard 
        item={{...post,comments:[{count:post.comments.length}]}}
        currentUser={user}

        navigate={navigation.navigate}
        hasShadow={false}
        showMoreIcon={false}/>

        {/* comment input */}

        <View style={styles.inputContainer}>
          <Input 
          inputRef={inputRef}
            placeholder="Type Comment ...."
            onChangeText={value=>commentRef.current=value}
            placeholderTextColor={theme.colors.textLight}
            containerStyle={{flex:1 , height:hp(6.2),borderRadius:theme.radius.xl}}
            />
            {
              loading? (
                <View style={styles.loading}>

                  <Loading />
                  </View>
              ):(

                <TouchableOpacity style={styles.sendIcon} onPress={onNewComment}>
                  <Icon name="send" color={theme.colors.accent}/>
                </TouchableOpacity>
              )
            }

        </View>
        {/* comments */}
          <View style={{margineVertical:15 ,gap:17}}>
            {
              post?.comments.map(comment =>
                <CommentItem
                key={comment?.id?.toString()}
                 item={comment}
                 canDelete={user.id == comment.userId || user.id == post.userId}
                 />
              )
            }
            {
              post?.comments?.length==0 && (
                <Text style={{color:theme.colors.text,marginLeft:5}}>No comments yet</Text>
              )
            }
          </View>

         
      </ScrollView>
    </View>
  )
}

export default PostDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: wp(7)
    },
        
        inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
        },
        
        list: {
        paddingHorizontal: wp(4),
        },

sendIcon:{

    borderColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    borderCurve: 'continuous',
    height: hp(5.8),
    width: hp(5.8)
},

center: {

    flex: 1,
    aligmItems: 'center',
    justifyContent: 'center'
},

notFound: {
fontSize: hp(2.5),
color: theme.colors.text,
fontWeight: theme. fonts.medium,
},

loading: {
height: hp(5.8),
width: hp(5.8),
justifyContent: 'center',
aligmItems: 'center',
transform: [{scale: 1.3}]
}
})