import { SafeAreaView, StyleSheet, Text, View ,Pressable ,ScrollView,Alert } from 'react-native'
import React from 'react'
import { theme } from '../../helpers/theme'
import { wp, hp } from '../../helpers/common'
import { getUserImageSource } from '../../services/imageService'
import Icon from '../../assets/icons/Icon'
import {useAuth} from '../../context/AuthContext';
import { Image } from 'expo-image'
import Input from '../../components/Input'
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Loading from '../../components/Loading'



const EditProfile = () => {

  const {user:curruntUser }=useAuth();
  const [Loading,setLoading] = useState(false);

  const [user,setUser] = useState({
    name:'',
    bio:'',
    image:null,
    phone:'',
    address:'',
  });

  useEffect(()=>{
    if(curruntUser){
      setUser({
        name:curruntUser.name || '',
        bio:curruntUser.bio || '',
        image:curruntUser.image || null,
        phone:curruntUser.phone || '',
        address:curruntUser.address || '',
      });
    }
  },[curruntUser]);
  const onPickImage = async () => {}

  const onsubmit = async () => {
    let userData={...user};
    let {name ,phoneNumber,address,bio,image}=userData;
    if(!name || !phoneNumber || !address || !bio){
      Alert.alert('Error','Please fill all the fields');
      return;
    }

    setLoading(true);
  }

 /*  let imageSource= getUserImageSource(user.image); */
  return (
    <SafeAreaView style={[styles.SafeAreaView, {backgroundColor:'white'}]}>
      <View style={styles.container}>
        <ScrollView style={{flex: 1}}>

          {/* form */}
          <View style={styles.form}>
            {/* <View style={styles.avatarContainer}>
              <Image source={imageSource} style={styles.avatar} />
              <Pressable style={styles.cameraIcon} onPress={onPickImage}><Icon name='camera' size={20} strokeWidth={2.5}/></Pressable>
            </View> */}
            <Text style={{fontSize:hp(1.5), color :theme.colors.text}} >
              Plase fill your profile details
            </Text>
            <Input
              icon={<Icon name='user'/>}
              placeholder='Enter your name'
              value={user.name}
              onChangeText={value=>setUser({...user,name:value})}
            />
            <Input
              icon={<Icon name='Call'/>}
              placeholder='Enter your phone number'
              value={user.phone}
              onChangeText={value=>setUser({...user,phone:value})}
            />
            <Input
              icon={<Icon name='location'/>}
              placeholder='Enter your location'
              value={user.address}
              onChangeText={value=>setUser({...user,address:value})}
            />
            <Input
              
              placeholder='Enter your bio'
              value={user.bio}
              multiline={true}
              Style={styles.bio}
              onChangeText={value=>setUser({...user,bio:value})}
            />

            <Button title='Update' loading={Loading} onPress={onsubmit} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  SafeAreaView: {
      flex: 1,
      paddingHorizontal: wp(1),
    },
  

  container: {
    flex: 1,
    paddingHorizontal: wp(4)
  },
    
    avatarContainer: {
    height: hp(14),
    width: hp(14),
    alignSelf: 'center'
    },
    
    avatar: {
    width: '100%',
    height: '100%',
    borderRadius: theme.radius.xxl*1.8,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: theme.colors.darkLight
    },
    cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    padding: 8,
    borderRadius: 50,
    backgroundColor: 'white',
    shadowColor: theme.colors.textLight,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 5,
    },
  form: {
    gap: 18,
    marginTop: 20,
  },
    
    input: {
    flexDirection: 'row',
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xxl,
    borderCurve: 'continuous',
    padding: 17,
    paddingHorizontal: 20,
    gap: 15
    },
    
    bio: {
    flexDirection: 'row',
    height: hp(15),
    alignItems: 'flex-start',
    paddingVertical: 15,
    },
})