import React, {useState,useEffect} from 'react'
import {View, Text, StyleSheet,ImageBackground,TouchableOpacity,Image,Button,TextInput} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { CreateDrop } from '../components/CreateDrop'
import { addDropAnwer, changeVisibleDrop } from '../store/actions/post'
import { UpdateModal } from './UpdateModal'


export const DropList = ({data,name,groupname}) =>{

const dropanswer = useSelector(state => state.post.dropanswer) 
const filterdrop = dropanswer.filter(el=>el.name===name && el.head===data.head)
const [visibility,setVisibility] =useState(false)
const [modal,setModal]=useState(false)
const [showinput,setShowinput]=useState(true)
const [answer,setAnswer]=useState('')
const find = name.substring(name.length-7, name.length)
const dispatch = useDispatch()

useEffect(()=>{
 if(data.visible==="-"){
     setVisibility(true)
 }
 if(filterdrop.length!==0){
   setShowinput(false)
 }
},[])

const changeVisible =()=>{
  if(find==="Teacher"){
    let info
    if(data.visible==="+"){
      info ={id:data.id,visible:"-"} 

    }else{
        info ={id:data.id,visible:"+"}
       
    }
    changeVisibleDrop(info)(dispatch)
    setVisibility(!visibility)
  }
}

const openUpdateDrop =()=>{
  if(find==="Teacher"){
  setModal(true)
  }
}

const saveAnswer =()=>{
  let time = new Date()
   time=time.toLocaleString()
  let info ={iddrop:data.id,head:data.head,name:name,answer:answer,time:time,mark:null,groupname:`${groupname}`}
  addDropAnwer(info)(dispatch)
  setShowinput(false)
}

    return(
        <>
        <TouchableOpacity activeOpacity={0.8} onPress={()=>{openUpdateDrop()}}>
        <UpdateModal data={data} visible={modal} onCancel={()=>setModal(false)}/>  
        <View padding={10}>
        <TouchableOpacity activeOpacity={0.8} onPress={()=>{changeVisible()}}>
          <View style={styles.head}>
           <Text>{data.head}</Text>
           <Text>{data.visible}</Text>
          </View>
          </TouchableOpacity>
          {visibility&&<View style={styles.content}>
            <Text>{data.content}</Text>
          </View>}
          </View>
          </TouchableOpacity>
          {visibility&&showinput&&<TextInput placeholder="Введите ответ на задание..." value={answer} onChangeText={setAnswer}/>}
          {visibility&&showinput&&<View padding={10}>
          <Button title="Сохранить ответ" color="hotpink" onPress={saveAnswer}/>
          </View>}
          {visibility&&<View padding={10}>
          {filterdrop.map(el=><View key={el.id} style={styles.answer}>
          <Text>Ваш ответ: {el.answer}</Text>
          <Text>  Ваша оценка:{el.mark}</Text>
          </View>
          )}
          </View>}
        </>
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
       backgroundColor:"pink"
   },
   answer:{
    flexDirection:"column",
    alignItems:'center',
    padding: 30,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor:"hotpink",
    padding:20
}
   })