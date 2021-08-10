import React,{useState} from 'react'
import {View, Text, StyleSheet,TextInput,Image, Button} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { updateTests,deleteQuest} from '../store/actions/post'


export const UpdateVariants = ({data,removeVariant,changeVariant}) =>{
    const [flag,setFlag]=useState(true) 
    const [value, setValue] = useState(data.variant)
    const dispatch = useDispatch()
   /* const allTests = useSelector(state => state.post.test)
    const findTests = allTests.find(el=>el.id===id)
    const filterTest = findTests.test.filter(el=>el.id!==data.id)
//let all={id:id,quest:value,first:first,second:second,third:third,answer:answer}
 
     
       
       /*let info = [...filterTest,{id:data.id,quest:value,
        first: first,
        second:second,
        third:third,
        answer: answer}]

       info.sort((a, b) => Number(a.id) > Number(b.id) ? 1 : -1)

        const getInfo = ()=>{
         let change ={id:id,
          test:info,
          }
          console.log(change)
         dispatch(updateTests(change))
         nav()
          }


          let removequest={
            id:id,
            test:filterTest
           }
           
       const removeData =()=>{
       deleteQuest(removequest)(dispatch)
        setValue('')
         setFirst('')
         setSecond('')
         setThird('')
        setAnswer('')
         setFlag(false)
         nav()
       }*/

       const remove =()=>{
           removeVariant(data.id)
           setFlag(false)
       }
       
       const change =()=>{
           changeVariant(data.id,value)
           setFlag(false)
       }
          
  return(
       <View>
      {flag&&<TextInput
       placeholder="Введите вариант ответа"
       value={value}
       onChangeText={setValue}
       multiline
       />}
    {flag&&<Button title="Удалить вариант ответа" color="lightpink" onPress={remove}/>}
    {flag&&<Button onPress={change} title="Обновить вариант" color="palevioletred"/>}
  </View>
  )
}

const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: 200,
      marginTop: 10
    }
  })