import { Alert, Pressable, SafeAreaView, StyleSheet, Text, Touchable,FlatList, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { AuthProvider } from '../../context/AuthContext'
import Icon from '../../assets/icons/Icon'
import { theme } from '../../helpers/theme'
import { hp ,wp} from '../../helpers/common'
import { supabase } from '../../lib/supabase'
import Avatar from '../../components/Avatar'
import { getUserDAta } from '../../services/userServices'
import { fetchPosts } from '../../services/postService'
import PostCard from '../../components/PostCard'
import Loading from '../../components/Loading'
import ScreenWrapper from '../../components/ScreenWrapper'
import Header from '../../components/Header'

var limit=0;
const Profile = () => {
    
    const [posts, setPosts] = useState([]);

    const [hasMore, setHasMore] = useState(true);
    const {user ,setAuth}=useAuth();
    /* console.log('AuthContext value:', { user, setAuth }) */
    const navigation=useNavigation();

    /* logout function */
    const onLogout = async () =>{
        
        const {error} = await supabase.auth.signOut();
        if(error){
          Alert.alert('sign out',"Error signing out")
        }
      }

    const getPosts = async () => {
        limit+=5;
        let res=await fetchPosts(limit, user.id);
    
        if(res.success){
            if(posts.length === res.data.length) setHasMore(false);
            setPosts(res.data);
        }
    
    
    }

    /* Handle logout */
    const handleLogout=async ()=>{/* 
        await supabase.auth.signOut();
        setAuth(null);
        navigation.navigate('welcome');
 */
        Alert.alert('Logout','Are you sure!',[
            {
                text:'no',
                onPress:()=>console.log('no'),
                style:'destructive'
            },
            {
                text:'Yes',
                onPress:()=>onLogout(),
                style:'cancel'
            }
        ])
    }
    


  return (
    <ScreenWrapper bg="white">
        <FlatList 
          data={posts}
          ListHeaderComponent={ <UserHeader user={user} navigation={navigation} handleLogout={handleLogout}/>}
          ListHeaderComponentStyle={{marginBottom:40}}
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
            <View style={{marginVertical:30}}>
                <Text style={styles.noPosts}>No more posts</Text>
                </View>)
                }  
        />
        

        
    </ScreenWrapper>
  )
}

/* const UserHeader = ({user,navigation})=>{
    return (
        <View>
            <Text>user Header</Text>
        </View>
    )
} */

/* const Profilebody = ()=>{
    return (
        <AuthProvider>
            <Profile />
        </AuthProvider>
    )
} */
const UserHeader = ({user,navigation,handleLogout})=>{
    return (
        <View style={{flex:1 ,backgroundColor:'white', paddingHorizontal:wp(1.2)}}>
            <View>
                <Header title="Profile" showBackButton={true}/>
                <TouchableOpacity style={styles.logoutButton}onPress={handleLogout}>
                <Icon name='logout' size={24} color='red' />
            </TouchableOpacity>
            </View>
            <View style={{gap:15}}>
                <View style={styles.avatarContainer}>

                    <Avatar
                    uri={user?.image}
                    size={hp(12)}
                    rounded={theme.radius.xl}
                    />
    

                    <Pressable style={styles.editIcon} onPress={()=>navigation.navigate('editProfile')}>
                        <Icon name='edit' size={20} color={theme.colors.accent} />
                    </Pressable>
                </View>


                {/* username and address */}
                <View style={{alignItems:'center' , gap:4}}>
                    <Text style={styles.userName}>{user && user.name}</Text>
                    <Text style={styles.infoText}>{user && user.address}</Text>
                </View>

                {/* email,phoneNumber ,bio */}
                <View style={{gap:10}}>
                    <View style={styles.info}>
                        <Icon name='mail' size={20} color={theme.colors.text} />
                        <Text style={styles.infoText}>{user && user.email}</Text>
                    </View>
                    {
                        user && user.phoneNumber &&(

                            <View style={styles.info}>
                                <Icon name='Call' size={20} color={theme.colors.text} />
                                <Text style={styles.infoText}>{user && user.phoneNumber}</Text>
                            </View>
                        )
                    }

                    {
                        user && user.bio &&(
                            <Text style={styles.infoText}>{user.bio}</Text>
                        )
                    }

                </View>
            </View>
        </View>
    )
}


export default Profile

const styles = StyleSheet.create({

container:{
    marginTop: hp(3),
    flex: 1,
},

headerContainer: {
marginHorizontal: wp(4),
marginBottom: 20,
marginTop:30
},

headerShape: {
width: wp(100),
height: hp(20)
},

avatarContainer: {
height: hp(12),
width: hp(12),
alignSelf: 'center'
},
editIcon: {
    position: 'absolute',
    bottom: 0,
    right: -12,
    padding: 7,
    borderRadius: 50,
    backgroundColor: 'white',
    shadowColor: theme.colors.accent,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7
},
        
userName: {
    fontSize: hp(3),
    fontWeight: '350',
    color: theme. colors.text
},
        
info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
},
        
infoText: {
    fontSize: hp(1.6),
    fontWeight: '500',
    color: theme. colors.textLight
},

logoutButton: {
    position: 'absolute',
    right: 0,
    padding: 5,
    borderRadius: 50,

    marginTop: hp(1),
    
},
    
listStyle: {
    paddingHorizontal: wp(4),
    paddingBottom: 30,
},
    
noPosts: {
    fontSize: hp(2),
    textAlign: 'center',
    color: theme. colors.text
}
})