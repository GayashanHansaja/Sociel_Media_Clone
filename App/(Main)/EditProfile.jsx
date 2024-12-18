import { SafeAreaView, StyleSheet, Text, View ,Pressable ,ScrollView,Alert } from 'react-native'
import React from 'react'
import { theme } from '../../helpers/theme'
import { wp, hp } from '../../helpers/common'
import { getUserImageSource, uploadFile } from '../../services/imageService'
import Icon from '../../assets/icons/Icon'
import {useAuth} from '../../context/AuthContext';
import { Image } from 'expo-image'
import Input from '../../components/Input'
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import {updateUser} from '../../services/userServices';
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';


const EditProfile = () => {

  const {user:currentUser,setUserData}=useAuth();
  const [Loading,setLoading] = useState(false);
  const navigation = useNavigation();

  const [user,setUser] = useState({
    name:'',
    bio:'',
    image:null,
    phoneNumber:'',
    address:'',
  });

   useEffect(()=>{
    if(currentUser){
      setUser({
        name:currentUser.name || '',
        bio:currentUser.bio || '',
        image:currentUser.image || null,
        phoneNumber:currentUser.phoneNumber || '',
        address:currentUser.address || '',
      });
    }
  },[currentUser]);
  const onPickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      })

      if (!result.canceled){
        setUser({...user, image:result.assets[0]});
      }
  }

  const onsubmit = async () => {

    let userData ={ ...user};
    const { name, phoneNumber, address, bio ,image} = userData;
  
    if (!name || !phoneNumber || !address || !bio || !image) {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }
  
    setLoading(true);

    if(typeof image == 'object'){
      let imageRes =await uploadFile('profile', image?.uri ,true);
      if(imageRes.success){
        userData.image = imageRes.data;}
      else userData.image = null;
    }

    const res =await updateUser(currentUser?.id, userData);

    setLoading(false);

    if (res.success){
      setUserData({...currentUser,...userData});
      navigation.goBack();
    }
    
    console.log('update user result',res);
    setTimeout(() => {
      Alert.alert('Success', 'Profile updated successfully!');
      
    }, 1000); // Simulates server response delay
  };

  let imageSource =user.image && typeof user.image == 'object'? user.image.uri :getUserImageSource(user?.image);
  console.log("User object:", user);
  console.log("Image source:", imageSource);

  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.container}>
        <ScrollView style={{flex: 1}}>

          {/* form */}
          <View style={styles.form}>
            <View style={styles.avatarContainer}>
              <Image  source={imageSource /* || require("../../assets/defaultUser.png")  */} style={styles.avatar}/>
               
              <Pressable style={styles.cameraIcon} onPress={onPickImage}><Icon name='Camera' size={20} strokeWidth={2.5}/></Pressable>
            </View>

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
              placeholder='Enter your phoneNumber number'
              value={user.phoneNumber}
              onChangeText={value=>setUser({...user,phoneNumber:value})}
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
              containerStyle={styles.bio}
              onChangeText={value=>setUser({...user,bio:value})}
            />

            <Button title='Update' loading={Loading} onPress={onsubmit}/>
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