import React,{useState,useEffect} from 'react'
import {View, Text, StyleSheet,ImageBackground,TouchableOpacity} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

export const ResultsVariants = ({index,variant,rightanswer,myanswer}) =>{
  const [color,setColor] = useState('azure')
  const [sign,setSign] = useState(null)
  useEffect(()=>{
   /* myanswer.forEach(elem=>{
     if(rightanswer.find(el=>el===elem)&& elem===index){
      setColor('azure')
      }else if(rightanswer.find(el=>el===index)&&elem!==index){
       setColor("lightpink") 
      }*/
      //1 сп
      /*if(rightanswer.find(el=>el===index.toString())&& myanswer.find(elem=>elem===index.toString())){
          setColor('azure')
        }else if(rightanswer.find(el=>el===index.toString())===undefined && myanswer.find(elem=>elem===index.toString())){
          setColor('lightpink') 
        }*/
      //2 сп
        if(myanswer.find(elem=>elem===index.toString())){
           if(rightanswer.find(el=>el===index.toString())){
             setColor('#c5fada') //варианты,которые выбр правильно
             setSign("+")
           }else{
             setColor('lightpink')//варианты,которые выбр неправильно
             setSign("-")
           }
        }
    //  }
  // })
  },[])

  return(
      <View backgroundColor={color}>
        <Text>{index}.{variant}  {sign}</Text>
      </View>
  )
}