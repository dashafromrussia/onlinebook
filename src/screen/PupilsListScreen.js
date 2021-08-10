import React,{useEffect,useState} from 'react'
import {ScrollView, Text, StyleSheet,FlatList, Button, View, Image, TextInput, Alert} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Tooltip} from 'react-native-elements'
import { Entypo } from '@expo/vector-icons'
import { AddPupil } from '../components/AddPupil'
import { DB } from '../db'
import { editTeacherPassword, loadPupils, getDataC, deletepupils} from '../store/actions/post'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const PupilListScreen = ({navigation}) => {
    const[addpupil,setAddpupil]=useState([])
    const [password,setPassword] = useState('')
    const [disable,setDisable]=useState(true)
    const visible= navigation.getParam('visible')
    const name= navigation.getParam('name')
    const goOut = navigation.getParam('goout')
    const students = useSelector(state => state.post.students)
    const myGroup = students.filter(el=>el.groupname===name)
    const withOutTeach = myGroup.filter(el=>el.name!==name)
    const dispatch = useDispatch()
   
    useEffect(()=>{
     if(withOutTeach.length!==0){
        setDisable(false)
     }else{
       setDisable(true)
     }
     console.log(students)
     console.log(name)
    },[withOutTeach])


    const addPupil =()=>{
        setAddpupil(prev=>[...prev,Date.now().toString()])
    }

    const del =async()=>{ //когда удаляешь всех пользователя,то удаляешь всё
       await deletepupils(name)(dispatch)
       //await DB.readConf()
       await DB.deleteConfPerson()
     goOut()
    }
    
    const savePassword =()=>{
        editTeacherPassword({password:password,name:name})(dispatch)
        setPassword('')
        Alert.alert("Пароль успешно обновлен!")
    }

    const delResultTests =async()=>{
    //await DB.deleteAllTest() 
     await DB.deleteResultTest()
    }

    const getDataC = async () => {
        try {
          const value = await AsyncStorage.getItem('@storage_Key')
          if(value !== null) {
            console.log("cookie",value)
          }
        } catch(e) {
          // error reading value
        }
      }

      const getp = async()=>{
        //const data = await DB.getPupils()
         console.log("ddd",students)
       }
  
   
return(
    <View padding={10}>
        <Text style={styles.text}>Добавить пользователя</Text>
        <Tooltip backgroundColor="azure" overlayColor='rgba(0, 0, 0, 0.7)' height={150} popover={<Text>Добавьте своих учеников,затем получите доступ к админ-панели.</Text>}>
        <View marginTop={10} marginBottom={10}>
          <Entypo name="help-with-circle" size={28} color="crimson"/> 
        </View>
        </Tooltip>
        {addpupil.map(elem=><AddPupil teacher={name} key={elem}/>)}
        <Button title="Добавить пользователя" color="lightcoral" onPress={addPupil}/>
        <Button title="К админ-панели" color="crimson" onPress={()=>navigation.navigate('Admin',{visible:visible,name:name})} disabled={disable}/>
        <Text>Для надежной защиты измените пароль</Text>
        <TextInput placeholder="Введите новый пароль" value={password} onChangeText={setPassword} secureTextEntry/>
        <Button title="Сохранить пароль" color="pink" onPress={savePassword}/>
        <Text>Вы можете удалить всех пользователей после завершения курса</Text>
        {/*<Button title="Удалить всех пользователей" color="palevioletred" onPress={del}/>*/}
        {<Button title="Удалить все тесты и результаты" color="hotpink" onPress={delResultTests}/>}
        <Button title="delete english results" color="black" onPress={()=>DB.deleteEnglishRes()}/>
        {/*<Button title="getp" color="palevioletred" onPress={getp}/>*/}
    </View>
)
}

const styles = StyleSheet.create({
  text:{
    fontFamily:'open-bold',
    fontSize:17
  },
})
