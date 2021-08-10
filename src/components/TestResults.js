import React,{useState,useEffect} from 'react'
import {View, Text, StyleSheet,ImageBackground,TouchableOpacity} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { ResultsVariants } from './ResultsVariants'

export const TestResults = ({data,idtest}) =>{
  const [isright,setIsright] = useState(null)
    //let all={id:id,quest:value,first:first,second:second,third:third,answer:answer} отв на тест
    //let data = {id:elem.id,right:elem.answer,myanswer:right,quest:elem.quest} cоставл теста
    const allTest = useSelector(state => state.post.test)
    const myTests = allTest.find(el=>el.id===idtest)
   const test = myTests.test.find(el=>el.id===data.id) //нашл конкретн вопрос
   let rightanswers = test.answer.split(',') //прав ответы
  rightanswers =  rightanswers.sort((a, b) => Number(a) > Number(b) ? 1 : -1)
  let myanswer = data.myanswer.split(',')
  let myrights =[]
  myanswer.forEach(el=>{
    if(rightanswers.find(elem=>elem===el)!==undefined){
      myrights.push(el)
    }
  })
  useEffect(()=>{
    if(myrights.length!==0){
      if(myrights.length===rightanswers.length){
        setIsright('Ответ правильный!')
      }else if(myrights.length > rightanswers.length || myrights.length < rightanswers.length){
        setIsright('Ответ частично правильный!')
      }
    }else{
      setIsright('Ответ неправильный!')
    }
  },[])
   /* useEffect(()=>{
   if(rightanswers.join(',')!==data.myanswer){
    setColor('lightpink')
}
},[])*/

  return(
      <View>
        <Text style={styles.text}>{isright}</Text>
        <Text>{test.quest}</Text>
        {test.variants.map((el,index)=><ResultsVariants key={el.id} index={index+1} myanswer={myanswer} rightanswer={rightanswers} variant={el.variant}/>)}
        <Text>Правильные ответы: {test.answer}</Text>
        <Text>Ответы ученика: {data.myanswer}</Text>
      </View>
  )
}

const styles = StyleSheet.create({
  text:{
    fontFamily:'open-bold'
  }
  })