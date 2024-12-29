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
        flatContainerStyle={styles.flatStyle}
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
        borderTopRightRadius:theme.radius.md,
        borderTopLeftRadius:theme.radius.md,
        backgroundColor: theme.colors.gray,
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
      borderBottomLeftRadius:theme.radius.md,
      borderBottomRightRadius:theme.radius.md,
      borderColor:theme.colors.gray,
      padding:5,

    },

    contentStyle:{
      color:theme.colors.textDark,
      placeholderColor:'gray',
    },

    flatStyle:{
      paddingHorizontal:5,
      gap:3,

    }
})