import React,{useEffect,useState} from 'react'
import {ScrollView, Text, StyleSheet,FlatList, Button, View, Image,TextInput} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'

export const BadgeComponent= ({info}) => {
    
    const newsBage = useSelector(state => state.post.newbadge)//имя пользвателя
    const name = newsBage[0].name
    const allMess = useSelector(state => state.post.messages)//сообщения из чатов
    const newmessages = allMess.filter(el=>el.towhome===name && el.new==="yes") 
   
    
    return(
    <View>
         <Ionicons name='ios-chatboxes' size={30} color={info.tintColor} /*onPress={()=>{console.log("tabsss")}}*//>
        {
        newmessages.length > 0 ?
        <View style={{ position: 'absolute', right: 10, top: 5, backgroundColor: 'red', borderRadius: 9, width: 14, height: 14, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white',fontSize:10 }}>{newmessages.length}</Text>
        </View> : null
        }
    </View>
    )
}