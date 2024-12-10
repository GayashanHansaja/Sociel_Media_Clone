import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from '../assets/icons/Icon'

const BackButton = () => {
    const navigation = useNavigation();
  return (
    <Pressable onPress={() => navigation.goBack()} >
        <Icon name='arrowLeft' size={size} />
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({})