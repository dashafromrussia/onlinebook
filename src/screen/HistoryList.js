import React,{createRef, useState,useEffect} from 'react'
import {Button, FlatList,Alert, Text, View} from 'react-native'
import { useDispatch,useSelector} from 'react-redux'
import { Historylist } from '../components/Historylist'
import { DB } from '../db'

export const HistoryList = ({navigation}) => {
const name = navigation.getParam('name')   
const dispatch = useDispatch()
const users = useSelector(state => state.post.students)
const myGroup = users.find(el=>el.name===name).groupname
 const allHistory = useSelector(state => state.post.histories).filter(el=>el.groupname===myGroup)



useEffect(()=>{
console.log(allHistory)
},[])

const openHistory =(data)=>{
navigation.navigate('History',{data:data})
}

/*const hi =async()=>{
let d = await DB.loadHistory()
d = d.map(el=>{
    el.data = JSON.parse(el.data)
    return el
})
console.log(d)
}*/

if(allHistory.length==0){
    return(<View><Text>Пока историй нет...</Text>
      <Button title="Создать историю" color="pink" onPress={()=>{navigation.navigate('Createhistory',{name:name})}}/> 
      {/*<Button title="aa" onPress={hi}/>*/}    
           </View>)
}

    return(<FlatList data={allHistory} keyExtractor={elem => elem.id.toString()}
        renderItem={({item})=>{
            return(
                <Historylist data={item} openHistory={openHistory}/>
            )
        }}
        />)

}
