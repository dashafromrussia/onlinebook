import React,{createRef, useState,useEffect} from 'react'
import {Button, FlatList,Alert, Text, View, ScrollView,TextInput,StyleSheet} from 'react-native'
import { useDispatch,useSelector} from 'react-redux'
import { EnglishTasks } from '../components/EnglishTasks'
import { Historylist } from '../components/Historylist'
import { DB } from '../db'
import { addEnglishResult, oneEnglish } from '../store/actions/post'

export const EnglishScreen = ({navigation}) => {//подобие дуолингво перевод
 let name= navigation.getParam('name')
 const users = useSelector(state => state.post.students)
const myGroup = users.find(el=>el.name===name).groupname
  const oneeng = useSelector(state => state.post.oneeng) 
  const[count,setCount]=useState(1) //для перелист страниц
  const[countansw,setCountansw]=useState(0) //для суммиров баллов
  const[answers,setAnswers]=useState([])
  const[disable,setDisable]=useState(true)
  const dispatch = useDispatch()

 const disabled =()=>{
   setDisable(false)
 }


  const giveAnswer=(data)=>{
   setAnswers(prev=>[...prev,data])
  }
  useEffect(()=>{
    console.log(oneeng)
  },[])
  let result = {idtask:oneeng[0].idtask.toString(),result:countansw,name:name,groupname:myGroup}

  const theNext =()=>{ //удобно для создания слайдовых тестов
    setCount(prev=>prev+1)
    if(count < oneeng.length){
    let items = oneeng.map((el,index)=>{   
      if(el.index===count && answers.find(elem=>elem==el.index)===undefined){
        el.display = true
      }else{
        el.display = false
      }
      return el
    })
    oneEnglish(items)(dispatch)
      }else{
        Alert.alert(`Вы набрали ${countansw} баллов(-а).`)
        addEnglishResult(result)(dispatch) //баллы по англ
        console.log(result)
        navigation.navigate('Englist',{name:name})
      }
  }

  const changeCountAnsw =()=>{
     setCountansw(prev=>prev+1)
  }


    return(<ScrollView>
        {oneeng.map((el,index)=>el.display&&<EnglishTasks key={el.id.toString()} disabled={disabled} giveAnswer={giveAnswer} changeCountAnsw={changeCountAnsw} index={index} data={el}/>)}
        <View paddingHorizontal={10}>
        <Button title="Далее" color="black" disabled={disable} onPress={theNext}/>
        </View>
        </ScrollView>
        )

}

const styles = StyleSheet.create({ 
    text:{
      fontFamily:'open-bold',
      fontSize:20
    },
    block:{
      /*flexDirection:"row",
      alignItems:"center"*/
      flexWrap:"wrap",
      alignContent:'flex-start',
       width:'100%',
      flexDirection:'row',
      paddingLeft:8
    },
    texterror:{
      fontFamily:'open-bold',
      color:"red"
    },
    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  })