import React,{useState,useEffect} from 'react'
import {View, Text,TextInput,StyleSheet, Button,Alert,ActivityIndicator,Modal} from 'react-native'
import { DB } from '../db'
import { loadDropAnswer, addPupil, loadDropList, loadLikePost, loadMarks, loadMessage,loadPupils, loadsComments, loadsConf, loadsConfPerson, loadsGallery, loadTest, loadThemes, addTeacher, loadsTeachers} from '../store/actions/post'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';


export const ModalLogin = ({visible,onCancel,onChangeCook}) =>{
   
    const [name,setName]=useState('') //teacher
    const [pass,setPass]=useState('')
    const [names,setNames]=useState('') //student
    const [passs,setPasss]=useState('')
    
    const dispatch =useDispatch()
    
       const users = useSelector(state => state.post.students)
       const teachers = useSelector(state => state.post.teachers)

    
    const LogTeach=async()=>{ 
     let teachname = name+"Teacher"
      let findteach = users.find(el=>el.name===teachname)
      console.log(findteach)
      if(findteach===undefined){
      let dataTeach={
        name:teachname,
        password:pass,
        image:"https://img1.freepng.ru/20180529/bxp/kisspng-user-profile-computer-icons-login-user-avatars-5b0d9430b12e35.6568935815276165607257.jpg",
        friends:[],
        groupname:teachname
    }
    console.log(dataTeach)
   if(teachname.trim()==='' || pass.trim()===''){
        Alert.alert('Некорректные данные')
        return false
    }
    else{ 
            await addPupil(dataTeach)(dispatch)
            }
    }
        await AsyncStorage.setItem('@storage_Key',teachname)
        onChangeCook(teachname)
        onCancel()
       // console.log("UUUUUUUU",users)
    }
    
    
    
    
    const LogStudent=async()=>{
        let user = users.find(el=>(el.name===names && el.password===Number(passs)))
        if(names.trim()==='' && passs.trim()===''){
            Alert.alert('Введите данные')
            return false
        }
        else{
              if(user!==undefined){
                try {
                    await AsyncStorage.setItem('@storage_Key', names)
                    onChangeCook(names)     
                    onCancel()
                  } catch (e) {
                    console.log(e)
                  }
            }else{
                Alert.alert('Неправильные данные!')
                return false
            }  
        }
        }
    
  
        
       const changeLog =(text)=>{
        setName(text)
        console.log(text+"Teacher")
        if(users.find(el=>el.name===text+"Teacher")||teachers.find(el=>el.name===text+"Teacher")){
            Alert.alert("Логин занят")
        }
    }
    
    

    return(
        <Modal visible={visible} presentationStyle="overFullScreen" animationType="slide">
        <View marginBottom={20} marginTop={20} paddingLeft={10} paddingRight={10}>

        <Text>Teacher login</Text>
        <TextInput
        textContentType="name"
        placeholder="Введите логин"
        value={name}
        onChangeText={(text)=>changeLog(text)}
        />
        <TextInput
        placeholder="Введите пароль"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
        />
        <Button title="Войти" color="hotpink" onPress={LogTeach}/>
        </View>
        <View paddingLeft={10} paddingRight={10}>
         <Text>Student login</Text>
         <TextInput
          textContentType="name"
          placeholder="Введите логин"
          value={names}
          onChangeText={setNames}
         />
         <TextInput
           placeholder="Введите пароль"
           value={passs}
           onChangeText={setPasss}
           secureTextEntry
           />
<Button title="Войти" onPress={LogStudent} color="hotpink"/>
</View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrap:{
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
    },
       
})