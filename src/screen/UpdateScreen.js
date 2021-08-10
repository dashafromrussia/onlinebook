import React,{useState} from 'react'
import {View, Text, StyleSheet,TextInput, Button,ScrollView} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Update } from '../components/Update'
import {updateTheme} from '../store/actions/post'

export const UpdateScreen = ({navigation}) => {
    const allThemes = useSelector(state => state.post.allThemes)
   const datas = navigation.getParam('data')
   const [data,setData]=useState(datas)
   const[theme,setTheme]=useState(data.theme)
   const dispatch = useDispatch()
   
   const updateThem =()=>{
       let info = {id:data.id,theme:theme}
    dispatch(updateTheme(info))
    navigation.navigate('Main')
   }
const navigates =()=>{
    navigation.navigate('Main')
}
const navPage =()=>{
    navigation.push('Page')
}
  
const addBlock =()=>{
   setData((prev)=>{
        return(
         {id:prev.id, theme:prev.theme, data:[...prev.data,{id:Date.now().toString(),
            image:null,
            text:'',
            value:''
        }]}
        )
    })
    console.log('DATA',data)
}


    return(
    <ScrollView>
        <Text>Обновить название темы</Text>
        <TextInput placeholder="Введите название темы" value={theme} onChangeText={setTheme}/>
        <Button title="Oбновить название" color="palevioletred" onPress={updateThem}/>
        <Text>Обновить параметры</Text>
        {data.data.map((elem)=>{
            return(
                <Update key={elem.id} data={elem} id={data.id} nav={navigates} navPage={navPage}/>
            )
        })}
        <Button title="Добавить новый блок" color="cc85af" onPress={addBlock}/>
    </ScrollView>
    )
}