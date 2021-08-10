import React,{createRef, useState,useEffect} from 'react'
import {View, Text, StyleSheet, TextInput, Button, ScrollView,TouchableWithoutFeedback,Keyboard,ImageBackground} from 'react-native'
import { InputList } from '../components/InputList'
import { addPosts } from '../store/actions/post'
import { useDispatch } from 'react-redux'
import { Tooltip} from 'react-native-elements'
import { Entypo } from '@expo/vector-icons'

export const CreateScreen = ({navigation}) => {
  const name= navigation.getParam('name')
    const dispatch = useDispatch()
const [contents,setContents]=useState([])
const [theme,setTheme]=useState('')
const [data, setData]=useState([])



 const removeEl =(id)=>{
     setContents((prev)=>prev.filter(elem=>elem.key!==id))
 }

const addElem =()=>{ //для добавл инпутов(инпутлист)
    setContents((prev)=>[...prev,{key:Date.now().toString()}])
}

const getInfo = (info)=>{ //для добавления инфы из инпутов
   // console.log(info)
    setData((prev)=>([{...info},...prev]))
}


const saveAll =()=>{
let id = Date.now().toString()
let a ={theme:theme,data:[...data],groupname:name}
    dispatch(addPosts(a))
    navigation.navigate('Admin')
    setTheme('')
    setData([])
}
    return( 
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView>
        <Tooltip backgroundColor="azure" height={100} overlayColor='rgba(0, 0, 0, 0.7)' popover={<Text>После заполнения нового блока обязательно сохраняйте введенные значения!</Text>}>
        <View marginTop={10} marginBottom={10}>
          <Entypo name="help-with-circle" size={28} color="crimson"/> 
        </View>
        </Tooltip>
        {data.map((el,index)=><View key={index}>
          <Text>{el.text}</Text>
          <Text>{el.value}</Text>
          {el.image && <ImageBackground style={styles.image} source={{uri:el.image}}></ImageBackground>}
          </View>
          )}
           <TextInput placeholder="Введите название темы" value={theme} onChangeText={setTheme}/>  
          {contents.map(elem=><InputList key={elem.key} elem={elem} removeEl={removeEl} getInfo={getInfo} data={data}/>)}
          <Button title="Добавить блок" onPress={addElem} marginTop={20}/>
          <Button title='Сохранить всё' onPress={saveAll}/>
        </ScrollView>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    post: {
      marginBottom: 15,
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: 200
    },
    textWrap: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      paddingVertical: 5,
      alignItems: 'center',
      width: '100%'
    },
    title: {
      color: '#fff',
      fontFamily: 'open-regular'
    }
  })
  