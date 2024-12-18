import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import { theme } from '../helpers/theme'

const TextEditor = ({
    editorRef,
    onChange
}) => {
   
  return (
    <View style ={{minHeight: 300}}>
      <RichToolbar 
        actions={[
            actions.insertImage,
            actions.setBold,
            actions.setItalic,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.insertLink,
            actions.keyboard,
            actions.setStrikethrough,
            actions.setUnderline,
            actions.removeFormat,
            actions.insertVideo,
            actions.checkboxList,
            actions.undo,
            actions.redo,
            actions.heading1,
            actions.heading4,

        ]}
        
        iconMap={{
        [actions.heading1]: ({tintColor}) =>
            <Text style={{color:tintColor}}>H1</Text>,
        [actions.heading2]: ({tintColor}) =>
            <Text style={{color:tintColor}}>H2</Text>
        }}

        style={styles.richBar}
        flatContainerStyle={styles.listStyle}
        selectedIconTint={theme.colors.accent}
        editor={editorRef}
        disabled={false}


      />

      <RichEditor 
        ref={editorRef}
        containerStyle={styles.rich}
        editorStyle={styles.contentStyle}
        placeholder={'Write something here...'}
        onChange={onChange}
        />
    </View>
  )
}

export default TextEditor

const styles = StyleSheet.create({
    richBar:{
        borderTopRightRadius:theme.radius.xl,
        borderTopLeftRadius:theme.radius.xl,
        backgroundColor: theme.colors.textLight,
      },
        
    /* listStyle:{
        backgroundColor: 'white',
        borderCurve:'continuous',
    }, */

    rich:{
      minHeight:240,
      flex:1,
      borderWidth:1.5,
      borderTopWidth:0,
      borderBottomLeftRadius:theme.radius.xl,
      borderBottomRightRadius:theme.radius.xl,
      borderColor:theme.colors.textLight,
      padding:5,

    },

    contentStyle:{
      color:theme.colors.text,
      placeholderColor:theme.colors.textLight,
    },

    flatStyle:{
      paddingHorizontal:5,
      gap:3,

    }
})