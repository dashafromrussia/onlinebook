import React,{useState} from 'react'
import {View, Text, StyleSheet, TextInput, Button, Image} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

export const InputList =({elem,removeEl,getInfo,data})=>{
    const [value, setValue] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState(null)
    const [visible, setVisible] = useState(true)


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

  const getsInfo = async()=>{
    const info={
      value: value,
      text: text,
      image: image,
      id: elem.key
    }
  await getInfo(info)
   //console.log(data)
    setImage(null)
    setText('')
   setValue('')
    setVisible(false)
  }

    const content =(<View>
       <TextInput
       placeholder="Введите что-нибудь"
       value={value}
       onChangeText={setValue}
       />
      <TextInput
       placeholder="Введите какой-либо текст"
       value={text}
       onChangeText={setText}
       boxSizing="border-box"
       paddingTop={30}
       multiline
       />
    </View>)
  
   
    return(
      <View>
         {visible && content}
         {visible&& <Button title='Сделать фото' onPress={takePhoto} color="black"/>}
         {visible && image && <Image style={styles.image} source={{ uri:image}}/>}
        {visible && <Button title="Сохр. введенные значения" color="pink" onPress={getsInfo}/>}
       {visible && <Button title="Удалить элемент" name={elem.key} color="red" onPress={()=>removeEl(elem.key)}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
      marginBottom: 10
    },
    image: {
      width: '100%',
      height: 200,
      marginTop: 10
    }
  })