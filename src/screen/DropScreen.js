import React, {useState,useEffect} from 'react'
import {View, Text, StyleSheet,ImageBackground,TouchableOpacity,Image, Button} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { CreateDrop } from '../components/CreateDrop'
import { DropList } from '../components/DropList'


export const DropScreen = ({navigation}) =>{
    const name = navigation.getParam('name')
    const users = useSelector(state => state.post.students)
    const myGroup = users.find(el=>el.name===name).groupname
    const droplist = useSelector(state => state.post.droplist).filter((el)=>el.groupname===myGroup) 
    const dropanswer = useSelector(state => state.post.dropanswer)
    

    let marks = 0
    dropanswer.forEach(el=>{
        if(el.name===name){
      marks = Number(marks) + Number(el.mark)
        }
    })

    useEffect(()=>{
     console.log(myGroup)
    },[])
    

    return(
        <View>
        {droplist.map(el=><DropList key={el.id} name={name} groupname={myGroup} data={el}/>)}
        <Text padding={10}>Общая оценка: "{marks}"</Text>  
        </View>
    )
}