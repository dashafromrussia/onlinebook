import React, {useState} from 'react';
import { StyleSheet, Image, View, Modal,TouchableHighlightComponent, Button,Text,TextInput} from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { updateDrop } from '../store/actions/post';

export const UpdateModal = ({visible,data,onCancel}) =>{
  //редактирование элемента дропа
    const [head,setHead]=useState(data.head)
    const [content,setContent]=useState(data.content)
    const dispatch = useDispatch()

    const saveUpdateDrop =()=>{
        let info ={id:data.id,head:head,content:content,visible:data.visible}
        updateDrop(info)(dispatch)
        onCancel()
    }

    const back =()=>{
        setHead(data.head)
        setContent(data.content)
        onCancel()
    }

    return(
        <Modal visible={visible} animationType="slide">
            <View padding={10}>
            <Text>Нажмите на блок,чтобы начать редактирование</Text>
              <View style={styles.head}>
               <TextInput value={head} padding={10} onChangeText={setHead}/>
             </View>
             <View style={styles.content}>
               <TextInput value={content} padding={10} onChangeText={setContent} multiline/>
             </View>
            </View>
            <View padding={10}>
             <Button title="Сохранить и выйти" color="hotpink" onPress={saveUpdateDrop}/>   
             <Button title="<< back" color="black" onPress={()=>back()}/>
             </View> 
        </Modal>
    )
}

const styles = StyleSheet.create({

    head:{
        flexDirection:"row",
        alignItems:'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor:"#9370DB"
    },
    content:{
      flexDirection:"row",
      alignItems:'center',
      padding: 30,
      borderWidth: 1,
      borderColor: '#eee',
      borderRadius: 5,
      marginBottom: 10,
      backgroundColor:"#9370DB"
  }

})