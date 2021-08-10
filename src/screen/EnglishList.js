import React,{createRef, useState,useEffect} from 'react'
import {Button, FlatList,Alert, Text, View} from 'react-native'
import { useDispatch,useSelector} from 'react-redux'
import { Englishlist } from '../components/Englishlist'
import { DB } from '../db'

export const EnglishList = ({navigation}) => {
const name = navigation.getParam('name')   
const dispatch = useDispatch()
const users = useSelector(state => state.post.students)
const myGroup = users.find(el=>el.name===name).groupname
const alleng = useSelector(state => state.post.engtasks).filter(el=>el.groupname===myGroup)
 


useEffect(()=>{
//console.log(alleng)
},[])

const openEng =(data)=>{
navigation.navigate('English',{data:data,name:name})
}

/*const hi =async()=>{
let d = await DB.loadHistory()
d = d.map(el=>{
    el.data = JSON.parse(el.data)
    return el
})
console.log(d)
}*/

if(alleng.length==0){
    return(<View><Text>Пока уроков нет...</Text>
      <Button title="Создать задания" color="pink" onPress={()=>{navigation.navigate('Createeng',{name:name})}}/> 
      {/*<Button title="aa" onPress={hi}/>*/}    
           </View>)
}

    return(<FlatList data={alleng} keyExtractor={elem => elem.id.toString()}
        renderItem={({item})=>{
            return(
                <Englishlist data={item} openHistory={openEng} name={name}/>
            )
        }}
        />)

}