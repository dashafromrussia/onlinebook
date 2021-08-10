
import React,{useEffect,useState} from 'react'
import {ScrollView, Text, StyleSheet,FlatList, Button, View, Image,TextInput,Alert} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { DB } from '../db'
import { Ionicons } from '@expo/vector-icons'


export const ConfBadge= ({info}) => {
  
    const dispatch = useDispatch()
    const newsBage = useSelector(state => state.post.newbadge)//имя пользв
    const name = newsBage[0].name
    const conference = useSelector(state => state.post.conference)
    let newMess =[]
    conference.forEach(el=>{
      if(el.name!==name){
      el.towhome.map(elem=>{
        if(elem.name===name && elem.news==="yes"){
         newMess.push(elem)
        }
        return elem
      })
    }
    }
     )
  

    return(
        <View>
        {<Ionicons name='ios-people' size={33} color={info.tintColor}/>}
       {
        newMess.length > 0 ?
        <View style={{ position: 'absolute', right: 10, top: 5, backgroundColor: 'red', borderRadius: 9, width: 14, height: 14, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white',fontSize:10 }}>{newMess.length}</Text>
        </View> : null
    }
        </View>
    )
}