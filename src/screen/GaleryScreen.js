import React,{useEffect,useState} from 'react'
import {ScrollView, TextInput, StyleSheet,FlatList, Button, View, Image,Platform,TouchableNativeFeedback,TouchableOpacity} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { addGallery } from '../store/actions/post'
import { GalleryList } from '../components/GalleryList'
import { MaterialIcons } from '@expo/vector-icons';

export const GaleryScreen = ({navigation}) => {
    const [image,setImage]=useState(null)
    const [com,setCom] = useState('')
    const [visible,setVisible] =useState(true)
    const [unvisible,setUnvisible]=useState(false)
    const dispatch = useDispatch()
    const Wrapper = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity

    const name = navigation.getParam('name')
    const allgallery = useSelector(state => state.post.gallery)
    const usersWithMe= useSelector(state => state.post.students)
    const myGroupname = usersWithMe.find(el=>el.name===name).groupname
    const myGroup = usersWithMe.filter(el=>el.groupname===myGroupname)
    const friends =myGroup.find(el=>el.name===name).friends
    let gallery =[]

    allgallery.forEach(el=>{
      if(el.name===name){
        gallery.push(el)
      }
      friends.forEach(elem=>{
        if(el.name===elem.name){
          gallery.push(el)
        }
      })
    })
    

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
           setUnvisible(true)
           setVisible(false)
        }
        
        const saveAll =()=>{
            let data = {image:image,comment:com,name:name}
            addGallery(data)(dispatch)
            setCom('')
            setImage(null)
            setUnvisible(false)
            setVisible(true)
        }
      
       const onePhoto =(data)=>{
        navigation.navigate('Photo',{data:data,name:name})
             }

    return(
        <ScrollView>
          <View style={styles.block}>
            <TextInput placeholder="Оставьте комментарий к фото...." value={com} width={230} onChangeText={setCom}/>
            {/*visible&&<Button title="Добавить фото" color="#BC8F8F" onPress={takePhoto}/>*/}
            {visible&&<Wrapper onPress={takePhoto}>
              <MaterialIcons name="add-a-photo" size={40} color="black"/>
            </Wrapper>}
            </View>
            {image&&<Image style={styles.image} source={{uri:image}}/>}
            {unvisible&&<Button title="Сохранить всё" color="palevioletred" onPress={saveAll}/>}
            <View style={styles.container}>
            {gallery.map(elem=>
            <View id={elem.id.toString()}>
              <GalleryList data={elem} onePhoto={onePhoto}/>
            </View>)}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
      flexWrap:"wrap",
      alignContent:'flex-start',
       width:'100%',
      flexDirection:'row',
      paddingLeft:8
  
    },
    image: {
      width: 250,
      height: 250,
      marginTop: 10
    },
    block:{
      flexDirection:"row",
      alignItems:"center",
      marginLeft: 10,
      marginVertical:15
    }
  })