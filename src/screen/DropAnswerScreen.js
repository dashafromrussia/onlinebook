import React, {useState,useEffect} from 'react'
import {View, Text, StyleSheet,ImageBackground,TouchableOpacity,Image, Button, ScrollView} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { DropAnswer } from '../components/Dropanswer'
import { DB } from '../db'


export const DropAnswerScreen = ({navigation}) =>{
    const name = navigation.getParam('name')
    const users = useSelector(state => state.post.students)
    const myGroup = users.find(el=>el.name===name).groupname
    const dropanswer = useSelector(state => state.post.dropanswer)/*.filter(el=>el.groupname===myGroup)*/
 
    const dispatch = useDispatch()
    
    useEffect(()=>{
      console.log("drop",dropanswer)
    },[])

    const deleteDropAnswer =async()=>{
      await DB.deleteDropAnswer()
    }



    return(
      <ScrollView>
        <View padding={10}>
        {dropanswer.map(el=><DropAnswer data={el} key={el.id}/>
          )}
        <Button title="Удалить все ответы" color="pink" onPress={deleteDropAnswer}/>
        </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    text:{
     fontFamily:'open-bold' 
    }
  })