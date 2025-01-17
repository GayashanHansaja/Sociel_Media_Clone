import { Alert,StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { theme } from '../helpers/theme'
import { hp } from '../helpers/common'
import moment from 'moment'
import Avatar from './Avatar'
import Icon from '../assets/icons/Icon'


const CommentItem = ({
    item,
    canDelete=false,
    onDelete=()=>{},
    highlight=false
}) => {
    const handleDelete=()=>{
                Alert.alert('Confirm','Are you sure!',[
                    {
                        text:'Cancel',
                        onPress:()=>console.log('no'),
                        style:'cancel'
                    },
                    {
                        text:'Delete',
                        onPress:()=>onDelete(item),
                        style:'descructive'
                    }
                ])
            }
    const createdAr=moment(item?.created_at).format('MMM DD');
  return (
    <View style={styles.container}>
        <Avatar uri={item?.user?.image}
        />
        <View style={[styles.content,highlight && styles.highlight]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between',alignItems: 'center'}}>
                <View style={styles.nameContainer}>
                    <Text >{item?.user?.name}</Text>
                    <Text>.</Text>
                    <Text >{createdAr}</Text>
                </View>
                {
                    canDelete &&(
                        <TouchableOpacity onPress={handleDelete}>
                            <Icon name='delete' size={20} color='red'/>
                        </TouchableOpacity>

                    )
                }

            </View>
            <Text style={[styles.text, {fontWeight:'bold'}]}>{item?.text}</Text>

        </View>

    </View>
  )
}

export default CommentItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        gap: 2,
    },
        
    content:{
  /*       backgroundColor: 'rgba(0,0,0,0.06)', */
        flex: 1,
        gap: 7,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: theme.radius.md,
        borderCurve: 'continuous',
    },
    highlight: {
        borderWidth: 0.2,
        backgroundColor: 'gray',
        borderColor: theme. colors.dark,
        shadowColor: theme.colors.dark,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.3, 
        shadowRadius: 8,
        elevation: 5
        },
        
        nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        },
        
        text: {
        fontSize: hp(1.6),
        fontWeight: theme. fonts.medium,
        color: theme.colors.text,
        }
})