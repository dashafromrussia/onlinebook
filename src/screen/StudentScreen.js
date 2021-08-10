import React,{useEffect,useState,useCallback} from 'react'
import {ScrollView, Text, StyleSheet,FlatList, Button,TextInput,Image,TouchableOpacity, View, Alert} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { newBadge, oldFriend, oldlikePost, readsComment, removeFriend,loadPupils} from '../store/actions/post'
import { IconBadge } from '../components/IconBadge'


export const StudentScreen = ({navigation}) => {
 
    const visible= navigation.getParam('visible')
    const name = navigation.getParam('name')
    const dispatch =useDispatch()
    const usersWithMe= useSelector(state => state.post.students)
    const me =usersWithMe.find(el=>el.name===name)
    const friends = me.friends
    const gallery = useSelector(state => state.post.gallery)
    const likeposts = useSelector(state => state.post.likepost) 
    const newlikeMyPost = likeposts.filter(el=>el.author===name)
   const comments= useSelector(state => state.post.comments)
   let ifriend =[] //у кого я в др
  let newCom =[]
  const newCommments = comments.map(el=>{
    if(el.towhome[0].towhome===name && el.towhome[0].new==="yes"){
      el.towhome[0].new="no"
      if(el.towhome[0].towhome!==el.author[0].author){
      newCom.push(el)
      }
    }
      if(el.author[0].author===name && el.author[0].new==="yes"){
       el.author[0].new="no"
        if(el.name!==name){
          newCom.push(el)
        }
       }
    return el
  })

  const withOutmyLike = newlikeMyPost.filter(el=>{
    if(el.name===el.author){
      return false
    }
    return el
  })

 withOutmyLike.forEach(el=>{
    if(el.new=="yes"){
      newCom.push(el)
    }
  })

  usersWithMe.forEach(el=>{ //у кого я в друзьях
    if(el.name!==name){
    el.friends.forEach(elem=>{
      if(elem.name===name){
        ifriend.push(el)
      }
    })
  }
  })

  usersWithMe.forEach(el=>{ //убирает пометку новые для отсыла на бд
    if(el.name!==name){
    el.friends.map(elem=>{
      if(elem.name==name && elem.new==="yes"){
        elem.new="no"
        newCom.push(elem)
        
      }
    })
  }
  })

  let newOldFriends = usersWithMe.map((elem,index)=>{ //делаем новые id по порядку,тк эти данные мы засовываем сразу в редакс,нам нужно чтобы id в редакс совпадали с id в бд
    elem.id = index+1
    return elem
  })


  useEffect(()=>{
    //console.log("aaaaaaaa",usersWithMe)
    newBadge({name:name})(dispatch)
   },[])
   
 
  const editProf =()=>{
    let aboutMe =usersWithMe.find(el=>el.name===name)
    console.log(aboutMe)
    navigation.navigate('Edit',{data:aboutMe})
  }


  const goToNews =()=>{
     oldFriend(newOldFriends)(dispatch)
      readsComment(newCommments)(dispatch)
      oldlikePost(name)(dispatch)
      navigation.navigate('News',{name:name})
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

     
     const removeFromFriend =(elname,myfriends)=>{ //убирает меня у других пользователей из друзей
      const removeinfo = {myname:elname,myfriends:myfriends.filter(el=>el.name!==name)}
       removeFriend(removeinfo)(dispatch)
     } 

    return(
        <ScrollView padding={20}>
          <View style={styles.block}>
            <Text style={styles.text}>Кабинет ученика</Text>
            <IconBadge info={newCom} goToNews={goToNews}/>
            </View>  
            <View style={styles.block}>
              <Image style={styles.imagep} source={{uri:me.image}}/>
              <Text style={styles.text}>Здравствуйте,{name}!</Text>
            </View>
            <Button title="Главный экран" padding={10} color="crimson" onPress={()=>navigation.navigate('Mainnav',{name:name,visible:visible})}/>
            <Button title="Редактировать профиль" color="palevioletred" onPress={editProf}/> 
            <Button title="Перейти к заданиям" color="plum" onPress={()=>{navigation.navigate('Drop',{name:name})}}/>   
            <Button title="Результаты теста" color="palevioletred" onPress={()=>{navigation.navigate('Result',{name:name})}}/>
            <Button title="Понравилось" color="lightpink" onPress={()=>{navigation.navigate('Like',{name:name})}}/>
            <Text style={styles.text}>Мои друзья:</Text>
            <View style={styles.block} marginBottom={10}>
            {friends.map(el=><View key={el.id}>
             <TouchableOpacity activeOpacity={0.7} onPress={()=>personList(name,el.name)}>
               <Image style={styles.imagepp} source={{uri:usersWithMe.find(elem=>elem.name===el.name).image}}/>
               <Text>{el.name}</Text>
              </TouchableOpacity>
            </View>)}
            </View>
            {ifriend.length>0 ?
              <Text style={styles.text}>Вы в друзьях у:</Text>:
              null
              }
            <View style={styles.block}> 
            {ifriend.map(el=><View key={el.id} marginRight={15}>
             <TouchableOpacity activeOpacity={0.7} onPress={()=>personList(name,el.name)}>
               <Image style={styles.imagepp} source={{uri:el.image}}/>
               <Text>{el.name}</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} onPress={()=>removeFromFriend(el.name,el.friends)}>
                <Text style={styles.texterror}>Удалить</Text>
              </TouchableOpacity>
            </View>)
            }
            </View> 
          </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: 200,
      margin:15
    },
    back:{
      backgroundColor:"#E0FFFF"
    },
    imagep: {
      width: 70,
      height: 70,
      margin:15,
      borderRadius:50
    },
    text:{
      fontFamily:'open-bold',
      color:"black"
    },
    texterror:{
      fontFamily:'open-bold',
      color:"red"
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
    block:{
      flexDirection:"row",
      alignItems:"center",
    }
  })

