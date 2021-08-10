import React,{useState} from 'react'
import {View, Text, StyleSheet,ImageBackground,TouchableOpacity,TextInput,Button} from 'react-native'
//import { Button } from 'react-native-elements/dist/buttons/Button'
import { useDispatch } from 'react-redux'
import { workWork } from '../store/actions/post'
import { MiniWorks } from './MiniWorks'

export const Works= ({data}) =>{ //{data:[{name:"Masha", names:"Mashenka"}],id:"47585954"}
    
    /*const dispatch = useDispatch()

    const removes =()=>{
      workWork(data.id)(dispatch)
       console.log(data.id)
   }*/
   

  return(
      <View>
   {data.data.map(el=><MiniWorks key={el.id} id={data.id} data={el}/>)}
      </View>
  )
}