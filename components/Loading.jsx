import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { theme } from '../helpers/theme'

const Loading = ({size='large', color=theme.colors.accent}) => {
  return (
    <View style={{justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size={size} color={color}/>
    </View>
  )
}

export default Loading