import React,{useState,useEffect} from 'react'
import {View, Text, StyleSheet,FlatList,ScrollView, Image,Button,Alert,TouchableOpacity} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Confperson } from '../components/Confperson'
import {loadsConfPerson } from '../store/actions/post'

export const ConfpersonScreen = ({navigation}) => {
    const confperson = useSelector(state => state.post.confperson)
    
    
    const dispatch =useDispatch()


    return(
        <View>
            <FlatList data={confperson} keyExtractor={elem => elem.id.toString()}
             renderItem={({item})=>{
                return(
                <Confperson data={item}/>
                )
            }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
      width: '100%',
      height: 200,
      marginTop: 10
    }
  })