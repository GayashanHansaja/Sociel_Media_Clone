import { SafeAreaView, StyleSheet, Text, View ,Button, Alert, Pressable, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import {useAuth} from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { theme } from '../../helpers/theme';
import {wp,hp} from '../../helpers/common'
import Icon from '../../assets/icons/Icon'
import Avatar from '../../components/Avatar';
import { useNavigation } from '@react-navigation/native';
import { fetchPosts } from '../../services/postService';
import PostCard from '../../components/PostCard';
import Loading from '../../components/Loading';
import { getUserDAta } from '../../services/userServices';
import ScreenWrapper from '../../components/ScreenWrapper';

var limit=0;
const Home = () => {
  
  const {user, setAuth} =useAuth();
  const navigation = useNavigation();
  const [hasMore, setHasMore] = useState(true);

  const [posts, setPosts] = useState([]);
  const [notificationCount,setNotificationCount]=useState(0);

  const handlePostEvent = async (payload) => {
    

    if(payload.eventType === 'INSERT' && payload?.new?.id) 
      {let newPost = {...payload.new};
    let res =await getUserDAta(newPost.userId);
    newPost.postLikes=[];
    newPost.comments=[{count:0}];
    newPost.user = res.success? res.data :{};
    setPosts(prevPosts =>[newPost,...prevPosts]);
    }

    if(payload.eventType == 'DELETE' && payload.old.id){
      setPosts(prevPosts =>{
        let updatedPosts = prevPosts.filter(post => post.id !=payload.old.id);

        return updatedPosts;
      })
    }


    if(payload.eventType === 'UPDATE' && payload?.new?.id) {

      setPosts(prevPosts =>{
        let updatedPosts= prevPosts.map(post=>{
          if(post.id === payload.new.id){
            post.body=payload.new.body;
            post.file=payload.new.file; 
          }
          return post;
              });
              return updatedPosts;
    }
  )
}
}

const handleNewNotification = async (payload) => {
  console.log('got  new notification:', payload);
  if(payload.eventType === 'INSERT' && payload.new.id){
    setNotificationCount(prevCount => prevCount+1);
  }
}
useEffect(() => {
/*   if (!user?.id) {
    console.log('User ID not available. Skipping subscription setup.');
    return;
  }
  console.log('Setting up notification subscription for user:', user.id);

   */
  let postChannel=supabase
  .channel('posts')
  .on ('postgres_changes',{event:'*',schema:'public',table:'posts'},handlePostEvent)
  .subscribe();
  /* getPosts(); */
/*   console.log('User ID for notification subscription:', user.id); */
  let notificationChannel=supabase
  .channel('notifications')
  .on ('postgres_changes',{event:'INSERT',schema:'public',table:'notifications',filter:`reciverId=eq.${user.id}`},/* (payload) => { */
  /*   console.log('Notification received:', payload); */
    handleNewNotification/* (payload); */
 /*  } */)
  .subscribe(/* (status) => {
    console.log('Notification channel status:', status */);
/* 
    if (status === 'SUBSCRIBED') {
      console.log('Subscription successfully established.');
    } else if (status === 'CLOSED') {
      console.error('Subscription closed unexpectedly!');
    } else if (status === 'ERROR') {
      console.error('Error establishing subscription.');
    }
  });
   */
  return ()=> {
    supabase.removeChannel(postChannel);
/*     console.log('Cleaning up notification subscription...'); */
    supabase.removeChannel(notificationChannel);
  }
  
  
},[/* user?.id */])

const getPosts = async () => {
  if(!hasMore) return null;
  limit+=2;
  let res=await fetchPosts(limit);
  
  if(res.success){
      if(posts.length == res.data.length) setHasMore(false);
    setPosts(res.data);
  }
  
  
}

//console.log('user',user);

/*  const onLogout = async () =>{
  
  const {error} = await supabase.auth.signOut();
  if(error){
    Alert.alert('sign out',"Error signing out")
  }
} */
return (
  <ScreenWrapper bg='white'>

    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Threadify</Text>

        <View style={styles.icon}>

          <Pressable onPress={() =>{ setNotificationCount(0)
            navigation.navigate('notification')}}>
            <Icon name='heart' size={hp(3.2)} strokeWidth={2.2}  color={theme.colors.text} />
              {
                notificationCount>0 && (
                  <View style ={styles.pill}>
                    <Text style={styles.pillText}>{notificationCount}</Text>
                  </View>
                )
              }
          </Pressable>

          <Pressable onPress={() => navigation.navigate('newPost')}>
            <Icon name='plus' size={hp(3.2)} strokeWidth={3} color={theme.colors.text} />  
          </Pressable>

          <Pressable onPress={() => navigation.navigate('profile')}>
            <Avatar 
              uri={user?.image}
              size={hp(4.4)}
              rounded={theme.radius.xl}
              style={{borderWidth:1}}
            />
          </Pressable>
          
        </View>
      
      </View>
        <FlatList 
          data={posts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listStyle}
          keyExtractor={item=> item.id.toString()}
          renderItem={({item})=><PostCard 
            item={item}
            currentUser={user}
            navigation={navigation}  
            />
            } 

            onEndReached={()=>{

              getPosts()

              console.log('end reached')
            }
            }
            onEndReachedThreshold={0}
            ListFooterComponent={hasMore?(
              <View style={{margineVertical: posts.length==0? 200:30}}>
                <Loading/>
                </View>
            ):(
              <View style={{marginBottom:30}}>
                <Text style={styles.noPosts}>No more posts</Text>
                </View>)
            
            }  
        />
    </View>
   {/*  <Button title='logout' onPress={onLogout} /> */}
  </ScreenWrapper>
)
};




export default Home

const styles = StyleSheet.create({

  container:{
    flex: 1
  },

icon :{
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 18,
},

header: {
flexDirection: 'row',
alignItens: 'center',
justifyContent: 'space-between',
marginHorizontal: wp(4),

},

title: {
color: theme.colors.text,
fontSize: hp(3.2),
fontWeight: theme. fonts.bold
},

avatarImage: {
height: hp(4.9),
width: wp(6),
gap: 10,
borderRadius: theme.radius.sm,
borderCurve: 'continuous',
borderColor: theme.colors.gray,
borderWidth: 3
},


  listStyle: {
    paddingTop: 20,
    paddingHorizontal: wp(4)
  },
    
    noPosts: {
    fontSize: hp(2),
    textAlign: 'center',
    color: theme.colors.text
    },
    
    pill: {
    position: 'absolute',
    right: -10,
    top: -4,
    height: hp(2.2),
    width: hp(2.2),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: theme.colors.accent
    },
    
    pillText: {
    color: 'white',
    fontSize: hp(1.2),
    fontWeight:theme.fonts.bold
    },
})