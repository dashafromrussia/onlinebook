import React,{useEffect,useState} from 'react'
import {View, Text, StyleSheet,FlatList,ScrollView, Image,Button,Alert} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTheme } from '../store/actions/post'


export const PageScreen = ({navigation}) => {
  
    const dispatch = useDispatch()
  let data = navigation.getParam('data')
  let datReverse = data.data
    const visible= navigation.getParam('visible')
   // console.log("Pageeee",data['data'].map(el=>el.value))

useEffect(()=>console.log(data))

const upDate =()=>{
    navigation.navigate('Update',{data:data})
}


const delDate=()=>{
    Alert.alert(
        'Удаление темы',
        'Вы точно хотите удалить тему?',
        [
          {
            text: 'Отменить',
            style: 'cancel'
          },
          {
            text: 'Удалить',
            style: 'destructive',
            onPress() {
                navigation.navigate('Main')
                dispatch(deleteTheme(data.id))
            }
          }
        ],
        { cancelable: false }
      )
    }

if (!data) {
    return null
  }
    return(
       <ScrollView>
         <View padding={10}>
           <Text style={styles.title}>Тема: "{data.theme}"</Text>
            <View>
               {datReverse.map((elem,index)=>{
                  return(<View key={index}>
                   {elem.value && <Text style={styles.minititle}>{elem.value}</Text>}
                   {elem.text && <Text style={styles.text}>{elem.text}</Text>}
                   {elem.image && <Image style={styles.image} source={{uri:elem.image}}/>}
                   </View>
                  )})} 
            </View>
            {visible&&<Button title="Изменить данные" onPress={upDate}/>}
            {visible&&<Button title="Удалить данные" onPress={delDate}/>}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image:{
        width:'100%',
        height: 200
    },
    title:{
       color: 'black',
        fontFamily:'open-bold',
        fontSize: 25
    },
    minititle:{
      color: 'black',
       fontFamily:'open-bold',
       fontSize: 17
   },
    text:{
      fontFamily:'open-regular',
      fontSize:15
  }
})