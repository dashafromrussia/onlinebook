import React,{useState,useEffect} from 'react'
import {View, Text, StyleSheet,FlatList,ScrollView, Image,Button,Alert,TouchableOpacity} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { visibleConfPerson } from '../store/actions/post'

export const Confperson = ({data}) => {
    

    const dispatch =useDispatch()

    const addPerson =()=>{
      let info
       if(data.visible==="-"){ //если минус,то участников нет в конфе и их нужно добавить
           info={id:data.id,visible:"+"}
       }else{
          info ={id:data.id,visible:"-"} //удаление участников из беседы
        }
        visibleConfPerson(info)(dispatch)
    }

    return(
        <TouchableOpacity activeOpacity={0.7} onPress={()=>addPerson()}>
            {<View style={styles.block}>
              <Text style={styles.text}>{data.visible}  {data.name}</Text>
            </View>}
        </TouchableOpacity>     
    )
}

const styles = StyleSheet.create({
    block: {
      width: '100%',
      height: 50,
      padding:20
    },
    text:{
      fontFamily:'open-bold',
      fontSize:15
    }
  })