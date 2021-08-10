import React,{useEffect,useState} from 'react'
import {View, Text, StyleSheet,FlatList,ScrollView, Image,Button,Alert} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { CheckBox, Tooltip } from 'react-native-elements'


export const Cheki = ({index,elem,cheki,bigindex,answers}) => { //инфу с оценками перетащили в регион,здесь чисто теститнг
const [disable,setDisable] = useState(false)  
const [checked,setChecked] = useState(false)

useEffect(()=>{
    if(answers.find(el=>el.ind===bigindex)){
      setDisable(true)  
    }
},[answers])

const chekiki = ()=>{
    setChecked(!checked)
    if(checked===false){ //должны срав с тру,но стейт меняется с опозд,поэтому с фолс
        cheki(bigindex,index)  
    }  
}


return(
  <ScrollView>
    <CheckBox
      title={elem.variant}
       checked={checked}
       disabled={disable}
       onPress={()=>chekiki()}
    /> 
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