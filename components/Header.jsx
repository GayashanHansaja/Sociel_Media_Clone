import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { hp } from '../helpers/common';
import { theme } from '../helpers/theme';
import BackButton from './BackButton';


const Header = ({title, showBackButton =true ,mb=10}) => {
    const navigation = useNavigation();
  return (
    <View style={[styles.container , {marginBottom:mb}]}>
      {
        showBackButton && (
            <View style={styles.backButton}>
                <BackButton navigation={navigation} />
            </View>
        )
      }
      <Text style={styles.title}>{title || ""}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginTop:5,
        gap:10
    },
    title:{
        fontSize:hp(2.7),
        fontWeight:'bold',
        color:theme.colors.text
    },
    backButton:{
        position:'absolute',
        left:0
    }
   
})