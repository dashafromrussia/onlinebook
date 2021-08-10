import React,{useEffect,useState} from 'react'
import {View, Text, StyleSheet,FlatList,ScrollView, Image,Button,Alert} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { GalleryList } from '../components/GalleryList'
import { addFriend, removeFriend } from '../store/actions/post'



export const PersonScreen = ({navigation}) => { //персональн стр человеков
  const dispatch = useDispatch()
  let name = navigation.getParam('name')
  let myname = navigation.getParam('myname')
  //let img = navigation.getParam('img')
  const student= useSelector(state => state.post.students)
  const person = student.find(el=>el.name===name)
  const friends = person.friends
  const myfriends = student.find(el=>el.name===myname).friends
  const isFriend = myfriends.find(el=>el.name===name)
  const gallery = useSelector(state => state.post.gallery)
  const mygallery = gallery.filter(el=>el.name===name)
  const [nophoto,setNowphoto]=useState(false)
  const [yesphoto,setYesphoto]=useState(true)
  const [friend,setFriend] = useState(false)
  const [visibut,setVisibut]=useState(true)

 useEffect(()=>{
   if(mygallery.length==0){
     setNowphoto(true)
     setYesphoto(false)
   }
 },[mygallery.length])

 useEffect(()=>{
  if(isFriend!==undefined){
    setFriend(true)
  }else{
    setFriend(false)
  }
 },[isFriend])

  const onePhoto =(data)=>{
    navigation.navigate('Photo',{data:data,name:myname})
         }

         const personList =(myname,name)=>{
     
          if(myname===name){
           if(myname==="Teacher"){
            navigation.navigate('Admin',{name:myname})
          }else{
           navigation.navigate('Student',{name:myname})
          }
          }else{
           navigation.navigate('Person',{myname:myname,name:name})
          }
         }  
        
       

        const addToFriend =()=>{
          const addinfo ={myname:myname,myfriends:[...myfriends,{id:Date.now().toString(),name:name,new:"yes"}]}
         addFriend(addinfo)(dispatch)
        } 
        
        const removeinfo = {myname:myname,myfriends:myfriends.filter(el=>el.name!==name)}

        const removeFromFriend =()=>{
          removeFriend(removeinfo)(dispatch)
        }

  return(
      <View padding={12} height={1000}>
        <Text style={styles.text}>Пользователь:{name}</Text>
        <Image style={styles.image} marginBottom={10} source={{uri:person.image}}/>
        <Button title="Написать сообщение" color="black" onPress={()=>navigation.navigate('Message',{myname:myname,name:name})}/>
        <Text style={styles.text}>Друзья пользователя {name}</Text>
        {friends.map(el=><View key={el.id} padding={10}>
          <TouchableOpacity activeOpacity={0.7} onPress={()=>personList(myname,el.name)}>
           <Image style={styles.imagepp} source={{uri:student.find(elem=>elem.name===el.name).image}}/>
           <Text style={styles.text}>{el.name}</Text>
          </TouchableOpacity>
        </View>)}
        {isFriend?
          <Button title="Убрать из друзей" color="hotpink" onPress={removeFromFriend}/>:
          <Button title="Добавить в друзья" color="black" onPress={addToFriend}/>
          }
        <View style={styles.container}>
            {friend&&yesphoto&&mygallery.map(elem=>
            <View id={elem.id}>
              <GalleryList data={elem} onePhoto={onePhoto}/>
            </View>)}
            {nophoto&&<Text>Фото пока нет...</Text>}
          </View>
      </View>
  )
}

const styles = StyleSheet.create({
      image: {
        width: 50,
        height: 50,
        marginTop: 10,
        borderRadius:30
      },
      name:{
        fontFamily:'open-bold'
      },
      container:{
        flexWrap:"wrap",
        alignContent:'flex-start',
         width:'100%',
        flexDirection:'row',
        paddingLeft:8,
        marginTop:10
    
      },
      images: {
        width: 250,
        height: 250,
        marginTop: 10
      },
      imagepp: {
        width: 50,
        height: 50,
        borderRadius:50,
        margin:5
      },
      text:{
        fontFamily:'open-bold'
      }
  })