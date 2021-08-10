import React,{useState} from 'react'
import {View, Text, StyleSheet,ImageBackground,TouchableOpacity,TextInput,Button} from 'react-native'
//import { Button } from 'react-native-elements/dist/buttons/Button'
import { useDispatch,useSelector } from 'react-redux'


export const InputVariants = ({id,saveVariants,index}) =>{ //{name:"Masha", names:"Mashenka"}
   const [variant,setVariant] = useState('')
   const [visible,setVisible]=useState(true)

   const saveVariant =()=>{
    saveVariants({id:id,variant:variant})   
    setVisible(false)
    console.log({id:id,variant:variant})
   }
    
  return(
      <>
      {visible&&<View>
          <Text>{`${index}`}.</Text>
          <TextInput placeholder="Введите вариант ответа..." value={variant} onChangeText={(variant)=>setVariant(variant)}/>
          <Button title="Сохранить вариант" onPress={saveVariant}/>
      </View>}
      </>
  )
}