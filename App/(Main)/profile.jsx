import { Alert, Pressable, SafeAreaView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { AuthProvider } from '../../context/AuthContext'
import Icon from '../../assets/icons/Icon'
import { theme } from '../../helpers/theme'
import { hp ,wp} from '../../helpers/common'
import { supabase } from '../../lib/supabase'
import Avatar from '../../components/Avatar'
const Profile = () => {
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

    /* Handle logout */
    const handleLogout=async ()=>{/* 
        await supabase.auth.signOut();
        setAuth(null);
        navigation.navigate('welcome');
 */
        Alert.alert('Confirm','Are you sure!',[
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
    <SafeAreaView style={styles.SafeAreaView} bg='white' flex={1}>
        <View>
            <TouchableOpacity style={styles.logoutButton}onPress={handleLogout}>
                <Icon name='logout' size={24} color='red' />
            </TouchableOpacity>
        </View>

        <View style={styles.container}>

            <View style={{gap:15}}>
                <View style={styles.avatarContainer}>

                    <Avatar
                    uri={user?.image}
                    size={hp(12)}
                    rounded={theme.radius.xxl}
                    />

                    <Pressable style={styles.editIcon} onPress={()=>navigation.navigate('editProfile')}>
                        <Icon name='edit' size={20} color={theme.colors.text} />
                    </Pressable>
                </View>


                {/* username and address */}
                <View style={{alignItems:'center' , gap:4}}>
                    <Text style={styles.userName}>{user && user.name}</Text>
                    <Text style={styles.infoText}>{user && user.address}</Text>
                </View>

                {/* email,phone ,bio */}
                <View style={{gap:10}}>
                    <View style={styles.info}>
                        <Icon name='mail' size={20} color={theme.colors.text} />
                        <Text style={styles.infoText}>{user && user.email}</Text>
                    </View>
                    {
                        user && user.phone &&(

                            <View style={styles.info}>
                                <Icon name='call' size={20} color={theme.colors.text} />
                                <Text style={styles.infoText}>{user && user.phone}</Text>
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

        
    </SafeAreaView>
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



export default Profile

const styles = StyleSheet.create({

SafeAreaView: {
    flex: 1,
    paddingHorizontal: wp(3),
},


container:{
    marginTop: hp(3),
    flex: 1,
},

headerContainer: {
marginHorizontal: wp(4),
marginBottom: 20
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
    shadowColor: theme.colors.textLight,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7
},
        
userName: {
    fontSize: hp(3),
    fontWeight: '500',
    color: theme. colors. textDark
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
    borderRadius: theme. radius.sm,
    backgroundColor: 'white',
    
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