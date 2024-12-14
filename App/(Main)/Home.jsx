import { SafeAreaView, StyleSheet, Text, View ,Button, Alert, Pressable} from 'react-native'
import React from 'react'
import {useAuth} from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { theme } from '../../helpers/theme';
import {wp,hp} from '../../helpers/common'
import Icon from '../../assets/icons/Icon'
import Avatar from '../../components/Avatar';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  
  const {user, setAuth} =useAuth();
  const navigation = useNavigation();

  console.log('user',user);

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
marginHorizontal: wp(4)
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