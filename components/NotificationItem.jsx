import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { theme } from '../helpers/theme'
import { hp } from '../helpers/common'
import Avatar from './Avatar'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'

const NotificationItem = ({item ,navigation}) => {

    /* const navigation=useNavigation(); */
    const handleClick = () => {
       
        let {postId,commentId}=JSON.parse(item?.data);

        navigation.navigate('PostDetails',{postId,commentId});

    }
    console.log('Item:', item);
    const createdAt =moment(item?.created_at).format('MMM DD');
  return (
   <TouchableOpacity style={styles.container} onPress={handleClick}>
    <Avatar uri ={item.sender.image}
    size={hp(5)}
    rounded={theme.radius.xxl}/>

    <View style={styles.nameTitle}>
        <Text style={styles.text}>
            {
                item?.sender?.name
            }
        </Text>
        <Text style={[styles.text,{color:theme.colors.textDark}]}>
            {
                item?.title
            }
        </Text>
    </View>
        <Text style={[styles.text,{color:theme.colors.textLight}]}>
            {
                createdAt
            }
         </Text>   

   </TouchableOpacity>
  )
}

export default NotificationItem

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: theme.colors.darkLight,
        padding: 15,
        // paddingVertiEal: 12,
        borderRadius: theme. radius.xxl,
        borderCurve: 'continuous'
    },
        
        nameTitle: {
        flex: 1,
        gap: 2,
        },
        
        text: {
        fontSize: hp(1.6),
        fontWeight: theme.fonts.medium,
        color: theme.colors. text,
        },
})