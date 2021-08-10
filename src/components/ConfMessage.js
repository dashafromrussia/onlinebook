import React from 'react'
import {View, Text, StyleSheet,ImageBackground,TouchableOpacity,Image} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
import { removeMessConf } from '../store/actions/post'

export const ConfMessage = ({message,name,personList,redirect}) =>{
    const usersWithMe= useSelector(state => state.post.students)
  
    const dispatch = useDispatch()
    const [color,setColor]=useState('#AFEEEE')
    const [margin,setMargin]=useState(7)
    let mess = message.redirect //ответ на сообщение конкретному
   
    useEffect(()=>{//если все не прочитали
      if(message.name===name){
      message.towhome.forEach(elem => {
          if(elem.news==="yes"){
            setColor("#ffccdd")
          }else{
            setColor('#AFEEEE')
          }
        });
        }
     },[message.towhome])
     
     useEffect(()=>{
      if(message.name===name){
           setMargin(60)
      }
     },[message.name])


    const removeMessage =()=>{
     if(name===message.name){
       removeMessConf(message.id)(dispatch)
     }
    }
//let img =usersWithMe.find(el=>el.name===message.name).image

const redirectMes =()=>{
  let info =[{time:message.time,name:message.name,message:message.message,id:message.id,redirect:message.redirect,groupname:message.groupname}]
redirect(info)
}

  return(
   <TouchableOpacity activeOpacity={0.7} onLongPress={()=>removeMessage()} onPress={redirectMes}>
   <View style={styles.mes} marginLeft ={margin} backgroundColor={color}>
      {mess.map(el=>
      <View backgroundColor={"pink"} key={el.id}>
      <Text>{el.time}</Text>
      <Text style={styles.name}>{el.name}</Text>
      <Text>{el.message}</Text>
      </View>
      )}
       <View>
       <Text style={styles.name}>{message.time}</Text>   
        <Text style={styles.name}>{message.name}</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={()=>personList(name,message.name)}>
        <Image style={styles.image} source={{uri:usersWithMe.find(el=>el.name===message.name).image}}/>
        </TouchableOpacity>
        <Text>{message.message}</Text>
        </View>
  </View>
  </TouchableOpacity> 
  )
}

const styles = StyleSheet.create({
    container:{
        margin:10
    },
      image: {
        width: 50,
        height: 50,
        marginTop: 10,
        borderRadius:30
      },
      name:{
        fontFamily:'open-bold'
      },
      mes:{
        borderWidth: 2,
        borderColor:"white",
        padding:5,
        borderRadius:10,
        marginTop:10,
        marginBottom:10,
        marginRight:5
      }
  })
  