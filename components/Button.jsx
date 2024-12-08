import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp } from '../helpers/common'

const Button = ({
  buttonStyle,
  textStyle,
  title='',
  onPress=()=>{},
  loading=false,
  hasShadow=true,
}) => {
  const shadowStyle = {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
    
  return (
    <Pressable style={[ styles.button, buttonStyle, hasShadow && shadowStyle]} onPress={onPress} disabled={loading}>
      <Text style={[styles.text, textStyle]}> {title}</Text>
    </Pressable>  
  )
}

export default Button

const styles = StyleSheet.create({
  button:{

    backgroundColor: '#0A69E6',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(6),

  },

  text:{
    color: 'white',
    fontSize:20,
    fontWeight: 'bold',
  }
})