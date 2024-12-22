import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';
import { theme } from '../helpers/theme';
import { hp } from '../helpers/common';
import { getUserImageSource } from '../services/imageService';

const Avatar = ({

    uri,
    size=hp(4.5),
    rounded=theme.radius.md,
    style={},
}) => {
  return (

      <Image
        style={[styles.avatar ,{height:size ,width:size ,borderRadius:rounded}, style]}
        source={getUserImageSource(uri)}
        transition={100}
        />
  )
}

export default Avatar

const styles = StyleSheet.create({
    avatar:{
        borderCurve:'continuous',
        borderColor:theme.colors.gray,
        borderWidth:1,
    }
})