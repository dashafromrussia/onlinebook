import React from 'react'
import {View, Text, StyleSheet,ImageBackground,TouchableOpacity} from 'react-native'

export const Page = ({theme, onOpen}) =>{
  return(
   <TouchableOpacity activeOpacity={0.7} onPress={()=>onOpen(theme)}>  
   <View style={styles.post}>
      <View style={styles.image}>
       <View style={styles.textWrap}>
        <Text style={styles.title}>Тема: "{theme.theme}"</Text>
        </View>
      </View>
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
        //backgroundColor: 'rgba(0,0,0,0.2)',
        backgroundColor:"white",
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