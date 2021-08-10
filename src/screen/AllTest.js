import React,{createRef, useState,useEffect} from 'react'
import {Button, FlatList,Alert} from 'react-native'
import { useDispatch,useSelector} from 'react-redux'
import { TestList } from '../components/TestList'
import { loadTest } from '../store/actions/post'

export const AllTest = ({navigation}) => {
const name = navigation.getParam('name')   
const dispatch = useDispatch()
const users = useSelector(state => state.post.students)
const myGroup = users.find(el=>el.name===name).groupname
 const visible= navigation.getParam('visible')
 const allTest = useSelector(state => state.post.test).filter(el=>el.groupname===myGroup)
 const marks = useSelector(state => state.post.marks)
 const find = name.substring(name.length-7, name.length)  

useEffect(()=>{
// console.log(allTest)
},[])

const openTest =(data)=>{
const isMark = marks.find(el=>el.idtest===data.id && el.name===name)
console.log("isss",isMark)
if(isMark===undefined || find==="Teacher"){
navigation.navigate('Test',{data:data,visible:visible,name:name})
}else{
    Alert.alert("Вы уже прошли тест!")
    return false
}
}
   
    
    return(<FlatList data={allTest} keyExtractor={elem => elem.id.toString()}
        renderItem={({item})=>{
            return(
                <TestList data={item} openTest={openTest}/>
            )
        }}
        />)

}

