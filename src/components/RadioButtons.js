import React,{useEffect,useState} from 'react'
import {View, Text, StyleSheet,FlatList,ScrollView, Image,Button,Alert} from 'react-native'
import { RadioButton } from 'react-native-paper';




export const RadioButtonscomp = ({el,index,rightRadioButton,delVariant,myanswer}) => {
    const [checked, setChecked] = useState('0');
    const [count,setCount] = useState(0)
    
   
    useEffect(()=>{
      if(myanswer!==undefined){ //если уже отвечено,чтоб при перерендеринге не спадал значок чекед
      if(myanswer.myanswer!==undefined){
         if(myanswer.myanswer.split(',').find(elem=>Number(elem)===Number(index+1))){
          setChecked(index+1)
         } 
       }
      }
    },[])

    const checkedData =()=>{
       setCount(prev=>prev+1)//сразу не срабатыв
       let ind = index+1
       ind = ind.toString()
       console.log(ind)
       if(count%2!==1){
      rightRadioButton(ind)
       setChecked(index+1)
   }else{
       setChecked('0')//если выбор ответа отменяется,то убирается горящий кружочек
       delVariant(ind)//удал из массива с ответами
   }
   }

    return (
      <View>
        <Text>{index+1}.{el.variant}</Text>
        <RadioButton
          value={index+1}
          status={ checked === index+1 ? 'checked' : 'unchecked' }
          onPress={() => checkedData()}
        />
      </View>
    );
}