import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { fetchNotificaitons } from '../../services/notificationServices';
import { theme } from '../../helpers/theme';
import { hp, wp } from '../../helpers/common';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useNavigation } from '@react-navigation/native';
import NotificationItem from '../../components/NotificationItem';

const Notification = () => {
  const [notifications,setNotifications]= useState([]);
  const {user}= useAuth();
  const navigation=useNavigation();

  useEffect(() => {
    getNotifications();
  },[]);

  const getNotifications=async()=>{
    let res=await fetchNotificaitons(user.id);
    if(res.success) setNotifications(res.data);
  }
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.listStyle}>
          {
            notifications.map(item =>{

              return(
                <NotificationItem key={item?.id}
                 item={item}
                 navigation={navigation} />
              )
            }
            )
          }
          {
            notifications.length==0 && (
              <Text style={styles.noData}>No notifications</Text>
            )
          }

        </ScrollView>

      </View>
    </ScreenWrapper>

  )
}

export default Notification

const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingHorizontal: wp(4),
    },

    listStyle: {
    paddingVertical: 20,
    gap: 10
    },
    
    noData: {
    fontSize: hp(1.8),
    fontWeight: theme. fonts.medium,
    color: theme.colors.text,
    textAlign: 'center',
    },
})