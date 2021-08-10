import React, {useState,useEffect} from 'react'
import {View, Text, StyleSheet,ImageBackground,TouchableOpacity,Image, Button} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { CreateDrop } from '../components/CreateDrop'


export const CreateDropScreen = ({navigation}) =>{
    const [amount,setAmout] =useState([])
    const name = navigation.getParam('name')
    const dispatch = useDispatch()

    const addBlock =()=>{
        let element = Date.now().toString()
        setAmout(prev=>[...prev,{id:element}])
    }
    const deleteBlock =(id)=>{
        setAmout(prev=>prev.filter(el=>el.id!==id))
    }

    return(
     <View style={styles.block}>
         <Text>Создайте выпадающие блоки с заданиями</Text>
         {amount.map(el=><View key={el.id}><CreateDrop id={el.id} name={name} deleteBlock={deleteBlock}/></View>)}
        <Button title="Добавить блок" color="turquoise" onPress={addBlock}/>
        <Button title="Перейти к DropList" onPress={()=>{navigation.navigate('Drop',{name:name})}}/>
     </View>
    )
}


const styles = StyleSheet.create({
  block:{
      padding: 15
  },
  text:{
   
  }
})