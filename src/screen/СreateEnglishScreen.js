import React,{createRef, useState,useEffect} from 'react'
import {Button, FlatList,Alert, ScrollView,Text,TextInput} from 'react-native'
import { useDispatch,useSelector} from 'react-redux'
import { EnglishBlocks } from '../components/EnglishBlocks'
import { addEnglishTask } from '../store/actions/post'



export const CreateEnglishScreen= ({navigation}) => {
const name = navigation.getParam('name')   
const dispatch = useDispatch()
const users = useSelector(state => state.post.students)
const myGroup = users.find(el=>el.name===name).groupname
const [blockmass,setBlockmass]=useState([])
const [result,setResult]=useState([])
const [namehist,setNamehist]=useState('')

useEffect(()=>{
// console.log(allTest)
},[])

const saveBlock =(data)=>{
    setResult(prev=>[...prev,{...data}])
    setBlockmass(prev=>prev.filter(el=>el!==data.id))//убираем блок,который уже отправили..вместо визибил фолсе
}

const addBlock =()=>{
  setBlockmass(prev=>[...prev,Date.now().toString()])
}

const saveAll =()=>{
    let data ={name:namehist,data:result,groupname:myGroup}
  addEnglishTask(data)(dispatch)
   console.log(data)
   setNamehist('')
  // navigation.navigate('Englist')
}
    
    return(
    <ScrollView>
      <Text>Создайте задания,подобные Дуолингво</Text>
      <TextInput placeholder="Название блока заданий..." value={namehist} width={230} onChangeText={setNamehist}/>
      <Button title="Добавить блок с заданиями" color="black" onPress={addBlock}/>
      {blockmass.map(el=><EnglishBlocks key={el} id={el} saveBlock={saveBlock}/>)}
    <Button title="Сохранить всё" color="red" onPress={saveAll}/>
    </ScrollView>
    )
}

