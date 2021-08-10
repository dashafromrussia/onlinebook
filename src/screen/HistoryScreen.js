import React,{useEffect,useState} from 'react'
import {View, Text, StyleSheet,FlatList,ScrollView, Image,Button,Alert} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { CheckBox, Tooltip } from 'react-native-elements'
import { Cheki } from '../components/Cheki'


export const HistoryScreen = ({navigation}) => { //инфу с оценками перетащили в регион,здесь чисто теститнг
let info= navigation.getParam('data')
let pushdata =info.data.sort((a, b) => Number(a.id) > Number(b.id) ? 1 : -1)
const [push,setPush] = useState(pushdata)
const [countpush,setCountpush]=useState(0)
const [answers,setAnswers] = useState([])
const [vis,setVis] = useState(true)
const [count,setCount]=useState(0)

useEffect(()=>{ //стейт каунтпуш запаздывает в отображ на экране, а здесь нет,поэтому -1..тк эффект идет после рендеринга и каунтпуш успевает увелич на 1
 if(countpush-1!==-1 && push[countpush-1]!==undefined){
  if(push[countpush-1].type==="quest" && answers.find(el=>el.ind===countpush-1)===undefined){
    setVis(false) //кнопка пропадает пока не отв на вопрос
  }else if((push[countpush-1].type==="quest" && answers.find(el=>el.ind===countpush-1)!==undefined)){
    setVis(true)
  }
}
//console.log(countpush)
//console.log(answers)
},[countpush,answers])

useEffect(()=>{console.log(info)})


const pushPhrase = ()=>{
  setCountpush(countpush+1)
  let items = push.map((el,index)=>{
    if(index<=countpush){
      el.visi = true
    }
    return el
  })
  setPush(items)
  if(countpush===push.length){
      Alert.alert(`Вы набрали ${count} очков(-а).`)
  }
}

const cheki =(ind,answer)=>{
  let data = push.find((el,index)=>index===ind) //ищем массив с заданием
  console.log(data.right+1)
 if(Number(data.right)==Number(answer+1)){ //сравниваем ответ
    Alert.alert('Yes,you are right!')
    setCount(prev=>prev+1)
  }else{
    Alert.alert('You are wrong!')
  }
  setAnswers(prev=>[...prev,{ind:ind,answer:answer}]) //ind индекс массива в котором само задание*
}

return(
<>
<ScrollView>
  <Text>Истории как в дуолингво.по нажатию на кнопку вылезает новая инфа</Text>
  <Text style={styles.header}>Название: {info.name}</Text>
{push.map((el,index)=>el.type==="sent"? el.visi&&<Text style={styles.bold} key={index.toString()}>{el.describe}</Text>:
                                              el.visi&&<View key={index.toString()}>
                                                <Text>{el.describe}</Text>
                                                <Text style={styles.theme}>{el.quest}</Text>
                                                {el.variants.map((elem,ind)=><Cheki key={ind.toString()} answers={answers} cheki={cheki} bigindex={index} index={ind} elem={elem}/>)}
                                              </View>)}
{vis&&<Button title="жми!" color="black" onPress={()=>pushPhrase()}/>}
</ScrollView>
</>
   )
}

const styles = StyleSheet.create({
      bold:{
        fontFamily:'open-bold',
        color:'black',
        fontSize:20
      },
      theme:{
        fontFamily:'open-bold',
        color:"red",
        fontSize:20
      }, 
      header:{
        fontFamily:'open-bold',
        color:'blue',
        fontSize:20
      }
  })

