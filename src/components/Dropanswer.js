import React, {useState,useEffect} from 'react'
import {View, Text, StyleSheet,ImageBackground,TouchableOpacity,Image, Button, TextInput} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { CreateDrop } from '../components/CreateDrop'
import { DropList } from '../components/DropList'
import { DB } from '../db'
import { markDrop } from '../store/actions/post'


export const DropAnswer = ({data,enlargeCount}) =>{ //выводит ответы на дроп и поле для оценки
    
    const [mark,setMark]=useState('')
    const [visible,setVisible]=useState(false)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if(data.mark===null){
            setVisible(true)
        }else{
            setVisible(false)  
        }
    },[data.mark])
   
    const saveMark =()=>{
        let info ={id:data.id,mark:mark}
        markDrop(info)(dispatch)
       // enlargeCount(mark)
        //setVisible(false)
    }

    return(
        <View padding={10}>
           <View padding={10}>
          <Text style={styles.text}>{data.time}</Text>
          <Text>Пользователь: "{data.name}"</Text>
          <Text>Тема: "{data.head}"</Text>
          <Text>Ответ: {data.answer}</Text>
        </View>
        <Text>Оценка : "{data.mark}"</Text>
        {visible&&<TextInput placeholder="Введите оценку" value={mark} onChangeText={setMark}/>}
        {visible&&<Button title="Сохранить оценку" color="hotpink" onPress={saveMark}/>}
       </View>
    )
}

const styles = StyleSheet.create({
    text:{
     fontFamily:'open-bold' 
    }
  })