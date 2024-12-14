import { SafeAreaView, StyleSheet, Text, View ,ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { theme } from '../../helpers/theme'
import { hp,wp } from '../../helpers/common'
import TextEditor from '../../components/TextEditor'
import Avatar from '../../components/Avatar'
import { useAuth } from '../../context/AuthContext'
import { useNavigation } from '@react-navigation/native'

const NewPost = () => {
  const {user} = useAuth();
  const bodyRef =useRef();
  const editorRef =useRef();
  const navigation = useNavigation();
  const [Loading,setLoading] = useState(false);
  const [file ,setFile] = useState(file);
  return (
    <SafeAreaView style={[styles.SafeAreaView, {backgroundColor:'white'}]}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{gap:20}}>
          {/* avatar */}
          <View style={styles.header}>
            <Avatar
             uri={user?.image} 
             size={hp(6.5)} 
             rounded={theme.radius.xl}/>

             <View style={{gap:2}}>
                <Text style={styles.username}>{user && user.name}</Text>
                <Text style={styles.publicText}>AnyOne</Text>
             </View>
          </View>

          <View style={styles.textEditor}>
              <TextEditor editorRef={editorRef} onChange={body => bodyRef.currunt= body}/>
          </View>
        </ScrollView>
      </View>

    </SafeAreaView>
  )
}

export default NewPost

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    paddingHorizontal: wp(1),
  },
  title: {
    // marginBottom: 10,
    fontSize: hp(2.5),
    fontWeight: theme. fonts.semibold,
    color: theme.colors.text,
    textAlign: 'center'
  },
    
    header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    },
  username: {
    fontSize: hp(2.2),
    fontWeight: theme. fonts.semibold,
    color: theme. colors.text,
  },
    
    avatar: {
    height: hp(6.5),
    width: hp(6.5),
    borderRadius: theme. radius.xl,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)'
    },
    
    publicText: {
    fontSize: hp(1.7),
    fontWeight: theme. fonts.medium,
    color: theme. colors.textLight,
    },
  textEditor: {
    // marginTop: 10,
    },
    
  media: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1.5,
    padding: 12,
    paddingHorizontal: 18,
    borderRadius: theme. radius.xl,
    borderCurve: 'continuous',
    borderColor: theme.colors.gray
    },
    
  mediaIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
    },
    
  addImageText: {
    fontSize: hp(1.9),
    fontWeight: theme. fonts.semibold,
    color: theme.colors.text,
    },
  

  imageIcon: {
    // backgroundColor: theme.colors.gray,
    borderRadius: theme. radius.md,
    // padding: 6,
    },
  file: {
    height: hp(30),
    width: '100%',
    borderRadius: theme. radius.xl,
    overflow: 'hidden',
    borderCurve: 'continuous'
    },
    video: {},
    
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    // shadowColor: theme.colors.textLight,
    // shadowOffset: {width: 0, height: 3},
    // shadowOpacity: 0.6,
    // shadowRadius: 8
    
    }
})