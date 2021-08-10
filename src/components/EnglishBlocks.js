import React,{createRef, useState,useEffect} from 'react'
import {Button, FlatList,Alert, ScrollView, View,TextInput,Text} from 'react-native'
import { useDispatch,useSelector} from 'react-redux'
import { RadioButton } from 'react-native-paper';
import { Historyquest } from './Historyquest';

export const EnglishBlocks= ({saveBlock,id}) => {
const task = "Переведите предложение"
const dispatch = useDispatch()
const [val,setVal]=useState('')
const [checked,setChecked] = useState('')
const [visibut,setVisibut]=useState(false)
const [words,setWords] = useState('')
const [right,setRight] = useState('')

useEffect(()=>{
 if(checked==="buttons"){
     setVisibut(true)
 }else{
    setVisibut(false)
 }
},[checked])





const save = ()=>{
    let data
    if(checked==='buttons'){
        data = {id:id,type:checked,contain:val.trim(),right:right.trim(),buttons:words.trim(),task:task}
    }else if(checked==="write"){
        data = {id:id,type:checked,contain:val.trim(),right:right.trim(),task:task}
    }else{
        return false
    }
    saveBlock(data)
}

    
    return(<View>
        <Text>Составьте задания не перевод предложений</Text>
       <TextInput placeholder="Предложение для перевода.." value={val} width={230} onChangeText={setVal}/>
       <TextInput placeholder="Правильный перевод..." value={right} width={230} onChangeText={setRight}/>
       <Text>Перевод с помощью кнопок-слов</Text>
       <RadioButton
          value="Кнопки"
          status={ checked === 'buttons' ? 'checked' : 'unchecked' }
          onPress={() => setChecked('buttons')}
        />
        <Text>Письменный перевод</Text>
        <RadioButton
          value="Письменно"
          status={ checked === 'write' ? 'checked' : 'unchecked' }
          onPress={() => setChecked('write')}
        />
       {visibut&&<View>
        <Text>Напишите слова для кнопок для составления предложений без знаков препинания.Пр:I meat like full banana</Text>
        <TextInput placeholder="Напишите слова..." value={words} width={230} onChangeText={setWords}/>
        </View>}
       <Button title="Save block" onPress={save}/>
    </View>)
}
//let data ={id:"1",task:"переведите предложение",contain:"я люблю еду",right:"I like food",buttons:"I meat food love instead like ear"}

