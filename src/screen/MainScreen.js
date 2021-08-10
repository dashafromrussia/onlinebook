import React,{useEffect} from 'react'
import {View, Text, StyleSheet,FlatList, Button} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Page } from '../components/Page'
import { DB } from '../db'
import { loadThemes, newConfBadge } from '../store/actions/post'

export const MainScreen = ({navigation}) => {
    const visible= navigation.getParam('visible')
    const name = navigation.getParam('name')
    //const p = navigation.getParam('params')
    const dispatch = useDispatch()
    const users = useSelector(state => state.post.students)
    const myGroup = users.find(el=>el.name===name).groupname
    //const conference = useSelector(state => state.post.conference)

   /*let newMess =[] //новые собщ из конфы
   conference.forEach(el=>{
     if(el.name!==name){
     el.towhome.map(elem=>{
       if(elem.name===name && elem.news==="yes"){
        newMess.push(elem)
       //elem.news = "no"
       }
       return elem
     })
   }
   }
    )

    newMess.forEach(el=>{
      el.user = name
    })

    useEffect(()=>{
      newConfBadge(newMess)(dispatch)
    },[])*/

    const allThemes = useSelector(state => state.post.allThemes).filter(el=>el.groupname===myGroup)

   const openThemeHandler =(data)=>{
    navigation.navigate('Page',{data:data,visible:visible})
   }

   const removeTheme =()=>{
       DB.deleteThemes()
   }

    return(
        <>
        <FlatList data={allThemes} keyExtractor={elem => elem.id.toString()}
        renderItem={({item})=>{
            return(
                <Page theme={item} onOpen={openThemeHandler}/>
            )
        }}
        />
        {visible&&<Button title="удалить всё" color="grey" onPress={removeTheme}/>}
        <Button title="К списку тестов" color="black" onPress={()=>navigation.navigate('Alltest',{name:name})}/>
        </>
    )
}

