import React,{useState} from 'react'
import {View, Text, StyleSheet,TextInput,Image, Button} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { deleteBlock, deletePhoto, updateInfo } from '../store/actions/post'


export const Update = ({data,id,nav,navPage,main}) =>{
    const [flag,setFlag]=useState(true) 
    const [value, setValue] = useState(data.value)
    const [text, setText] = useState(data.text)
    const [image, setImage] = useState(data.image)
    const dispatch = useDispatch()
    const allThemes = useSelector(state => state.post.allThemes)
    let find =allThemes.find(el=>el.id===id)
    let block = find.data.filter(el=>el.id!==data.id)
    let delblock =JSON.stringify(block)
    //let imgBlock=find.data.filter(el=>el.id!==data.id)
    let delImg =[...block,{id:data.id,text:data.text,value:data.value,image:null}]

    async function askForPermissions() { //разрешение на сьемку
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
        
        let dataReducer = {
          value: value,
          text: text,
          image: image,
          id: data.id
        } 
       
       let dataForBD = [...block,{
         value: value,
        text: text,
        image: image,
        id: data.id}
      ] 
        dataForBD = JSON.stringify(dataForBD)

        const getInfo = ()=>{
          const info ={id:id,
            data:dataReducer,
            databd:dataForBD
          }
         dispatch(updateInfo(info))
         //console.log(allThemes)
         nav()
          }

       const removeData =()=>{
         let iddata={
           idlarge:id,
           idsmall:data.id,
           all: delblock
         }
         dispatch(deleteBlock(iddata))
         setImage(null)
         setValue('')
         setText('')
         setFlag(false)
         nav()
       }

       const delPhoto =()=>{
         let delimg ={id:id, idmin:data.id, data:JSON.stringify(delImg)}
         dispatch(deletePhoto(delimg))
         setImage(null)
       }
          
  return(
       <View>
      {flag &&<TextInput
       placeholder="Введите что-нибудь"
       value={value}
       onChangeText={setValue}
       multiline
       />}
     {flag&&<TextInput
       placeholder="Введите какой-либо текст"
       value={text}
       onChangeText={setText}
       boxSizing="border-box"
       multiline
       paddingTop={30}
       />}
    {image && <Image style={styles.image} source={{uri:image}}/>}
    {flag&&<Button title="Изменить картику" color="pink" onPress={takePhoto}/>}
    {flag&&<Button title="Удалить картику" color="palevioletred" onPress={delPhoto}/>}
    {flag&&<Button title="Удалить данные" color="lightcoral" onPress={removeData}/>}
    {flag&&<Button onPress={getInfo} color="lightpink" title="Обновить данные"/>}
  </View>
  )
}

const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: 200,
      marginTop: 10
    }
  })

 /* (
    <View>
   {flag &&<TextInput
    placeholder="Введите что-нибудь"
    value={value}
    onChangeText={setValue}
    />}
  {flag&&<TextInput
    placeholder="Введите какой-либо текст"
    value={text}
    onChangeText={setText}
    boxSizing="border-box"
    paddingTop={30}
    />}
 {flag && image && <Image style={styles.image} source={{uri:image}}/>}
 {flag&&<Button title="Изменить картику" onPress={takePhoto}/>}
 {flag&&<Button title="Удалить картику" onPress={()=>setImage(null)}/>}
 {flag&&<Button title="Удалить данные" onPress={removeData}/>}
 {flag&&<Button onPress={getInfo} title="Обновить данные"/>}
</View>
)
*/
