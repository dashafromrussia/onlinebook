import React,{useEffect,useState} from 'react'
import {View, Text, StyleSheet,FlatList,ScrollView, Image,Button,Alert} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { CheckBox, Tooltip } from 'react-native-elements'
import { Cheki } from '../components/Cheki'


export const TestMarksScreen = ({navigation}) => { //инфу с оценками перетащили в регион,здесь чисто теститнг
  const [size,setSize] = useState(0)
  const [mass,setMass] = useState([{title:"city",display:true,color:"black",describe:"Город - это крупное поселение со своей администрацией и главой"},
  {title:"groupname",display:false,color:"hotpink",describe:"Группа - это собрание нескольких людей,объединеннных посредством общих интересов"},
  {title:"olimp",display:false,color:"hotpink",describe:"Олимпиада - мировое спортивное событие, в котором принимают участие все страны мира"}])
  const [count,setCount] = useState(1)
  const [data,setData] = useState(mass[0])
  const [push,setPush] = useState([{type:"sent",describe:"hello, I am Dasha",visi:false},
  {type:"sent",describe:"good morning, I am Nika",visi:false},{type:"quest",describe:"What did Dasha say?",variants:
["Даша поздоровалась","Даша пошла в магазин"],visi:false,answer:0},{type:"quest",describe:"What time is it?",variants:
["обед","утро"],visi:false,answer:1}])
const [countpush,setCountpush]=useState(0)
const [checked,setChecked] = useState('')
const [checked1,setChecked1] = useState('')
const [answers,setAnswers] = useState([])
const [vis,setVis] = useState(true)

useEffect(()=>{ //стейт каунтпуш запаздывает в отображ на экране, а здесь нет,поэтому -1..тк эффект идет после рендеринга и каунтпуш успевает увелич на 1
 if(countpush-1!==-1){
  if(push[countpush-1].type==="quest" && answers.find(el=>el.ind===countpush-1)===undefined){
    setVis(false) //кнопка пропадает пока не отв на вопрос
  }else if((push[countpush-1].type==="quest" && answers.find(el=>el.ind===countpush-1)!==undefined)){
    setVis(true)
  }
}
//console.log(countpush)
//console.log(answers)
},[countpush,answers])

const theNext =()=>{ //удобно для создания слайдовых тестов
  setCount(count+1)
  let items = mass.map((el,index)=>{
    if(count!==mass.length){
    if(index===count){
      el.display = true
    }else{
      el.display = false
    }
    }else{
      Alert.alert("the end")
    }
    return el
  })
  setMass(items)
}

const theNum =(ind)=>{ //для создания тестов с нумерацией
  let items = mass.map((el,index)=>{
    if(index===ind){
      el.color = "black"
      //setData(el) //2 сп
     el.display = true //1сп
    }else{
      el.color = "hotpink"
      el.display = false //1сп
    }
    return el
  })
  setMass(items)
}

const pushPhrase = ()=>{
  setCountpush(countpush+1)
  let items = push.map((el,index)=>{
    if(index<=countpush){
      el.visi = true
    }
    return el
  })
  setPush(items)
}

const cheki =(ind,answer)=>{
  let data = push.find((el,index)=>index===ind) //ищем массив с заданием
  if(data.answer===answer){ //сравниваем ответ
    Alert.alert('Yes,you are right!')
  }else{
    Alert.alert('You are wrong!')
  }
  setAnswers(prev=>[...prev,{ind:ind,answer:answer}]) //ind индекс массива в котором само задание
}

return(
  <ScrollView>
    <View width={size} backgroundColor="red" height={30}></View>
    <Button title="progress" onPress={()=>setSize(size+20)}/>
<Text>Слайд с нумерацией</Text>
<View flexDirection="row" justifyContent="space-around">
{mass.map((el,index)=><Button key={index.toString()} title={(index+1).toString()} color={el.color} onPress={()=>theNum(index)}/>)}
</View>
<Text>1 способ для компонента внутри цикла.Данные передаются в др компонент</Text>
{mass.map(el=>el.display&&<View key={el.title}>
     <Text style={styles.bold}>{el.title}</Text>
     <Text style={styles.theme}>{el.describe}</Text>
</View>)}
<Text>Истории как в дуолингво.по нажатию на кнопку вылезает новая инфа</Text>
{push.map((el,index)=>el.type==="sent"? el.visi&&<Text key={index.toString()}>{el.describe}</Text>:
                                                  el.visi&&<View key={index.toString()}>
                                                    <Text>{el.describe}</Text>
                                                    {el.variants.map((elem,ind)=><Cheki key={ind.toString()} answers={answers} cheki={cheki} bigindex={index} index={ind} elem={elem}/>)}
                                                  </View>)}
{vis&&<Button title="push" onPress={()=>pushPhrase()}/>}
{/*<View>
<Text>2 способ чисто если в этом же компоненте</Text> 
<Text style={styles.bold}>{data.title}</Text>
     <Text style={styles.theme}>{data.describe}</Text>
</View>*/}
{/*<ScrollView>
  <Text>Для слайдовых тестов</Text>
   {mass.map(el=>el.display&&<View key={el.title}>
     <Text style={styles.bold}>{el.title}</Text>
     <Text style={styles.theme}>{el.describe}</Text>
   </View>)}
<Button title="The next" onPress={theNext}/>
   </ScrollView>*/}
   </ScrollView>
)
 
   /* const marks = useSelector(state => state.post.marks).filter(el=>el.olimp==="yes")
    marks.sort((a, b) => Number(a.mark) > Number(b.mark) ? 1 : -1)
    
    if(marks.length===0){
      return(
          <Text>Результатов пока нет...</Text>
      )
    }
    return(
<View>
    <Text style={styles.header}>Результаты олимпиадных тестов:</Text>
    {marks.reverse().map(el=>
     <View padding={10} key={el.id}>
      <Text style={styles.bold}>Дата теста:{el.time}</Text>
      <Text style={styles.theme}>Тема теста:{el.theme}</Text>
      <Text>Оценка: "{el.mark}"</Text>
      <Text>Город:{el.city}</Text>
      <Text>Оценка: "{el.mark}"</Text>
     </View> 
        )}
     <Text style={styles.theme}>Победитель:{marks[marks.length-1].name}</Text> 
</View>
    )*/
}

const styles = StyleSheet.create({
      bold:{
        fontFamily:'open-bold',
        color:'black'
      },
      theme:{
        fontFamily:'open-bold',
        color:"red"
      }, 
      header:{
        fontFamily:'open-bold',
        color:'blue'
      }
  })