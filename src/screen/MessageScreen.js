import React,{useEffect,useState,useCallback} from 'react'
import {ScrollView, Text, StyleSheet,FlatList, Button, View, Image, TextInput,TouchableOpacity,} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ContentMess } from '../components/ContentMess'
import { pechatMess, pechatRemove, removeMessage } from '../store/actions/post'
import { sendMessage } from '../store/actions/post'
import { EditModal } from '../components/EditModal'
import { ModalMes } from '../components/ModalMes';
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { ImageWithModal } from '../components/ImageWithModal'
import { NewImageModal } from '../components/NewImageModal'
import { Icon } from 'react-native-elements'

export const MessageScreen = ({navigation}) => {
  const name= navigation.getParam('name')
  const myName= navigation.getParam('myname')
  const redirectMessage =navigation.getParam('redirect')
  const redirectPost = navigation.getParam('redirectpost')
  const usersWithMe = useSelector(state => state.post.students)
  const pechat = useSelector(state => state.post.pechat) //кто печатает сообщ
  const pechatForMe = pechat.filter(elem=>elem.name===name && elem.towhome===myName) //если мне кто-то печатает
  const mypechat = pechat.filter(elem=>elem.name===myName && elem.towhome===name) //если я кому-то печатаю
  let redirectpost
  if(redirectPost==undefined){
    redirectpost = []
  }else{
    redirectpost = redirectPost
  }

  let redirectmessage 
  if(redirectMessage===undefined){
    redirectmessage = []
  }else{
    redirectmessage = redirectMessage
  }

  const [sharepost,setSharepost] = useState(redirectpost)
  const [redirect,setRedirect]=useState([])
  const [modaldirect,setModaldirect]=useState(false)
  const dispatch = useDispatch()
  const allMess = useSelector(state => state.post.messages)
  const students = allMess.filter(elem=>elem.name===name && elem.towhome===myName)
  const mymess = allMess.filter(elem=>{
    if(myName!==name){ //для того чтобы не было проблем с чатом с самим собой
    return elem.name===myName && elem.towhome===name
    }
    return null 
  })

  let  allmessages = [...students,...mymess]
   allmessages.sort((a, b) => Number(a.id) > Number(b.id) ? 1 : -1)
  const [mess,setMess]=useState('')
  const [images,setImages]=useState([])
  const[modal, setModal] = useState(false)
  
useEffect(()=>{
  console.log("POST",sharepost)
},[])

/*const memoizedCallback = useCallback( 
  () => {
    dispatch(pechatRemove(id)) 
  },
  [id,dispatch],
);*/

useEffect(()=>{
  if(mypechat.length!==0){
    dispatch(pechatRemove(mypechat[0].id)) 
  }
},[])

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
  
       let id=Date.now().toString()
         setImages((prev)=>[...prev,{id:id,image:img.uri}])
      }

  const delPicture =(id)=>{
   setImages(images.filter(elem=>elem.id!==id))
  }

  let sendmess=[]
  let send
  
  const sendMes =()=>{ //чтобы элемент массива редирект не был вложенным,делаем следующее
    if(redirectmessage.length===0){ //еслм переслан сообщ нет
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
  }
  dispatch(sendMessage(send))
  if(mypechat.length!==0){
  dispatch(pechatRemove(mypechat[0].id))
  }
  redirectmessage=[]
  setRedirect([])
  setImages([])
  setMess('')
  setSharepost([])
  console.log(redirectPost)
  }


  const removeMess =(id)=>{
      let delmes =allmessages.filter(el=>el.id===id && el.name===myName)
      if(delmes.length!==0){
    dispatch(removeMessage(id))
      }   
  }  
  
  
  const redirectMess =(data)=>{ //пересылка сообщ другому пользователю
    setRedirect([{...data}])
    setModaldirect(true)
}

const cancelModal =()=>{
  setRedirect([])
  setModaldirect(false)
}

//кому шлем
const onOpen =(username)=>{
  navigation.navigate('Message',{name:username,myname:myName,redirect:redirect})
  setModaldirect(false)
}
//

const onePhoto =(data)=>{
  navigation.navigate('Photo',{data:data,name:myName})
       }

