import React,{createRef, useState,useEffect} from 'react'
import {Button, FlatList,Alert, ScrollView, View,TextInput} from 'react-native'
import { useDispatch,useSelector} from 'react-redux'

export const Historyquest= ({saveVariants,id}) => {

const [val,setVal]=useState('')
const [visi,setVisi] =useState(true)

const saveVariant =()=>{
 saveVariants({id:id,variant:val})
 //setVisi(false)
}
    
    return(<View>
       {visi&&<TextInput placeholder="Напишите вариант ответа..." value={val} width={230} onChangeText={setVal}/>}
       {visi&&<Button title="Save variant" color="black" onPress={saveVariant}/>}
    </View>)
}
