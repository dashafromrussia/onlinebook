import React,{useEffect, useReducer} from 'react'
import {View, Text, StyleSheet,FlatList,Image,Button,Alert,ScrollView,TouchableOpacity} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'



export const NewsScreen = ({navigation}) => {
    const dispatch = useDispatch()
  let name = navigation.getParam('name')
  const usersWithMe = useSelector(state => state.post.students)
  const comments= useSelector(state => state.post.comments)
  const likeposts = useSelector(state => state.post.likepost) 
  const likeMyPost = likeposts.filter(el=>el.author===name)
  const withOutmyLike = likeMyPost.filter(el=>{
    if(el.name===el.author){
      return false
    }
    return el
  })
  const gallery= useSelector(state => state.post.gallery)
  const filtAuthor =comments.filter(el=>el.towhome[0].towhome===name && el.towhome[0].towhome!==el.author[0].author)
  const filtToWhome = comments.filter(el=>el.author[0].author===name && el.name!==name)
  const newcomments = [...filtAuthor,...filtToWhome]

  let friends =[]
 /*usersWithMe.forEach(el=>{
    if(el.name!==name){
    el.friends.forEach(elem=>{
      if(elem.name===name){
        friends.push(el)
      }
    })
  }
  })*/

  usersWithMe.forEach(el=>{
    if(el.name!==name){
    if(el.friends.find(elem=>elem.name===name)!==undefined){
       friends.push(el)
    }     
    }
  })

  useEffect(()=>{
console.log("FRIINDS",usersWithMe)
  },[])

   const openPost =(id)=>{
    let post = gallery.find(el=>el.id===id)
    navigation.navigate('Photo',{data:post,name:name})
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

  return(<ScrollView>
         <View padding={10}>
           <Text style={styles.text}>Ответы на комментарии:</Text>
            {newcomments.map(el=>
             <TouchableOpacity key={el.id.toString()} activeOpacity={0.7} onPress={()=>openPost(el.idpost)}>
            <View style={styles.block}>
            <Image style={styles.imagepp} source={{uri:usersWithMe.find(elem=>elem.name===el.name).image}}/>  
            <Text>Комментарий от "{el.name}"</Text>
            <Text>"{el.comment}"</Text>
            <Image style={styles.img} source={{uri:gallery.find(elem=>elem.id===el.idpost).image}}/>
            </View>
            </TouchableOpacity>)}
            <Text style={styles.text}>Понравилось:</Text>
            {withOutmyLike.map(el=>
             <TouchableOpacity key={el.id.toString()} activeOpacity={0.7} onPress={()=>openPost(el.idpost)}>
            <View style={styles.block}>
              <Image style={styles.imagepp} source={{uri:usersWithMe.find(elem=>elem.name===el.name).image}}/>
              <Text>{el.name} поставил like на Ваш пост:</Text>
              <Image style={styles.img} source={{uri:gallery.find(elem=>elem.id===el.idpost).image}}/>
            </View>
            </TouchableOpacity>
            )}
            <Text style={styles.text}>Друзья:</Text>
            {friends.map(el=><View key={el.id} style={styles.block}>
              <Text>Вас добавил в друзья {el.name}</Text>
              <TouchableOpacity activeOpacity={0.7} onPress={()=>personList(name,el.name)}>
              <Image style={styles.imagepp} source={{uri:usersWithMe.find(elem=>elem.name===el.name).image}}/>
              </TouchableOpacity>
            </View>)}
            </View>
  </ScrollView>)
}


const styles = StyleSheet.create({
    imagep: {
      width: 70,
      height: 70,
      margin: 15,
      borderRadius:50
    },
    imagepp: {
      width: 50,
      height: 50,
      borderRadius:50,
      margin:5
    },
    img:{
      width: 50,
      height: 50,
      margin:5
    },
    text:{
      fontFamily:'open-bold'
    },
    block:{
      flexDirection:"row",
      alignItems:"center"
    }
  })