let pech = {id:Date.now().toString(), name:myName,towhome:name,status:"Печатает...."}
const writeMess =(text)=>{ //печатает...
  setMess(text)
  if(mypechat.length===0){
  dispatch(pechatMess(pech))
  }
}

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

  return(
     <ScrollView>
       <View backgroundColor="azure">
         <View style={styles.block}>
         <TouchableOpacity activeOpacity={0.7} onPress={()=>personList(myName,name)}> 
         <Image style={styles.imageuser} source={{uri:usersWithMe.find(el=>el.name===name).image}}/>  
         <Text style={styles.text}>Сообщения от {name}</Text>
         </TouchableOpacity> 
         </View>
         {allmessages.map(elem=>
          <ContentMess key={elem.id} data={elem} name={myName} redirectMess={redirectMess} removeMess={removeMess} onePhoto={onePhoto}/>
          )}
          {/*images.map((elem)=><TouchableOpacity key={elem.id} activeOpacity={0.7} onPress={()=>setModal(true)} >
            <EditModal image={elem.image} visible={modal} onCancel={()=>setModal(false)}/>
            <Image style={styles.image} source={{uri:elem.image}}/>
            </TouchableOpacity> 
         )*/}
          {images.map((elem)=>
          <NewImageModal key={elem.id} id={elem.id} image={elem.image} delPicture={delPicture}/>
        )}
          <ModalMes visible={modaldirect} name={myName} onOpen={onOpen} onCancel={cancelModal}/>
          {redirect.map(el=>
            <View backgroundColor="pink" key={el.id}>
              <Text>{el.name}</Text>
              <Text>{el.mess}</Text>
              {el.images.map(elem=>
            <Image key={elem.id} style={styles.imagemini} source={{uri:elem.image}}/>
              )}
            {el.sharepost.map(val=><View key={val.id}>
              <Text style={styles.text}>"Пост из галереи от {val.name}"</Text>
                <Image style={styles.imagemini} source={{uri:val.image}}/> 
            </View>)}
            {el.redirect.map(element=>
            <View key={element.id}>
              <Text>{element.name}</Text>
              <Text>{element.mess}</Text>
              {element.images.map(img=>
            <Image key={img.id} style={styles.imagemini} source={{uri:img.image}}/>
              )}
              {element.sharepost.map(val=><View key={val.id}>
              <Text style={styles.text}>"Пост из галереи от {val.name}"</Text>
                <Image style={styles.imagemini} source={{uri:val.image}}/> 
            </View>)}
            </View>
          )} 
            </View>
              )}
          {sharepost.map(val=><View key={val.id}>
              <Text style={styles.text}>"Пост из галереи от {val.name}"</Text>
                <Image style={styles.imagemini} source={{uri:val.image}}/> 
          </View>)}
          {pechatForMe.map(el=><Text key={Date.now().toString()}>{el.status}</Text>)}
          <View style={styles.block}>
          <TextInput placeholder="Введите сообщение....." width={270} value={mess} onChangeText={(text)=>{writeMess(text)}}/>
          <Icon name='sc-telegram' type='evilicon' size={50} onPress={sendMes} color="palevioletred"/>
          <Icon name='camera' type='evilicon' size={50} onPress={takePhoto} color="palevioletred" />
          </View>
          </View>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    marginTop: 10
  },
  imagemini:{
    width: 70,
    height: 70
  },
  text:{
    fontFamily:'open-bold' 
   },
   block:{
     flexDirection:"row",
     alignItems:"center",
     marginBottom:15,
     padding:5
   },
   imageuser: {
    width: 30,
    height: 30,
    borderRadius:50,
    margin:5
  },
  block:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#ffccdd",
    padding:5
  }
})


  /*(
    <ScrollView>
        <Text>Сообщение от {name}</Text>
        {allmessages.map(elem=>
         <ContentMess key={elem.id} data={elem} name={myName} redirectMess={redirectMess} removeMess={removeMess}/>
         )}
         {images.map((elem)=><TouchableOpacity key={elem.id} activeOpacity={0.7} onPress={()=>setModal(true)} onLongPress={()=>delPicture(elem.id)}>
           <EditModal image={elem.image} visible={modal} onCancel={()=>setModal(false)}/>
           <Image style={styles.image} source={{uri:elem.image}}/>
           </TouchableOpacity> 
          )}
         <ModalMes visible={modaldirect} name={myName} onOpen={onOpen} onCancel={cancelModal}/>
         {redirect.map(el=>
           <View backgroundColor="pink" key={el.id}>
             <Text>{el.name}</Text>
             <Text>{el.mess}</Text>
             {el.images.map(elem=>
           <Image key={elem.id} style={styles.imagemini} source={{uri:elem.image}}/>
             )}
           {el.redirect.map(element=>
           <View key={element.id}>
             <Text>{element.name}</Text>
             <Text>{element.mess}</Text>
             {element.images.map(img=>
           <Image key={img.id} style={styles.imagemini} source={{uri:img.image}}/>
             )}
           </View>
         )} 
           </View>
             )}
         <TextInput placeholder="Введите сообщение" value={mess} onChangeText={setMess}/>
         <Button title="Добавить фото" onPress={takePhoto}/>
         <Button title="Отправить сообщение" onPress={sendMes}/>
     </ScrollView>
 )*/

