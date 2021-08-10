import React from 'react'
import {View, Text, StyleSheet,ImageBackground,TouchableOpacity, Alert} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { oneEnglish } from '../store/actions/post'

export const Englishlist = ({data,openHistory,name}) =>{
  const engresult = useSelector(state => state.post.engresult)
  const find = engresult.find(el=>Number(el.idtask)===Number(data.id) && el.name===name)
  const findteach = name.substring(name.length-7, name.length)  
    const dispatch = useDispatch()
    let engdata = data.data
    engdata.forEach((el,index)=>{ //делаем сразу  со скрытым блоком
      el.index = index
      el.idtask = data.id
      el.image ="https://www.ejin.ru/wp-content/uploads/2017/12/turtle_clip_art.svg_.png"
      if(index===0){
        el.display = true
      }else{
        el.display = false
      }
    })

     const openEngdata =()=>{
     if(find===undefined || findteach==="Teacher"){
       oneEnglish(engdata)(dispatch)
       openHistory(data)
    }else{
      Alert.alert('Вы уже прошли это задание')
      return false
    }
     }

  return(
    <TouchableOpacity activeOpacity={0.7} onPress={openEngdata}>  
    <View style={styles.post}>
       <ImageBackground style={styles.image} source={{uri:'https://image.freepik.com/free-photo/white-brick-background-gypsum-tile-imitation-brick_156874-43.jpg'}}>
        <View style={styles.textWrap}>
         <Text style={styles.title}>"{data.name}"</Text>
         </View>
       </ImageBackground>
   </View>
   </TouchableOpacity> 
  )
}


const styles = StyleSheet.create({
    post: {
        marginBottom:15,
        overflow:'hidden',
        width:'100%',
        borderBottomWidth: 2,
        borderColor:"black"
    },
    image:{
        width:'100%',
        height: 100
    },
    textWrap:{
        backgroundColor: 'white',
        paddingVertical:5,
        alignItems:'center',
        width:'100%',
        height:100
    },
    title:{
        color:"black",
        fontFamily:'open-bold',
        fontSize: 30
    }
})