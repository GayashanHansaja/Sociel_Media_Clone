import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { actions, RichEditor, RichToolbar } from 'react-native-pell-rich-editor'
import { theme } from '../helpers/theme'

const TextEditor = ({
    editorRef,
    onChange,
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

        ]}  

        style={styles.richBar}
        flatContainerStyle={styles.listStyle}
        editor={editorRef}
        disabled={false}


        />

        <RichEditor 
            ref={editorRef}
            containerStyle={styles.contentStyle}
            placeholder={'Write something here...'}
            onChange={onChange}/>
    </View>
  )
}

export default TextEditor

const styles = StyleSheet.create({
   /*  richBar:{
        borderTopRightRadius:theme.radius.xl,
        
    listStyle:{
        backgroundColor: 'white',
        borderCurve:'continuous',
    } */
})