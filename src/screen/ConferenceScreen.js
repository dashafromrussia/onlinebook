import React,{useState,useEffect} from 'react'
import {View, Text,TextInput,StyleSheet, Button,Alert,ScrollView} from 'react-native'
import { DB } from '../db'
import { addConfMess, readsConf } from '../store/actions/post'
import { useDispatch, useSelector } from 'react-redux'
import { ConfMessage } from '../components/ConfMessage'
import { Icon } from 'react-native-elements'

export const ConferenceScreen = ({navigation}) => {
    const name = navigation.getParam('name')
    const [text,setText]=useState('')
    const [redir,setRedir]=useState([])
    const [show,setShow]=useState(false)
    const dispatch = useDispatch()
    const allconference = useSelector(state => state.post.conference)
    const allconfperson = useSelector(state => state.post.students)
    const myGroup = allconfperson.find(el=>el.name===name).groupname
    const conference = allconference.filter(el=>el.groupname===myGroup)
    const confperson = allconfperson.filter(el=>el.groupname===myGroup)
    let data=[]
   const withoutMe = confperson.filter(el=>el.name!==name)
   withoutMe.forEach(el=>{
    data.push({name:el.name,news:"yes"})
  }
   )

   let newConference = allconference.map((elem,index)=>{ //делаем новые id по порядку,тк эти данные мы засовываем сразу в редакс,нам нужно чтобы id в редакс совпадали с id в бд
    elem.id = index+1
    return elem
  })
      newConference.forEach(el=>{
        if(el.name!==name){
        el.towhome.map(elem=>{
          if(elem.name===name && elem.news==="yes"){
          elem.news = "no"
          }
          return elem
        })
      }
      }
       )

    useEffect(()=>{
      readsConf(newConference)(dispatch)
    },[])   
   



    const personList =(myname,name)=>{
      const find = myname.substring(myname.length-7, myname.length) 
      if(myname===name){
       if(find==="Teacher"){
        navigation.navigate('Admin',{name:myname})
      }else{
       navigation.navigate('Student',{name:myname})
      }
      }else{
       navigation.navigate('Person',{myname:myname,name:name})
      }
     } 
    /*if(redirectmessage.length===0){ //еслм переслан сообщ нет
    send={name:myName, mess:mess, images:images, towhome:name,new:'yes', sharepost:sharepost, redirect:[]}
  }else{
    redirectmessage.forEach(el=>{ //если есть пересланное сообщ,но у него нет пересланного
      if(el.redirect.length===0){
      send={name:myName, mess:mess, images:images, towhome:name,new:'yes',redirect:redirectmessage,sharepost:sharepost}
      }else{ //если есть пересланное и у него тоже есть пересланное
    sendmess.push({id:el.id,name:el.name,mess:el.mess,images:el.images,towhome:el.towhome, new:el.new, sharepost:el.sharepost})
    el.redirect.forEach(elem=>{
    sendmess =[...sendmess,{...elem}]
    send={name:myName, mess:mess, images:images, towhome:name,new:'yes',sharepost:sharepost,redirect:sendmess}
  })
    }
    }) 
  }*/
  let sendmess=[]
  let info
    const send =()=>{
      let time = new Date()
      time=time.toLocaleString()
      if(redir.length===0){
        info={name:name,message:text,time:time,towhome:data,redirect:[],groupname:myGroup}
      }else{
      redir.forEach(el=>{
        if(el.redirect.length===0){
          info={name:name,message:text,time:time,towhome:data,redirect:redir,groupname:myGroup}
        }else{
         sendmess.push({id:el.id,name:el.name,message:el.message,time:el.time,groupname:el.groupname})
         el.redirect.forEach(elem=>{
           sendmess = [...sendmess,{...elem}]
           info={name:name,message:text,time:time,towhome:data,redirect:sendmess,groupname:myGroup}
         })
        }
      })
    }
      console.log(info.redirect)
      addConfMess(info)(dispatch)
      setText('')
      setRedir([])
    }
   
    const redirect =(val)=>{ //ответ на конкретное сообщение в конфе
      setRedir(val)
      setShow(true)
    }

    const Cancel =()=>{
      setRedir([])
      setShow(false)
    }

    return(
        <ScrollView padding={10} backgroundColor="azure">
            <Text style={styles.name}>Конференция</Text>
            {conference.map(elem=><ConfMessage key={elem.id.toString()} redirect={redirect} message={elem} name={name} personList={personList}/>)}
            {redir.map(el=>
            <View key={el.id}>
            <Text>{el.time}</Text>
            <Text>{el.name}</Text>
            <Text>{el.message}</Text>
            </View>
            )}
            <View style={styles.block}>
            <TextInput placeholder="Написать сообщение" width={300} padding={10} value={text} onChangeText={setText}/>
            <Icon name='sc-telegram' type='evilicon' size={50} onPress={send} color="palevioletred"/>
            </View>
            {show&&<Button title="Oтмена" color={"pink"} onPress={Cancel}/>}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
   block:{
     flexDirection:"row",
     alignItems:"center",
     marginBottom:10
     /*position: 'absolute',
     bottom: 10,
     right:5*/
   },
   name:{
     fontFamily:'open-bold',
     fontSize:20,
     marginBottom:20
   }
})