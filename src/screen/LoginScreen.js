import React,{useState,useEffect} from 'react'
import {View, Text,TextInput,StyleSheet, Button,Alert,ActivityIndicator} from 'react-native'
import { DB } from '../db'
import { loadDropAnswer, addPupil, loadDropList, loadLikePost, loadMarks, loadMessage,loadPupils, loadsComments, loadsConf, loadsConfPerson, loadsGallery, loadTest, loadThemes, addTeacher, loadsTeachers} from '../store/actions/post'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginScreen = ({navigation}) => {

const [name,setName]=useState('') //teacher
const [pass,setPass]=useState('')
//const [hidden, setHidden]=useState(false)
const [names,setNames]=useState('') //student
const [passs,setPasss]=useState('')

const dispatch =useDispatch()

/*const changeHidden =async()=>{
    let resp = await DB.hiddens()
    if(resp.length===0){
    setHidden(true)
   }
   }*/

   const loadAsync =async()=>{
    //await changeHidden()
    await loadsTeachers()(dispatch)
    await loadThemes()(dispatch)
    await loadPupils()(dispatch)
    await loadMessage()(dispatch)
    await loadsComments()(dispatch)
    await loadsConf()(dispatch)
    await loadMarks()(dispatch)
    await loadsConfPerson()(dispatch)
    await loadsGallery()(dispatch)
    await loadDropList()(dispatch)
    await loadDropAnswer()(dispatch)
    await loadLikePost()(dispatch)
    await loadTest()(dispatch)
   getData()
   }

useEffect(() => {//сработает один раз при инициализ компонента
    loadAsync()
   }, [])


   const users = useSelector(state => state.post.students)
   const teachers = useSelector(state => state.post.teachers)
   const loading = useSelector(state => state.post.loading)
   const loadinglike = useSelector(state => state.post.loadinglike)
   const loadingcomment = useSelector(state => state.post.loadingcomment)

   const getData = async () => { //куки для учителя
    try {
      const value = await AsyncStorage.getItem('@storage_Key')
      console.log(value,"aaaaaaaaaaaaaaaaaaaaaaaa")
      const find = value.substring(value.length-7, value.length)
      if(value!==null || value!==undefined){
      //if(find==="Teacher") {
        navigation.navigate('Admin',{visible:true,name:value})
        //console.log(find)
     // }else{
        //navigation.navigate('Student',{visible:false,name:value}) 
      //}
    }else{
      return false
    }
    } catch(e) {
      // error reading value
    }
  }

 /* const getDataPupil = async () => { //куки для учеников
    try {
      const value = await AsyncStorage.getItem('@storage_Key_pupil')
      if(value !== null) {
        navigation.navigate('Student',{visible:true,name:value})
        console.log("cookie",value)
      }
    } catch(e) {
      // error reading value
    }
  }*/

/*const LogTeach=async()=>{
  // navigation.navigate('Pupillist',{visible:true,name:name})
    let user = users.find(el=>(el.name===name && el.password===Number(pass)))
if(name.trim()==='' || pass.trim()===''){
    Alert.alert('Введите данные')
    return false
}
else{ 
    if(user!==undefined){
        try {
            await AsyncStorage.setItem('@storage_Key', name)
          } catch (e) {
            console.log(e)
          }
        navigation.navigate('Pupillist',{visible:true,name:name})
    }
   else{
       Alert.alert('Неправильные данные!')
       console.log(users)
       console.log(pass)
       return false
   }
}
}*/

const LogTeach=async()=>{ //закомментировали чтобы было легче тестить..не удалять!
  let teachname = name+"Teacher"
  let findteach = users.find(el=>el.name===teachname)
  if(findteach===undefined){
  let dataTeach={
    name:teachname,
    password:pass,
    image:"https://img1.freepng.ru/20180529/bxp/kisspng-user-profile-computer-icons-login-user-avatars-5b0d9430b12e35.6568935815276165607257.jpg",
    friends:[],
    group:teachname
}
if(teachname.trim()==='' || pass.trim()===''){
    Alert.alert('Некорректные данные')
    return false
}
else{ 
            await addPupil(dataTeach)(dispatch)
            //await addTeacher({name:teachname})(dispatch)  
}
}
    await AsyncStorage.setItem('@storage_Key',teachname)
    navigation.navigate('Admin',{visible:true,name:teachname})
}



//const data = {name:names,password:Number(passs)}
const LogStudent=async()=>{
    let user = users.find(el=>(el.name===names && el.password===Number(passs)))
    if(names.trim()==='' && passs.trim()===''){
        Alert.alert('Введите данные')
        return false
    }
    else{
        //const resp = await DB.loginPupils(data) 
       // if(resp.length!==0){
         if(user!==undefined){
            try {
                await AsyncStorage.setItem('@storage_Key', names)
              } catch (e) {
                console.log(e)
              }     
        navigation.navigate('Admin',{visible:false,name:names})
        }else{
            Alert.alert('Неправильные данные!')
            return false
        }
        //console.log(resp)
    }
    }

   /*const hiddenData =async()=>{ //когда таблица пустая, показыв логин и пароль для учителя,а когда там что=то есть,то скрыв..это сделано,чтобы показыв логин и пароль 1 раз
       await DB.addHiddens("hide") 
       setHidden(false)
   }

   const showHide =async()=>{
       await DB.deleteHiddens()
       setHidden(true)
   }*/
    
   const changeLog =(text)=>{
    setName(text)
    console.log(text+"Teacher")
    if(users.find(el=>el.name===text+"Teacher")||teachers.find(el=>el.name===text+"Teacher")){
        Alert.alert("Логин занят")
    }
}


   if(loading || loadinglike || loadingcomment){
   return(
     <View style={styles.center}>
      <ActivityIndicator width={200} height={200} color="hotpink"/>
     </View>
   )
 }
    return(
        <>
        <View marginBottom={20} marginTop={20} paddingLeft={10} paddingRight={10}>
          {users.map(el=><Text key={el.id.toString()}>{el.name}</Text>)}
        <Text>Teacher login</Text>
        {/*hidden&&<Text>Ваш логин: Teacher</Text>}
        {hidden&&<Text> Пароль: 123</Text>}    
        {hidden&&<Text>(скройте эти данные)</Text>}
        {hidden&&<Button title="Скрыть данные" onPress={hiddenData}/>}
        {/*<Button title="Показать данные" onPress={showHide}/>*/}
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
        <Button title="Войти" color="palevioletred" onPress={LogTeach}/>
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
<Button title="Войти" onPress={LogStudent} color="pink"/>
<Button title="remove" onPress={()=>console.log(users)} color="pink"/>
</View>
</>
    )
}

const styles = StyleSheet.create({
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })
  