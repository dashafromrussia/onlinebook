import React,{useState} from 'react'
import {View, Text, StyleSheet,ImageBackground,TouchableOpacity,TextInput,Button} from 'react-native'
//import { Button } from 'react-native-elements/dist/buttons/Button'
import { useDispatch,useSelector } from 'react-redux'
import { workWork } from '../store/actions/post'

export const MiniWorks= ({data,id}) =>{ //{name:"Masha", names:"Mashenka"}
    const[val,setVal]=useState(data.name)
    const[val2,setVal2]=useState(data.names)
    const dispatch = useDispatch()
    const works = useSelector(state => state.post.works)
    const findworks = works.find(el=>el.id===id)
    const filterWorks = findworks.data.filter(el=>el.id!==data.id)

    let info ={id:id,data:filterWorks}
    const removes =()=>{   
      workWork(info)(dispatch)
      // console.log(data.id)
   }
   

  return(
      <View>
          <TextInput value={val} onChangeText={setVal}/>
          <TextInput value={val2} onChangeText={setVal2}/>
          <Button title="removess" onPress={removes}/>
      </View>
  )
}