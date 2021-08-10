import React from 'react'
import {View, Text, StyleSheet,ImageBackground,TouchableOpacity} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

export const Historylist = ({data,openHistory}) =>{
   
  
  return(
    <TouchableOpacity activeOpacity={0.7} onPress={()=>openHistory(data)}>  
    <View style={styles.post}>
       <ImageBackground style={styles.image} source={{uri:'https://image.freepik.com/free-photo/white-brick-background-gypsum-tile-imitation-brick_156874-43.jpg'}}>
        <View style={styles.textWrap}>
         <Text style={styles.title}>История "{data.name}"</Text>
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