import React from 'react'
import {View, Text, StyleSheet,ImageBackground,TouchableOpacity,Image, TextInput, Button, Alert} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
import { addDropList } from '../store/actions/post'


export const CreateDrop = ({id,deleteBlock,name}) =>{
    
    const [head,setHead]=useState('')
    const [content,setContent]=useState('')
    const dispatch = useDispatch()

    const saveDropBlock =()=>{
        let info ={head:head,content:content,visible:"+",groupname:name}
        addDropList(info)(dispatch)
        console.log(info)
        deleteBlock(id)
        Alert.alert('Сохранено')
    } 

    return(
     <View>
      <View style={styles.head}>
       <TextInput placeholder="Введите название заголовка..." value={head} onChangeText={setHead}/>
       </View>
       <View style={styles.content}>
       <TextInput placeholder="Введите содержание..." value={content} onChangeText={setContent} multiline/>
       </View>
       <Button title="Сохранить" color="lightskyblue" onPress={saveDropBlock}/>
       <Button title="Удалить блок" color="pink" onPress={()=>deleteBlock(id)}/>
     </View>
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
},
})