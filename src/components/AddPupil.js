import React,{useEffect,useState} from 'react'
import {ScrollView, Text, StyleSheet,FlatList, Button, View, Image,TextInput,Alert} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { DB } from '../db'
import { addPupil, addsConfPerson } from '../store/actions/post'


export const AddPupil= ({teacher}) => {
    const[login,setLogin]=useState('')
    const[pass,setPass]=useState('')
    const [visibility,setVisibility] = useState(true)
    const dispatch = useDispatch()
    const usersWithMe = useSelector(state => state.post.students)

    const savePupil =()=>{
        let finduser = usersWithMe.find(el=>el.name===login)
        let data={
            name:login,
            password:pass,
            image:"https://img1.freepng.ru/20180529/bxp/kisspng-user-profile-computer-icons-login-user-avatars-5b0d9430b12e35.6568935815276165607257.jpg",
            friends:[{name:teacher,id:Date.now().toString(),new:'no'}],
            groupname:teacher
        }
       /* let dataTeach={
            name:login,
            password:pass,
            image:"https://img1.freepng.ru/20180529/bxp/kisspng-user-profile-computer-icons-login-user-avatars-5b0d9430b12e35.6568935815276165607257.jpg",
            friends:[]
        }*/
        //if(login==="Teacher"){
           // addPupil(dataTeach)(dispatch)
        //}else{
            if(login==="" || pass==="" || finduser!==undefined){
                return false
            }else{
            addPupil(data)(dispatch)
       // }
        let dataconf ={name:login,visible:"-"} 
        addsConfPerson(dataconf)(dispatch)
        setVisibility(false)
        }
    }
    
    const changeLog =(text)=>{
        setLogin(text)
        if(usersWithMe.find(el=>el.name===text)){
            Alert.alert("Логин занят")
        }
    }
   
    return(
   <View>
       {visibility&&<TextInput placeholder="Введите логин" value={login} onChangeText={(text)=>{changeLog(text)}}/>}
       {visibility&&<TextInput placeholder="Введите пароль" value={pass} onChangeText={setPass}/>}
       {visibility&&<Button title="Сохранить ученика" onPress={savePupil}/>}
   </View>
    )
}