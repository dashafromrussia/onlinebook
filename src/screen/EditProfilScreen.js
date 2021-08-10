import React,{useState,useEffect} from 'react'
import {View, Text, StyleSheet, TextInput, Button, ScrollView,TouchableWithoutFeedback,Keyboard,ImageBackground, Image, Alert} from 'react-native'
import { useDispatch,useSelector } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { editProfil } from '../store/actions/post'

export const EditProfilScreen = ({navigation}) => {

    const data= navigation.getParam('data')
    const[password,setPassword]=useState(data.password.toString())
    const[image,setImage]=useState(data.image)
    const dispatch = useDispatch()
    const usersWithMe= useSelector(state => state.post.students)

    async function askForPermissions() {
        const { status } = await Permissions.askAsync(
          Permissions.CAMERA,
          Permissions.CAMERA_ROLL
        )
        if (status !== 'granted') {
          Alert.alert('Ошибка', 'Вы не дали прав на создание фото')
          return false
        }
        return true
      }
      
      
        const takePhoto = async () => {
          const hasPermissions = await askForPermissions()
      
          if (!hasPermissions) {
            return
          }
          const img = await ImagePicker.launchCameraAsync({
           mediaTypes: ImagePicker.MediaTypeOptions.All, 
            quality: 0.7,
            allowsEditing: true,
            aspect: [16, 9]
          })
      
          setImage(img.uri)
           
        }

       const saveAll =()=>{
           let info={
               password:password,
               image:image,
               name:data.name
           }
           editProfil(info)(dispatch)
           Alert.alert('Данные обновлены')
       }


return(
    <View padding={15}>
    <Text style={styles.text}>Редактирование профиля {data.name}</Text>
    <Text style={styles.text}>Изменить пароль:</Text>
    <TextInput value={password} onChangeText={setPassword}/>
    <Text style={styles.text}>Изменить фото профиля:</Text>
    {image && <Image style={styles.image} marginBottom={15} source={{uri:image}}/>}
    <Button title='Сделать фото' onPress={takePhoto} color="black"/>
    <Button title="Сохранить всё" onPress={saveAll} color="hotpink"/>
    {/*<Button title="жми" onPress={()=>console.log(usersWithMe)}/>*/}
    </View>
)
}

const styles = StyleSheet.create({
    image: {
      width: 100,
      height: 100,
      marginTop: 10,
      borderRadius:50
    },
    text:{
      fontFamily:'open-bold',
      fontSize:15
    }
  })
