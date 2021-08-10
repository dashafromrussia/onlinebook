import React,{useEffect,useState} from 'react'
import {ScrollView, TextInput, StyleSheet,FlatList, Button, View, Image,Text} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { TestResults } from '../components/TestResults'



export const TestResultScreen = ({navigation}) => {

    const name = navigation.getParam('name')
    const users = useSelector(state => state.post.students)
    const myGroup = users.find(el=>el.name===name).groupname
    let marks = useSelector(state => state.post.marks).filter(el=>el.groupname===myGroup)
    const find = name.substring(name.length-7, name.length) 
   if(find!=="Teacher"){
       marks = marks.filter(el=>el.name===name)
   }
useEffect(()=>{
  //console.log(marks)
},[])

if(marks.length===0){
  return(
      <Text>Результатов пока нет...</Text>
  )
}

return(
<ScrollView>
{marks.map(el=>
     <View padding={10} key={el.id}>
      <Text style={styles.bold}>Дата теста:{el.time}</Text>
      <Text style={styles.theme}>Тема теста:{el.theme}</Text>
      <Text>Имя студента:{el.name}</Text>
      <Text>Оценка: "{el.mark}"</Text>
      {el.data.map(elem=><TestResults key={elem.id} idtest={el.idtest} data={elem}/>)}
     </View>   
)}
</ScrollView>
)
}

const styles = StyleSheet.create({
    bold:{
      fontFamily:'open-bold',
      color:'black'
    },
    theme:{
      fontFamily:'open-bold',
      color:"red"
    }, 
    header:{
      fontFamily:'open-bold',
      color:'blue'
    }
})