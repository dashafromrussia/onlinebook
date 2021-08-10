import React,{useEffect,useState} from 'react'
import {ScrollView, Text, StyleSheet,FlatList, Button, View, Image, TouchableOpacity} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Student } from '../components/Student'

export const ChatScreen = ({navigation}) => {
  
    const myname= navigation.getParam('name')
    const redirect = navigation.navigate('redirect')
    const usersWithMe = useSelector(state => state.post.students)
    const megroup = usersWithMe.find(el=>el.name===myname).groupname
    const users = usersWithMe.filter(el=>el.groupname===megroup)
    
    

    const onOpen =(name)=>{
        navigation.navigate('Message',{name:name,myname:myname})
      }


    return(
        <View padding={10}>
        {users.map(elem=>
            <View key={elem.id}>
            <Student id={elem.id} name={elem.name} myName={myname} onOpen={onOpen}/>
            </View>
            )}
        </View>
    )
}

/*
export const ChatScreen = ({navigation}) => {
   
    const myname= navigation.getParam('name')
    const usersWithMe = useSelector(state => state.post.students)
    const users = usersWithMe.filter(el=>el.name!==myname)
    
    

    const onOpen =(name)=>{
        navigation.navigate('Message',{name:name,myname:myname})
      }


    return(
        <View>
        {users.map(elem=>
            <View key={elem.id}>
            <Student id={elem.id} name={elem.name} myName={myname} onOpen={onOpen}/>
            </View>
            )}
        </View>
    )
}*/