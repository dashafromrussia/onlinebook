import React,{createRef, useState,useEffect} from 'react'
import {Button, FlatList,Alert, ScrollView, View,TextInput,Text} from 'react-native'
import { useDispatch,useSelector} from 'react-redux'
import { RadioButton } from 'react-native-paper';
import { Historyquest } from './Historyquest';

export const HistoryBlocks= ({saveBlock,id}) => {

const dispatch = useDispatch()
const [visi,setVisi]=useState(true)
const [val,setVal]=useState('')
const [checked,setChecked] = useState('')
const [visibility,setVisibility]=useState(false)
const [variants,setVariants] = useState([])
const [variant,setVariant] = useState([])
const [quest,setQuest] = useState('')
const [right,setRight] = useState('')

useEffect(()=>{
 if(checked==="quest"){
     setVisibility(true)
 }else{
     setVisibility(false)
 }
},[checked])

const addVariants =()=>{
    setVariants(prev=>[...prev,Date.now().toString()])
}

const saveVariants =(data)=>{
    setVariant(prev=>[...prev,{...data}])
    setVariants(prev=>prev.filter(el=>el!==data.id))
}

const save = ()=>{
    let data
    if(checked==='quest'){
        data = {id:id,type:checked,describe:val,quest:quest,variants:variant,right:right,visi:false}
    }else if(checked==="sent"){
        data = {id:id,type:checked,describe:val,visi:false}
    }else{
        return false
    }
    saveBlock(data)
}

    
    return(<View>
       <TextInput placeholder="Напишите что-либо..." value={val} width={230} onChangeText={setVal}/>
       <Text>Предложение</Text>
       <RadioButton
          value="Предложение"
          status={ checked === 'sent' ? 'checked' : 'unchecked' }
          onPress={() => setChecked('sent')}
        />
        <Text>Задание</Text>
        <RadioButton
          value="Задание"
          status={ checked === 'quest' ? 'checked' : 'unchecked' }
          onPress={() => setChecked('quest')}
        />
       {visibility&&<View>
        <TextInput placeholder="Напишите вопрос..." value={quest} width={230} onChangeText={setQuest}/>
        <TextInput placeholder="Нoмер правильного ответа..." value={right} width={230} onChangeText={setRight}/>
        {variants.map(el=><Historyquest key={el} id={el} saveVariants={saveVariants}/>)}
        <Button title="Добавить вариант" color="black" onPress={addVariants}/>
        </View>}
       <Button title="Save block" onPress={save}/>
    </View>)
}