/* export const MessageScreen = ({navigation}) => {
  const name= navigation.getParam('name')
  const myName= navigation.getParam('myname')
  const redirectMessage =navigation.getParam('redirect')

  let redirectmessage 
  if(redirectMessage===undefined){
    redirectmessage = []
  }else{
    redirectmessage = redirectMessage
  }
  const [redirect,setRedirect]=useState([])
  const [modaldirect,setModaldirect]=useState(false)
  const dispatch = useDispatch()
  const allMess = useSelector(state => state.post.messages)
  const students = allMess.filter(elem=>elem.name===name && elem.towhome===myName)
  const mymess = allMess.filter(elem=>elem.name===myName && elem.towhome===name)
  let  allmessages = [...students,...mymess]
   allmessages.sort((a, b) => Number(a.id) > Number(b.id) ? 1 : -1)
  const [mess,setMess]=useState('')
  const [images,setImages]=useState([])
  const[modal, setModal] = useState(false)
  
useEffect(()=>{
  console.log("MESS",name,redirect)
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
  
       let id=Date.now().toString()
         setImages((prev)=>[...prev,{id:id,image:img.uri}])
      }

  const delPicture =(id)=>{
   setImages(images.filter(elem=>elem.id!==id))
  }

  let sendmess=[]
  let send
  
  const sendMes =()=>{ //чтобы элемент массива редирект не был вложенным,делаем следующее
    if(redirectmessage.length===0){ //еслм переслан сообщ нет
    send={name:myName, mess:mess, images:images, towhome:name,new:'yes',redirect:[]}
  }else{
    redirectmessage.forEach(el=>{ //если есть пересланное сообщ,но у него нет пересланного
      if(el.redirect.length===0){
      send={name:myName, mess:mess, images:images, towhome:name,new:'yes',redirect:redirectmessage}
      }else{ //если есть пересланное и у него тоже есть пересланное
    sendmess.push({id:el.id,name:el.name,mess:el.mess,images:el.images,towhome:el.towhome, new:el.new})
    el.redirect.forEach(elem=>{
    sendmess =[...sendmess,{...elem}]
    send={name:myName, mess:mess, images:images, towhome:name,new:'yes',redirect:sendmess}
  })
    }
    }) 
  }
  dispatch(sendMessage(send))
  redirectmessage=[]
  setRedirect([])
  setImages([])
  setMess('')
  console.log(send)
  }


  const removeMess =(id)=>{
      let delmes =allmessages.filter(el=>el.id===id && el.name===myName)
      if(delmes.length!==0){
    dispatch(removeMessage(id))
      }   
  }  
  
  
  const redirectMess =(data)=>{ //пересылка сообщ другому пользователю
    setRedirect([{...data}])
    setModaldirect(true)
}

const cancelModal =()=>{
  setRedirect([])
  setModaldirect(false)
}


const onOpen =(username)=>{
  navigation.navigate('Message',{name:username,myname:myName,redirect:redirect})
  setModaldirect(false)
}

  return(
     <ScrollView>
         <Text>Сообщение от {name}</Text>
         {allmessages.map(elem=>
          <ContentMess key={elem.id} data={elem} name={myName} redirectMess={redirectMess} removeMess={removeMess}/>
          )}
          {images.map((elem)=><TouchableOpacity key={elem.id} activeOpacity={0.7} onPress={()=>setModal(true)} onLongPress={()=>delPicture(elem.id)}>
            <EditModal image={elem.image} visible={modal} onCancel={()=>setModal(false)}/>
            <Image style={styles.image} source={{uri:elem.image}}/>
            </TouchableOpacity> 
           )}
          <ModalMes visible={modaldirect} name={myName} onOpen={onOpen} onCancel={cancelModal}/>
          {redirect.map(el=>
            <View backgroundColor="pink" key={el.id}>
              <Text>{el.name}</Text>
              <Text>{el.mess}</Text>
              {el.images.map(elem=>
            <Image key={elem.id} style={styles.imagemini} source={{uri:elem.image}}/>
              )}
            {el.redirect.map(element=>
            <View key={element.id}>
              <Text>{element.name}</Text>
              <Text>{element.mess}</Text>
              {element.images.map(img=>
            <Image key={img.id} style={styles.imagemini} source={{uri:img.image}}/>
              )}
            </View>
          )} 
            </View>
              )}
          <TextInput placeholder="Введите сообщение" value={mess} onChangeText={setMess}/>
          <Button title="Добавить фото" onPress={takePhoto}/>
          <Button title="Отправить сообщение" onPress={sendMes}/>
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    marginTop: 10
  },
  imagemini:{
    width: 70,
    height: 70
  }
})*/


/*const styles = StyleSheet.create({
  todo:{
      flexDirection:"row",
      alignItems:'center',
      padding: 15,
      borderWidth: 1,
      borderColor: '#eee',
      borderRadius: 5,
      marginBottom: 10
  },
  text:{
   
  }
})*/
