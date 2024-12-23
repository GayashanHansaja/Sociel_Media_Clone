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

var limit=0;
const Home = () => {
  
  const {user, setAuth} =useAuth();
  const navigation = useNavigation();

  const [posts, setPosts] = useState([]);

  /* const handlePostEvent = async (payload) => {
    if(payload.eventType === 'INSERT' && payload?.new?.id) 
      {let newPost = {...payload.new};
    let res =await getUserDAta(newPost.userId);
    newPost.user = res.success? res.data :{};
    setPosts(prevPosts =>[newPost,...prevPosts]);
}
  } */
  useEffect(() => {

   /*  let postChannel=supabase
    .channel('posts')
    .on ('postgress_changes',{event:'*',schema:'public',table:'posts'},handlePostEvent)
    getPosts();
return ()=> {
  supabase.removeChannel(postChannel);
}
 */

  },[])

  const getPosts = async () => {
    limit+=10;
    let res=await fetchPosts(limit);

    if(res.success){
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
    <SafeAreaView style={styles.SafeAreaView}>

      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.title}>Beaver</Text>

          <View style={styles.icon}>

            <Pressable onPress={() => navigation.navigate('notification')}>
              <Icon name='heart' size={hp(3.2)} strokeWidth={2.5}  color={theme.colors.text} />  
            </Pressable>

            <Pressable onPress={() => navigation.navigate('newPost')}>
              <Icon name='plus' size={hp(3.2)} strokeWidth={2.5} color={theme.colors.text} />  
            </Pressable>

            <Pressable onPress={() => navigation.navigate('profile')}>
              <Avatar 
                uri={user?.image}
                size={hp(4.4)}
                rounded={theme.radius.sm}
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
              navigate={navigation.navigate}  
              />
              } 
              ListFooterComponent={(
                <View style={{margineVertical: posts.length==0? 200:30}}>
                  <Loading/>
                  </View>
              )}  
          />
      </View>
     {/*  <Button title='logout' onPress={onLogout} /> */}
    </SafeAreaView>
  )
};




export default Home

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    paddingHorizontal: wp(2.5),
  },

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
marginBottom: 10,
marginHorizontal: wp(4),
marginTop: hp(1.3)
},

title: {
color: theme.colors.text,
fontSize: hp(3.2),
fontWeight: theme. fonts.bold
},

avatarImage: {
height: hp(4.3),
width: hp(4.3),
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