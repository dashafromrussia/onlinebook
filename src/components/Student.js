import React,{useEffect,useState} from 'react'
import {View, Text, StyleSheet,Image,TouchableOpacity} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { editBadge, readMessage } from '../store/actions/post'

export const Student = ({id,name,onOpen,myName}) =>{
  const [news,setNews] = useState(true)
  const users = useSelector(state=>state.post.students)
  const userPhoto = users.find(el=>el.name===name).image
  const allMess = useSelector(state => state.post.messages)
  const students = allMess.filter(elem=>elem.name===name && elem.towhome===myName)
  const mymess = allMess.filter(elem=>elem.name===myName && elem.towhome===name)
    let  allmessages = [...students,...mymess]
     allmessages.sort((a, b) => Number(a.id) > Number(b.id) ? 1 : -1)
     let lastmess = allmessages.length-1
     let lastmessage 
     if(lastmess>=0){
       lastmessage = allmessages[lastmess].mess
     }
     else{
      lastmessage = '...'
     }
    
     let newMess = students.filter(el=>el.new==="yes")
  

  const dispatch = useDispatch()
  
  useEffect(()=>{
    if(newMess.length===0){
      setNews(false)
    }
  },[newMess.length])

  const readMess =()=>{ //убирает прочитанные сообщения..вернее оповещение о прочитанных
    let info ={name:name,towhome:myName,new:"no"}
    readMessage(info)(dispatch)
    onOpen(name)
  }

  return(
   <TouchableOpacity activeOpacity={0.7} onPress={readMess}>
   <View style={styles.mes}>  
   <View style={styles.block}>
   <Image style={styles.imagepp} source={{uri:userPhoto}}/>  
   <Text style={styles.text}>{name}</Text>
   </View>
   <Text>{lastmessage}</Text>
   {news&&<Text>Новые сообщения: {newMess.length}</Text>}
   </View>
   </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  imagep: {
    width: 70,
    height: 70,
    margin: 15,
    borderRadius:50
  },
  imagepp: {
    width: 50,
    height: 50,
    borderRadius:50,
    margin:5
  },
  img:{
    width: 50,
    height: 50,
    margin:5
  },
  text:{
    fontFamily:'open-bold'
  },
  block:{
    flexDirection:"row",
    alignItems:"center"
  },
  mes:{
    backgroundColor:"white",
    borderWidth: 2,
    borderColor:"black",
    padding:5,
    borderRadius:10
  }
})